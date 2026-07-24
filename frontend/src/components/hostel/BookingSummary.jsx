import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import formatCurrency from "../../utils/formatCurrency";
import {
  getBookingRequestRoute,
  getLoginRoute,
} from "../../constants/routes";
import "./BookingSummary.css";

function BookingSummary({
  hostel,
  selectedRoom,
  onSelectFirstRoom,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    isAuthenticated,
  } = useAuth();

  const [message, setMessage] = useState("");

  const monthlyRent = selectedRoom?.price || 0;

  const initialTotal = selectedRoom
    ? monthlyRent +
      hostel.securityDeposit +
      hostel.admissionFee
    : 0;

  function handleBookingRequest() {
    if (!selectedRoom) {
      setMessage("Please select a room option first.");
      onSelectFirstRoom();
      return;
    }

    const bookingRoute =
      `${getBookingRequestRoute(hostel.id)}` +
      `?room=${encodeURIComponent(selectedRoom.id)}`;

    if (!isAuthenticated) {
      navigate(getLoginRoute(bookingRoute));
      return;
    }

    if (user.role === "owner") {
      setMessage(
        "Hostel-owner accounts cannot submit customer booking requests.",
      );
      return;
    }

    navigate(bookingRoute);
  }

  return (
    <aside className="booking-summary card">
      <span className="section-eyebrow">Booking summary</span>
      <h2>Reserve your preferred room</h2>

      {selectedRoom ? (
        <>
          <div className="selected-room-summary">
            <span>Selected room</span>
            <strong>{selectedRoom.name}</strong>
          </div>

          <dl className="price-breakdown">
            <div>
              <dt>First month rent</dt>
              <dd>{formatCurrency(monthlyRent)}</dd>
            </div>

            <div>
              <dt>Security deposit</dt>
              <dd>
                {formatCurrency(hostel.securityDeposit)}
              </dd>
            </div>

            <div>
              <dt>Admission fee</dt>
              <dd>{formatCurrency(hostel.admissionFee)}</dd>
            </div>

            <div className="price-total">
              <dt>Initial payable amount</dt>
              <dd>{formatCurrency(initialTotal)}</dd>
            </div>
          </dl>
        </>
      ) : (
        <div className="booking-empty-selection">
          Select one of the available room options to see the
          complete pricing summary.
        </div>
      )}

      <button
        className="btn btn-primary booking-request-button"
        type="button"
        onClick={handleBookingRequest}
      >
        {isAuthenticated
          ? "Continue Booking Request"
          : "Log In to Request Booking"}
      </button>

      {message && (
        <p className="booking-message" role="status">
          {message}
        </p>
      )}

      <div className="booking-support">
        <strong>Need assistance?</strong>

        <span>
          Contact {hostel.managerName} between{" "}
          {hostel.contactHours}.
        </span>
      </div>
    </aside>
  );
}

export default BookingSummary;