
import { useMemo, useState } from "react";
import Header from "../../components/layout/Header";
import { useAdmin } from "../../context/AdminContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import formatCurrency from "../../utils/formatCurrency";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useToast } from "../../context/ToastContext";
import "./AdminDashboardPage.css";

function formatStatus(value) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function AdminDashboardPage() {
  const {
    users,
    statistics,
    toggleUserSuspension,
    changeUserRole,
    deleteUser,
  } = useAdmin();

  const {
    ownerListings,
    bookingRequests,
    approveOwnerListing,
    rejectOwnerListing,
    toggleListingSuspension,
    clearListingReports,
    updateBookingStatus,
  } = useMarketplace();

    const { showToast } = useToast();

  const [userToDelete, setUserToDelete] =
    useState(null);

  const [isDeletingUser, setIsDeletingUser] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("overview");

  const [userSearch, setUserSearch] = useState("");
  const [listingSearch, setListingSearch] =
    useState("");

  const pendingListings = ownerListings.filter(
    (listing) =>
      listing.approvalStatus === "pending",
  );

  const reportedListings = ownerListings.filter(
    (listing) =>
      Number(listing.reportCount || 0) > 0,
  );

  const pendingBookings = bookingRequests.filter(
    (booking) => booking.status === "pending",
  );

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) =>
      [
        user.fullName,
        user.email,
        user.role,
        user.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [users, userSearch]);

  const filteredListings = useMemo(() => {
    const query = listingSearch
      .trim()
      .toLowerCase();

    if (!query) {
      return ownerListings;
    }

    return ownerListings.filter((listing) =>
      [
        listing.name,
        listing.city,
        listing.area,
        listing.ownerEmail,
        listing.approvalStatus,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [ownerListings, listingSearch]);

    async function handleConfirmDeleteUser() {
    if (!userToDelete) {
      return;
    }

    setIsDeletingUser(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 350);
    });

    deleteUser(userToDelete.id);

    showToast({
      type: "success",
      title: "User deleted",
      message: `${userToDelete.fullName} was removed from the mock user list.`,
    });

    setUserToDelete(null);
    setIsDeletingUser(false);
  }

  return (
    <>
      <Header />

      <main className="admin-dashboard-page">
        <section className="admin-dashboard-banner">
          <div className="container">
            <span className="section-eyebrow">
              Administration
            </span>

            <h1>HostelHub Admin Dashboard</h1>

            <p>
              Manage platform users, hostel approvals,
              reports and booking activity.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container admin-dashboard-layout">
            <aside className="admin-sidebar card">
              <h2>Admin navigation</h2>

              <nav aria-label="Admin dashboard">
                <button
                  className={
                    activeSection === "overview"
                      ? "admin-nav-active"
                      : ""
                  }
                  type="button"
                  onClick={() =>
                    setActiveSection("overview")
                  }
                >
                  Overview
                </button>

                <button
                  className={
                    activeSection === "users"
                      ? "admin-nav-active"
                      : ""
                  }
                  type="button"
                  onClick={() =>
                    setActiveSection("users")
                  }
                >
                  Users
                </button>

                <button
                  className={
                    activeSection === "listings"
                      ? "admin-nav-active"
                      : ""
                  }
                  type="button"
                  onClick={() =>
                    setActiveSection("listings")
                  }
                >
                  Listings
                </button>

                <button
                  className={
                    activeSection === "bookings"
                      ? "admin-nav-active"
                      : ""
                  }
                  type="button"
                  onClick={() =>
                    setActiveSection("bookings")
                  }
                >
                  Bookings
                </button>

                <button
                  className={
                    activeSection === "reports"
                      ? "admin-nav-active"
                      : ""
                  }
                  type="button"
                  onClick={() =>
                    setActiveSection("reports")
                  }
                >
                  Reports
                </button>
              </nav>
            </aside>

            <div className="admin-content">
              {activeSection === "overview" && (
                <>
                  <section className="admin-stat-grid">
                    <article className="card">
                      <strong>
                        {statistics.totalUsers}
                      </strong>
                      <span>Total users</span>
                    </article>

                    <article className="card">
                      <strong>
                        {ownerListings.length}
                      </strong>
                      <span>Owner listings</span>
                    </article>

                    <article className="card">
                      <strong>
                        {pendingListings.length}
                      </strong>
                      <span>Pending approvals</span>
                    </article>

                    <article className="card">
                      <strong>
                        {bookingRequests.length}
                      </strong>
                      <span>Booking requests</span>
                    </article>
                  </section>

                  <section className="admin-section card">
                    <div className="admin-section-heading">
                      <span className="section-eyebrow">
                        Platform health
                      </span>

                      <h2>Current activity</h2>
                    </div>

                    <div className="admin-health-grid">
                      <div>
                        <span>Active users</span>
                        <strong>
                          {statistics.activeUsers}
                        </strong>
                      </div>

                      <div>
                        <span>Suspended users</span>
                        <strong>
                          {statistics.suspendedUsers}
                        </strong>
                      </div>

                      <div>
                        <span>Hostel owners</span>
                        <strong>
                          {statistics.ownerUsers}
                        </strong>
                      </div>

                      <div>
                        <span>Reported listings</span>
                        <strong>
                          {reportedListings.length}
                        </strong>
                      </div>

                      <div>
                        <span>Pending bookings</span>
                        <strong>
                          {pendingBookings.length}
                        </strong>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {activeSection === "users" && (
                <section className="admin-section card">
                  <div className="admin-section-heading">
                    <span className="section-eyebrow">
                      User management
                    </span>

                    <h2>Platform users</h2>

                    <p>
                      Review user roles and account status.
                    </p>
                  </div>

                  <input
                    className="admin-search-input"
                    type="search"
                    value={userSearch}
                    placeholder="Search by name, email or role"
                    onChange={(event) =>
                      setUserSearch(event.target.value)
                    }
                  />

                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <strong>
                                {user.fullName}
                              </strong>
                              <span>{user.email}</span>
                            </td>

                            <td>
                              <select
                                value={user.role}
                                onChange={(event) =>
                                  changeUserRole(
                                    user.id,
                                    event.target.value,
                                  )
                                }
                              >
                                <option value="customer">
                                  Customer
                                </option>

                                <option value="owner">
                                  Owner
                                </option>
                              </select>
                            </td>

                            <td>
                              <span
                                className={`admin-status admin-status-${user.status}`}
                              >
                                {formatStatus(
                                  user.status,
                                )}
                              </span>
                            </td>

                            <td>
                              {formatDate(
                                user.joinedAt,
                              )}
                            </td>

                            <td>
                              <div className="admin-table-actions">
                                <button
  type="button"
  onClick={() => {
    const wasSuspended =
      user.status === "suspended";

    toggleUserSuspension(user.id);

    showToast({
      type: "success",
      title: wasSuspended
        ? "User activated"
        : "User suspended",
      message: `${user.fullName}'s account status was updated.`,
    });
  }}
>
  {user.status === "suspended"
    ? "Activate"
    : "Suspend"}
</button>

                               <button
  className="admin-danger-action"
  type="button"
  onClick={() => setUserToDelete(user)}
>
  Delete
</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {activeSection === "listings" && (
                <section className="admin-section card">
                  <div className="admin-section-heading">
                    <span className="section-eyebrow">
                      Listing moderation
                    </span>

                    <h2>Hostel listings</h2>

                    <p>
                      Approve, reject or suspend owner
                      listings.
                    </p>
                  </div>

                  <input
                    className="admin-search-input"
                    type="search"
                    value={listingSearch}
                    placeholder="Search hostel, city or owner"
                    onChange={(event) =>
                      setListingSearch(
                        event.target.value,
                      )
                    }
                  />

                  <div className="admin-listing-list">
                    {filteredListings.length > 0 ? (
                      filteredListings.map((listing) => (
                        <article
                          className="admin-listing-card"
                          key={listing.id}
                        >
                          <div className="admin-listing-header">
                            <div>
                              <h3>{listing.name}</h3>

                              <p>
                                {listing.area},{" "}
                                {listing.city}
                              </p>
                            </div>

                            <div className="admin-listing-badges">
                              <span
                                className={`admin-status admin-status-${listing.approvalStatus}`}
                              >
                                {formatStatus(
                                  listing.approvalStatus,
                                )}
                              </span>

                              {listing.isSuspended && (
                                <span className="admin-status admin-status-suspended">
                                  Suspended
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="admin-listing-information">
                            <div>
                              <span>Owner</span>
                              <strong>
                                {listing.ownerEmail}
                              </strong>
                            </div>

                            <div>
                              <span>Starting price</span>
                              <strong>
                                {formatCurrency(
                                  listing.startingPrice,
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>Rooms</span>
                              <strong>
                                {listing.rooms.length}
                              </strong>
                            </div>

                            <div>
                              <span>Reports</span>
                              <strong>
                                {listing.reportCount ||
                                  0}
                              </strong>
                            </div>
                          </div>

                          <div className="admin-listing-actions">
                            {listing.approvalStatus ===
                              "pending" && (
                              <>
                               <button
  type="button"
  onClick={() => {
    approveOwnerListing(listing.id);

    showToast({
      type: "success",
      title: "Listing approved",
      message: `${listing.name} can now be published by its owner.`,
    });
  }}
>
  Approve
</button>

                                <button
                                  className="btn btn-secondary"
                                  type="button"
  onClick={() => {
    rejectOwnerListing(
      listing.id,
      "Listing requires additional verification.",
    );

    showToast({
      type: "warning",
      title: "Listing rejected",
      message: `${listing.name} was returned to the owner for correction.`,
    });
  }}
>
  Reject
                                </button>
                              </>
                            )}

                            <button
                              className="admin-text-action"
                              type="button"
                              onClick={() =>
                                toggleListingSuspension(
                                  listing.id,
                                )
                              }
                            >
                              {listing.isSuspended
                                ? "Remove Suspension"
                                : "Suspend Listing"}
                            </button>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="admin-empty-state">
                        No owner listings found.
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeSection === "bookings" && (
                <section className="admin-section card">
                  <div className="admin-section-heading">
                    <span className="section-eyebrow">
                      Booking oversight
                    </span>

                    <h2>Booking requests</h2>

                    <p>
                      Review booking activity across the
                      platform.
                    </p>
                  </div>

                  <div className="admin-booking-list">
                    {bookingRequests.length > 0 ? (
                      bookingRequests.map((booking) => (
                        <article
                          className="admin-booking-card"
                          key={booking.id}
                        >
                          <div>
                            <h3>
                              {booking.hostelName}
                            </h3>

                            <p>
                              {booking.userName} ·{" "}
                              {booking.roomName}
                            </p>
                          </div>

                          <div className="admin-booking-meta">
                            <span
                              className={`admin-status admin-status-${booking.status}`}
                            >
                              {formatStatus(
                                booking.status,
                              )}
                            </span>

                            <strong>
                              {formatCurrency(
                                booking.monthlyRent,
                              )}
                            </strong>
                          </div>

                          <select
                            value={booking.status}
                            onChange={(event) =>
                              updateBookingStatus(
                                booking.id,
                                event.target.value,
                              )
                            }
                          >
                            <option value="pending">
                              Pending
                            </option>
                            <option value="approved">
                              Approved
                            </option>
                            <option value="rejected">
                              Rejected
                            </option>
                            <option value="cancelled">
                              Cancelled
                            </option>
                          </select>
                        </article>
                      ))
                    ) : (
                      <div className="admin-empty-state">
                        No booking requests are available.
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeSection === "reports" && (
                <section className="admin-section card">
                  <div className="admin-section-heading">
                    <span className="section-eyebrow">
                      Trust and safety
                    </span>

                    <h2>Reported listings</h2>

                    <p>
                      Review listings reported by platform
                      users.
                    </p>
                  </div>

                  <div className="admin-report-list">
                    {reportedListings.length > 0 ? (
                      reportedListings.map((listing) => (
                        <article
                          className="admin-report-card"
                          key={listing.id}
                        >
                          <div>
                            <h3>{listing.name}</h3>

                            <p>
                              {listing.reportCount}{" "}
                              {listing.reportCount === 1
                                ? "report"
                                : "reports"}
                            </p>
                          </div>

                          <div>
                            <button
                              className="btn btn-secondary"
                               type="button"
  onClick={() => {
    clearListingReports(listing.id);

    showToast({
      type: "success",
      title: "Reports cleared",
      message: `Reports for ${listing.name} were cleared.`,
    });
  }}
>
  Clear Reports
                            </button>

                            <button
                              className="admin-danger-action"
                              type="button"
                              onClick={() =>
                                toggleListingSuspension(
                                  listing.id,
                                )
                              }
                            >
                              {listing.isSuspended
                                ? "Unsuspend"
                                : "Suspend"}
                            </button>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="admin-empty-state">
                        No listings are currently reported.
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
      </main>
       <ConfirmModal
      isOpen={Boolean(userToDelete)}
      title="Delete this user?"
      message={
        userToDelete
          ? `${userToDelete.fullName} will be removed from the frontend mock user list.`
          : ""
      }
      confirmText="Delete User"
      variant="danger"
      isLoading={isDeletingUser}
      onConfirm={handleConfirmDeleteUser}
      onCancel={() => setUserToDelete(null)}
    />
  </>
    
  );
}

export default AdminDashboardPage;