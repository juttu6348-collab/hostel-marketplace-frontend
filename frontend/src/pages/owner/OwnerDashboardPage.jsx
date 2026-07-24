import { useState } from "react";
import Header from "../../components/layout/Header";
import OwnerListingForm from "../../components/owner/OwnerListingForm";
import OwnerRoomManager from "../../components/owner/OwnerRoomManager";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import formatCurrency from "../../utils/formatCurrency";
import "./OwnerDashboardPage.css";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useToast } from "../../context/ToastContext";
import EmptyState from "../../components/common/EmptyState";

function formatStatus(status) {
  return status
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
}

function OwnerDashboardPage() {
  const { user } = useAuth();

  const {
    currentOwnerListings,
    currentOwnerBookingRequests,

    createOwnerListing,
    updateOwnerListing,
    deleteOwnerListing,
    toggleListingPublication,
    submitListingForApproval,

    addRoomToListing,
    updateListingRoom,
    removeRoomFromListing,

    updateBookingStatus,
  } = useMarketplace();

    const { showToast } = useToast();

  const [listingToDelete, setListingToDelete] =
    useState(null);

  const [isDeletingListing, setIsDeletingListing] =
    useState(false);

  const [editingListing, setEditingListing] =
    useState(null);

  function handleSaveListing(values) {
    if (editingListing) {
      updateOwnerListing(
        editingListing.id,
        values,
      );

      showToast({
        type: "success",
        title: "Listing updated",
        message:
          "Your hostel information was updated successfully.",
      });

      setEditingListing(null);
      return;
    }

    createOwnerListing(values);

    showToast({
      type: "success",
      title: "Listing created",
      message:
        "Your new listing was saved as a draft.",
    });
  }

  const publishedListings =
    currentOwnerListings.filter(
      (listing) => listing.status === "published",
    ).length;

  const totalAvailableBeds =
    currentOwnerListings.reduce(
      (listingTotal, listing) =>
        listingTotal +
        listing.rooms.reduce(
          (roomTotal, room) =>
            roomTotal + room.availableBeds,
          0,
        ),
      0,
    );

  const pendingRequests =
    currentOwnerBookingRequests.filter(
      (booking) => booking.status === "pending",
    ).length;

      async function handleConfirmDeleteListing() {
    if (!listingToDelete) {
      return;
    }

    setIsDeletingListing(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 400);
    });

    deleteOwnerListing(listingToDelete.id);

    showToast({
      type: "success",
      title: "Listing deleted",
      message: `${listingToDelete.name} was removed successfully.`,
    });

    setListingToDelete(null);
    setIsDeletingListing(false);
  }

  return (
    <>
      <Header />

      <main className="owner-dashboard-page">
        <section className="owner-dashboard-banner">
          <div className="container">
            <span className="section-eyebrow">
              Hostel owner dashboard
            </span>

            <h1>Welcome, {user.fullName}</h1>

            <p>
              Manage hostel listings, room inventory and customer
              booking requests.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="owner-dashboard-stats">
              <article className="card">
                <strong>
                  {currentOwnerListings.length}
                </strong>
                <span>Total listings</span>
              </article>

              <article className="card">
                <strong>{publishedListings}</strong>
                <span>Published listings</span>
              </article>

              <article className="card">
                <strong>{totalAvailableBeds}</strong>
                <span>Available beds</span>
              </article>

              <article className="card">
                <strong>{pendingRequests}</strong>
                <span>Pending requests</span>
              </article>
            </div>

            <div className="owner-dashboard-layout">
              <OwnerListingForm
                editingListing={editingListing}
                onSubmit={handleSaveListing}
                onCancel={() =>
                  setEditingListing(null)
                }
              />

              <section className="owner-dashboard-section">
                <div className="owner-section-heading">
                  <span className="section-eyebrow">
                    Your properties
                  </span>

                  <h2>Hostel listings</h2>

                  <p>
                    Publish listings only after adding accurate
                    details and room availability.
                  </p>
                </div>

                {currentOwnerListings.length > 0 ? (
                  <div className="owner-listings-list">
                    {currentOwnerListings.map(
                      (listing) => (
                        <article
                          className="owner-listing-card card"
                          key={listing.id}
                        >
                          <div className="owner-listing-top">
                            <div>
 <div className="owner-listing-status-row">
  <span
    className={`owner-listing-status owner-listing-status-${listing.status}`}
  >
    {formatStatus(listing.status)}
  </span>

  <span
    className={`owner-approval-status owner-approval-status-${listing.approvalStatus}`}
  >
    Approval:{" "}
    {formatStatus(listing.approvalStatus)}
  </span>

  {listing.isSuspended && (
    <span className="owner-suspended-status">
      Suspended
    </span>
  )}

  <span>
    {listing.hostelType
      .replace(/-/g, " ")
      .replace(/\b\w/g, (character) =>
        character.toUpperCase(),
      )}
  </span>
</div>

                              <h3>{listing.name}</h3>

                              <p>
                                {listing.area},{" "}
                                {listing.city}
                              </p>
                            </div>

                            <div className="owner-listing-price">
                              <span>Starting from</span>

                              <strong>
                                {formatCurrency(
                                  listing.startingPrice,
                                )}
                              </strong>
                            </div>
                          </div>

                          <p className="owner-listing-description">
                            {listing.description}
                          </p>

<div className="owner-listing-actions">
  {listing.approvalStatus === "approved" ? (
<button
  type="button"
  onClick={() => {
    const wasPublished =
      listing.status === "published";

    toggleListingPublication(listing.id);

    showToast({
      type: "success",
      title: wasPublished
        ? "Listing unpublished"
        : "Listing published",
      message: wasPublished
        ? "The listing is no longer publicly visible."
        : "The listing is now available to hostel seekers.",
    });
  }}
>
  {listing.status === "published"
    ? "Unpublish"
    : "Publish"}
</button>
  ) : (
    <button
      className="btn btn-primary"
      type="button"
      disabled={
        listing.approvalStatus === "pending"
      }
   onClick={() => {
    submitListingForApproval(listing.id);

    showToast({
      type: "success",
      title: "Listing submitted",
      message:
        "The listing is now waiting for admin approval.",
    });
  }}
    >
      {listing.approvalStatus === "pending"
        ? "Awaiting Approval"
        : "Submit for Approval"}
    </button>
  )}

  <button
    className="btn btn-secondary"
    type="button"
    onClick={() => {
      setEditingListing(listing);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
  >
    Edit Listing
  </button>

<button
  className="owner-delete-listing-button"
  type="button"
  onClick={() => setListingToDelete(listing)}
>
  Delete
</button>
</div>

                          <OwnerRoomManager
                            listing={listing}
                            onAddRoom={addRoomToListing}
                            onUpdateRoom={
                              updateListingRoom
                            }
                            onRemoveRoom={
                              removeRoomFromListing
                            }
                          />
                        </article>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="owner-empty-state card">
                    <h3>No hostel listings yet</h3>

                    <p>
                      Complete the listing form above to create
                      your first hostel property.
                    </p>
                  </div>
                )}
              </section>

              <section className="owner-dashboard-section">
                <div className="owner-section-heading">
                  <span className="section-eyebrow">
                    Customer activity
                  </span>

                  <h2>Incoming booking requests</h2>

                  <p>
                    Approve or reject requests submitted for your
                    hostel listings.
                  </p>
                </div>

                {currentOwnerBookingRequests.length > 0 ? (
                  <div className="owner-booking-list">
                    {currentOwnerBookingRequests.map(
                      (booking) => (
                        <article
                          className="owner-booking-card card"
                          key={booking.id}
                        >
                          <div className="owner-booking-header">
                            <div>
                              <h3>
                                {booking.userName}
                              </h3>

                              <p>
                                {booking.hostelName} ·{" "}
                                {booking.roomName}
                              </p>
                            </div>

                            <span
                              className={`booking-status booking-status-${booking.status}`}
                            >
                              {formatStatus(
                                booking.status,
                              )}
                            </span>
                          </div>

                          <div className="owner-booking-information">
                            <div>
                              <span>Email</span>
                              <strong>
                                {booking.userEmail}
                              </strong>
                            </div>

                            <div>
                              <span>Move-in date</span>
                              <strong>
                                {booking.moveInDate}
                              </strong>
                            </div>

                            <div>
                              <span>Stay duration</span>
                              <strong>
                                {booking.stayDuration}
                              </strong>
                            </div>

                            <div>
                              <span>Monthly rent</span>
                              <strong>
                                {formatCurrency(
                                  booking.monthlyRent,
                                )}
                              </strong>
                            </div>
                          </div>

                          {booking.status ===
                            "pending" && (
                            <div className="owner-booking-actions">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() =>
                                  updateBookingStatus(
                                    booking.id,
                                    "approved",
                                  )
                                }
                              >
                                Approve Request
                              </button>

                              <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() =>
                                  updateBookingStatus(
                                    booking.id,
                                    "rejected",
                                  )
                                }
                              >
                                Reject Request
                              </button>
                            </div>
                          )}
                        </article>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="owner-empty-state card">
                    <h3>No booking requests received</h3>

                    <p>
                      New customer requests matching your hostel
                      name will appear here.
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </section>
      </main>
      <ConfirmModal
      isOpen={Boolean(listingToDelete)}
      title="Delete this hostel listing?"
      message={
        listingToDelete
          ? `${listingToDelete.name} and its room information will be permanently removed from this frontend demonstration.`
          : ""
      }
      confirmText="Delete Listing"
      variant="danger"
      isLoading={isDeletingListing}
      onConfirm={handleConfirmDeleteListing}
      onCancel={() => setListingToDelete(null)}
    />
    </>
  );
}

export default OwnerDashboardPage;