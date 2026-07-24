import { Link } from "react-router-dom";
import { useMarketplace } from "../../context/MarketplaceContext";
import formatCurrency from "../../utils/formatCurrency";
import { getHostelDetailsRoute } from "../../constants/routes";
import { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import { useToast } from "../../context/ToastContext";
import "./BookingHistory.css";

function formatBookingDate(dateValue) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function formatStatus(status) {
  return status
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
}

function BookingHistory() {
  const {
    currentUserBookings,
    cancelBookingRequest,
  } = useMarketplace();

    const { showToast } = useToast();

  const [bookingToCancel, setBookingToCancel] =
    useState(null);

  const [isCancelling, setIsCancelling] =
    useState(false);

      async function handleConfirmCancellation() {
    if (!bookingToCancel) {
      return;
    }

    setIsCancelling(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 350);
    });

    cancelBookingRequest(bookingToCancel.id);

    showToast({
      type: "success",
      title: "Booking request cancelled",
      message: `Your request for ${bookingToCancel.hostelName} was cancelled.`,
    });

    setBookingToCancel(null);
    setIsCancelling(false);
  }

  return (
    <>

    <section className="account-section card">
      <div className="account-section-heading">
        <span className="section-eyebrow">
          Booking activity
        </span>

        <h2>Your booking requests</h2>

        <p>
          Review your submitted booking requests and their current
          status.
        </p>
      </div>

      {currentUserBookings.length > 0 ? (
        <div className="booking-history-list">
          {currentUserBookings.map((booking) => (
            <article
              className="booking-history-card"
              key={booking.id}
            >
              <div className="booking-history-main">
                <div className="booking-history-title-row">
                  <div>
                    <h3>{booking.hostelName}</h3>

                    <p>
                      {booking.hostelArea},{" "}
                      {booking.hostelCity}
                    </p>
                  </div>

                  <span
                    className={`booking-status booking-status-${booking.status}`}
                  >
                    {formatStatus(booking.status)}
                  </span>
                </div>

                <div className="booking-history-details">
                  <div>
                    <span>Room</span>
                    <strong>{booking.roomName}</strong>
                  </div>

                  <div>
                    <span>Move-in date</span>
                    <strong>
                      {formatBookingDate(
                        booking.moveInDate,
                      )}
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

                  <div>
                    <span>Requested on</span>
                    <strong>
                      {formatBookingDate(
                        booking.createdAt,
                      )}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="booking-history-actions">
                <Link
                  className="btn btn-secondary"
                  to={getHostelDetailsRoute(
                    booking.hostelId,
                  )}
                >
                  View Hostel
                </Link>

                {booking.status === "pending" && (
                <button
  className="booking-cancel-button"
  type="button"
  onClick={() => setBookingToCancel(booking)}
>
  Cancel Request
</button>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="booking-history-empty">
          <h3>No booking requests yet</h3>

          <p>
            Select an available room from a hostel-details page to
            submit your first request.
          </p>
        </div>
      )}
    </section>
     <ConfirmModal
      isOpen={Boolean(bookingToCancel)}
      title="Cancel this booking request?"
      message={
        bookingToCancel
          ? `Your pending request for ${bookingToCancel.hostelName} will be marked as cancelled.`
          : ""
      }
      confirmText="Cancel Request"
      variant="danger"
      isLoading={isCancelling}
      onConfirm={handleConfirmCancellation}
      onCancel={() => setBookingToCancel(null)}
    />
  </>
  );
}

export default BookingHistory;