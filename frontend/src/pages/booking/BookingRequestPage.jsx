import { useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Header from "../../components/layout/Header";
import FormField from "../../components/auth/FormField";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import hostels from "../../data/hostels";
import getHostelDetails from "../../utils/getHostelDetails";
import formatCurrency from "../../utils/formatCurrency";
import {
  validateGuardianName,
  validateMessage,
  validateMoveInDate,
  validateStayDuration,
} from "../../utils/bookingValidation";
import ROUTES, {
  getHostelDetailsRoute,
} from "../../constants/routes";
import "./BookingRequestPage.css";

const initialValues = {
  moveInDate: "",
  stayDuration: "",
  guardianName: "",
  guardianPhone: "",
  occupation: "student",
  institutionName: "",
  additionalMessage: "",
  acceptedBookingTerms: false,
};

function BookingRequestPage() {
  const { hostelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { createBookingRequest } = useMarketplace();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hostel = useMemo(() => {
    const hostelRecord = hostels.find(
      (item) => item.id === Number(hostelId),
    );

    return getHostelDetails(hostelRecord);
  }, [hostelId]);

  const selectedRoomId = searchParams.get("room");

  const selectedRoom = hostel?.roomOptions.find(
    (room) => room.id === selectedRoomId,
  );

  const initialPayableAmount = selectedRoom
    ? selectedRoom.price +
      hostel.securityDeposit +
      hostel.admissionFee
    : 0;

  function handleInputChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }

    setGeneralError("");
  }

  function validateForm() {
    const nextErrors = {
      moveInDate: validateMoveInDate(values.moveInDate),

      stayDuration: validateStayDuration(
        values.stayDuration,
      ),

      guardianName: validateGuardianName(
        values.guardianName,
      ),

      guardianPhone: values.guardianPhone.trim()
        ? ""
        : "Guardian phone number is required.",

      institutionName:
        values.occupation === "student" &&
        !values.institutionName.trim()
          ? "Institution name is required for students."
          : "",

      additionalMessage: validateMessage(
        values.additionalMessage,
      ),

      acceptedBookingTerms: values.acceptedBookingTerms
        ? ""
        : "You must confirm that the supplied information is correct.",
    };

    Object.keys(nextErrors).forEach((key) => {
      if (!nextErrors[key]) {
        delete nextErrors[key];
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!hostel || !selectedRoom) {
      setGeneralError(
        "The selected hostel or room could not be found.",
      );
      return;
    }

    setIsSubmitting(true);
    setGeneralError("");

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      const bookingRequest = createBookingRequest({
        hostelId: hostel.id,
        hostelName: hostel.name,
        hostelCity: hostel.city,
        hostelArea: hostel.area,

        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        monthlyRent: selectedRoom.price,
        securityDeposit: hostel.securityDeposit,
        admissionFee: hostel.admissionFee,
        initialPayableAmount,

        applicantName: user.fullName,
        applicantEmail: user.email,
        applicantPhone: user.phoneNumber || "",

        moveInDate: values.moveInDate,
        stayDuration: values.stayDuration,
        guardianName: values.guardianName.trim(),
        guardianPhone: values.guardianPhone.trim(),
        occupation: values.occupation,
        institutionName: values.institutionName.trim(),
        additionalMessage: values.additionalMessage.trim(),
      });

      navigate(
        `${ROUTES.ACCOUNT}?booking=${bookingRequest.id}`,
        {
          replace: true,
        },
      );
    } catch (error) {
      console.error("Booking request failed:", error);

      setGeneralError(
        "Unable to submit the booking request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!hostel || !selectedRoom) {
    return (
      <>
        <Header />

        <main className="booking-invalid-page">
          <div className="container">
            <div className="booking-invalid-state card">
              <h1>Booking selection unavailable</h1>

              <p>
                The hostel or selected room could not be found.
                Return to the hostel page and select an available
                room.
              </p>

              <Link
                className="btn btn-primary"
                to={
                  hostel
                    ? getHostelDetailsRoute(hostel.id)
                    : ROUTES.HOSTELS
                }
              >
                Return to Hostel
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="booking-request-page">
        <section className="booking-request-banner">
          <div className="container">
            <Link
              className="booking-back-link"
              to={getHostelDetailsRoute(hostel.id)}
            >
              ← Back to hostel details
            </Link>

            <span className="section-eyebrow">
              Booking request
            </span>

            <h1>Request your room at {hostel.name}</h1>

            <p>
              Complete the information below. The hostel owner will
              review your request before confirming availability.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container booking-request-layout">
            <form
              className="booking-form card"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="booking-form-heading">
                <span className="section-eyebrow">
                  Applicant information
                </span>

                <h2>Complete your booking request</h2>
              </div>

              {generalError && (
                <div
                  className="auth-general-error"
                  role="alert"
                >
                  {generalError}
                </div>
              )}

              <div className="booking-readonly-grid">
                <div>
                  <span>Applicant name</span>
                  <strong>{user.fullName}</strong>
                </div>

                <div>
                  <span>Email address</span>
                  <strong>{user.email}</strong>
                </div>
              </div>

              <div className="auth-form-row">
                <div
                  className={`auth-form-group ${
                    errors.moveInDate
                      ? "auth-form-group-error"
                      : ""
                  }`}
                >
                  <label htmlFor="moveInDate">
                    Expected move-in date
                    <span
                      className="required-indicator"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  </label>

                  <input
                    id="moveInDate"
                    name="moveInDate"
                    type="date"
                    value={values.moveInDate}
                    aria-invalid={Boolean(errors.moveInDate)}
                    onChange={handleInputChange}
                  />

                  {errors.moveInDate && (
                    <span
                      className="auth-field-error"
                      role="alert"
                    >
                      {errors.moveInDate}
                    </span>
                  )}
                </div>

                <div
                  className={`auth-form-group ${
                    errors.stayDuration
                      ? "auth-form-group-error"
                      : ""
                  }`}
                >
                  <label htmlFor="stayDuration">
                    Expected stay duration
                    <span
                      className="required-indicator"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  </label>

                  <select
                    id="stayDuration"
                    name="stayDuration"
                    value={values.stayDuration}
                    aria-invalid={Boolean(
                      errors.stayDuration,
                    )}
                    onChange={handleInputChange}
                  >
                    <option value="">Select duration</option>
                    <option value="1-3-months">
                      1 to 3 months
                    </option>
                    <option value="4-6-months">
                      4 to 6 months
                    </option>
                    <option value="7-12-months">
                      7 to 12 months
                    </option>
                    <option value="more-than-12-months">
                      More than 12 months
                    </option>
                  </select>

                  {errors.stayDuration && (
                    <span
                      className="auth-field-error"
                      role="alert"
                    >
                      {errors.stayDuration}
                    </span>
                  )}
                </div>
              </div>

              <div className="auth-form-row">
                <FormField
                  id="guardianName"
                  label="Guardian name"
                  name="guardianName"
                  value={values.guardianName}
                  placeholder="Guardian full name"
                  error={errors.guardianName}
                  required
                  onChange={handleInputChange}
                />

                <FormField
                  id="guardianPhone"
                  label="Guardian phone"
                  name="guardianPhone"
                  type="tel"
                  value={values.guardianPhone}
                  placeholder="03001234567"
                  error={errors.guardianPhone}
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="auth-form-row">
                <div className="auth-form-group">
                  <label htmlFor="occupation">
                    Current occupation
                  </label>

                  <select
                    id="occupation"
                    name="occupation"
                    value={values.occupation}
                    onChange={handleInputChange}
                  >
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                    <option value="intern">Intern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <FormField
                  id="institutionName"
                  label={
                    values.occupation === "student"
                      ? "Institution name"
                      : "Organization name"
                  }
                  name="institutionName"
                  value={values.institutionName}
                  placeholder={
                    values.occupation === "student"
                      ? "NUST, FAST, COMSATS..."
                      : "Company or organization"
                  }
                  error={errors.institutionName}
                  required={values.occupation === "student"}
                  onChange={handleInputChange}
                />
              </div>

              <div
                className={`auth-form-group ${
                  errors.additionalMessage
                    ? "auth-form-group-error"
                    : ""
                }`}
              >
                <label htmlFor="additionalMessage">
                  Additional message
                </label>

                <textarea
                  id="additionalMessage"
                  name="additionalMessage"
                  rows="5"
                  maxLength="500"
                  value={values.additionalMessage}
                  placeholder="Mention any room preference, accessibility requirement or question."
                  aria-invalid={Boolean(
                    errors.additionalMessage,
                  )}
                  onChange={handleInputChange}
                />

                <div className="booking-message-counter">
                  <span>
                    {errors.additionalMessage || ""}
                  </span>

                  <span>
                    {values.additionalMessage.length}/500
                  </span>
                </div>
              </div>

              <div>
                <label className="auth-checkbox-label">
                  <input
                    name="acceptedBookingTerms"
                    type="checkbox"
                    checked={values.acceptedBookingTerms}
                    aria-invalid={Boolean(
                      errors.acceptedBookingTerms,
                    )}
                    onChange={handleInputChange}
                  />

                  <span>
                    I confirm that the provided information is
                    correct and understand this is a booking
                    request, not an immediate booking confirmation.
                  </span>
                </label>

                {errors.acceptedBookingTerms && (
                  <span
                    className="auth-field-error"
                    role="alert"
                  >
                    {errors.acceptedBookingTerms}
                  </span>
                )}
              </div>

              <button
                className="btn btn-primary booking-submit-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting Request..."
                  : "Submit Booking Request"}
              </button>
            </form>

            <aside className="booking-review card">
              <span className="section-eyebrow">
                Selected accommodation
              </span>

              <img
                src={hostel.image}
                alt={`${hostel.name} accommodation`}
              />

              <h2>{hostel.name}</h2>

              <p>
                {hostel.area}, {hostel.city}
              </p>

              <div className="booking-selected-room">
                <span>Selected room</span>
                <strong>{selectedRoom.name}</strong>
              </div>

              <dl className="booking-review-prices">
                <div>
                  <dt>Monthly rent</dt>
                  <dd>
                    {formatCurrency(selectedRoom.price)}
                  </dd>
                </div>

                <div>
                  <dt>Security deposit</dt>
                  <dd>
                    {formatCurrency(
                      hostel.securityDeposit,
                    )}
                  </dd>
                </div>

                <div>
                  <dt>Admission fee</dt>
                  <dd>
                    {formatCurrency(hostel.admissionFee)}
                  </dd>
                </div>

                <div className="booking-review-total">
                  <dt>Initial payable amount</dt>
                  <dd>
                    {formatCurrency(initialPayableAmount)}
                  </dd>
                </div>
              </dl>

              <p className="booking-payment-note">
                No payment is collected during this frontend
                booking-request step.
              </p>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

export default BookingRequestPage;