import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import FormField from "../../components/auth/FormField";
import PasswordField from "../../components/auth/PasswordField";
import PasswordStrength from "../../components/auth/PasswordStrength";
import { useAuth } from "../../context/AuthContext";
import {
  validateCnic,
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhoneNumber,
} from "../../utils/authValidation";
import ROUTES from "../../constants/routes";
import "./AuthPages.css";

const initialValues = {
  role: "customer",
  fullName: "",
  email: "",
  phoneNumber: "",
  cnic: "",
  hostelName: "",
  city: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;

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

  function handleRoleChange(role) {
    setValues((currentValues) => ({
      ...currentValues,
      role,
      cnic: role === "customer" ? "" : currentValues.cnic,
      hostelName:
        role === "customer" ? "" : currentValues.hostelName,
      city: role === "customer" ? "" : currentValues.city,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      role: "",
      cnic: "",
      hostelName: "",
      city: "",
    }));
  }

  function validateField(name, value) {
    if (name === "fullName") {
      return validateFullName(value);
    }

    if (name === "email") {
      return validateEmail(value);
    }

    if (name === "phoneNumber") {
      return validatePhoneNumber(value);
    }

    if (name === "password") {
      return validatePassword(value);
    }

    if (name === "confirmPassword") {
      if (!value) {
        return "Confirm your password.";
      }

      if (value !== values.password) {
        return "Passwords do not match.";
      }
    }

    if (name === "cnic" && values.role === "owner") {
      return validateCnic(value);
    }

    if (
      name === "hostelName" &&
      values.role === "owner" &&
      !value.trim()
    ) {
      return "Hostel name is required.";
    }

    if (
      name === "city" &&
      values.role === "owner" &&
      !value.trim()
    ) {
      return "Hostel city is required.";
    }

    return "";
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    const error = validateField(name, value);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: error,
    }));
  }

  function validateForm() {
    const nextErrors = {
      fullName: validateFullName(values.fullName),
      email: validateEmail(values.email),
      phoneNumber: validatePhoneNumber(values.phoneNumber),
      password: validatePassword(values.password),
      confirmPassword:
        values.confirmPassword === values.password
          ? ""
          : "Passwords do not match.",
      acceptedTerms: values.acceptedTerms
        ? ""
        : "You must accept the terms and privacy policy.",
    };

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    }

    if (values.role === "owner") {
      nextErrors.cnic = validateCnic(values.cnic);

      nextErrors.hostelName = values.hostelName.trim()
        ? ""
        : "Hostel name is required.";

      nextErrors.city = values.city.trim()
        ? ""
        : "Hostel city is required.";
    }

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

    setIsSubmitting(true);
    setGeneralError("");

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      register({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        role: values.role,
        hostelName: values.hostelName,
      });

      navigate(ROUTES.ACCOUNT, {
        replace: true,
      });
    } catch (error) {
      console.error("Mock registration failed:", error);

      setGeneralError(
        "Unable to create the account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Create your account"
      title="Join the HostelHub marketplace"
      description="Register as a hostel seeker or hostel owner. Your dashboard experience will depend on the selected role."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkTo={ROUTES.LOGIN}
    >
      <form
        className="auth-form"
        noValidate
        onSubmit={handleSubmit}
      >
        {generalError && (
          <div className="auth-general-error" role="alert">
            {generalError}
          </div>
        )}

        <div>
          <div className="role-selection">
            <label
              className={`role-option ${
                values.role === "customer"
                  ? "role-option-selected"
                  : ""
              }`}
            >
              <input
                name="role"
                type="radio"
                value="customer"
                checked={values.role === "customer"}
                onChange={() => handleRoleChange("customer")}
              />

              <span className="role-option-icon" aria-hidden="true">
                S
              </span>

              <strong>Hostel seeker</strong>

              <span>
                Search hostels, save favourites and request rooms.
              </span>
            </label>

            <label
              className={`role-option ${
                values.role === "owner"
                  ? "role-option-selected"
                  : ""
              }`}
            >
              <input
                name="role"
                type="radio"
                value="owner"
                checked={values.role === "owner"}
                onChange={() => handleRoleChange("owner")}
              />

              <span className="role-option-icon" aria-hidden="true">
                O
              </span>

              <strong>Hostel owner</strong>

              <span>
                Create listings and manage rooms and bookings.
              </span>
            </label>
          </div>
        </div>

        <div className="auth-form-row">
          <FormField
            id="registerFullName"
            label="Full name"
            name="fullName"
            value={values.fullName}
            placeholder="Usman Jutt"
            autoComplete="name"
            error={errors.fullName}
            required
            onChange={handleInputChange}
            onBlur={handleBlur}
          />

          <FormField
            id="registerPhone"
            label="Mobile number"
            name="phoneNumber"
            type="tel"
            value={values.phoneNumber}
            placeholder="03001234567"
            autoComplete="tel"
            error={errors.phoneNumber}
            required
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <FormField
          id="registerEmail"
          label="Email address"
          name="email"
          type="email"
          value={values.email}
          placeholder="usman@example.com"
          autoComplete="email"
          error={errors.email}
          required
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        {values.role === "owner" && (
          <>
            <div className="auth-form-row">
              <FormField
                id="registerCnic"
                label="CNIC number"
                name="cnic"
                value={values.cnic}
                placeholder="3520212345671"
                autoComplete="off"
                error={errors.cnic}
                hint="Enter 13 digits without dashes."
                required
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              <FormField
                id="registerCity"
                label="Hostel city"
                name="city"
                value={values.city}
                placeholder="Islamabad"
                autoComplete="address-level2"
                error={errors.city}
                required
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>

            <FormField
              id="registerHostelName"
              label="Hostel or business name"
              name="hostelName"
              value={values.hostelName}
              placeholder="City View Boys Hostel"
              autoComplete="organization"
              error={errors.hostelName}
              required
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </>
        )}

        <div className="auth-form-row">
          <PasswordField
            id="registerPassword"
            label="Password"
            name="password"
            value={values.password}
            placeholder="Create a strong password"
            autoComplete="new-password"
            error={errors.password}
            hint="Use at least 8 characters with uppercase, lowercase and a number."
            required
            onChange={handleInputChange}
            onBlur={handleBlur}
          >
            <PasswordStrength password={values.password} />
          </PasswordField>

          <PasswordField
            id="registerConfirmPassword"
            label="Confirm password"
            name="confirmPassword"
            value={values.confirmPassword}
            placeholder="Enter the password again"
            autoComplete="new-password"
            error={errors.confirmPassword}
            required
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label className="auth-checkbox-label">
            <input
              name="acceptedTerms"
              type="checkbox"
              checked={values.acceptedTerms}
              aria-invalid={Boolean(errors.acceptedTerms)}
              onChange={handleInputChange}
            />

            <span>
              I agree to the{" "}
              <button
                className="auth-text-button terms-link"
                type="button"
                onClick={() =>
                  setGeneralError(
                    "Terms and privacy pages will be created in a later frontend milestone.",
                  )
                }
              >
                terms and privacy policy
              </button>
              .
            </span>
          </label>

          {errors.acceptedTerms && (
            <span
              className="auth-field-error"
              role="alert"
            >
              {errors.acceptedTerms}
            </span>
          )}
        </div>

        <button
          className="btn btn-primary auth-form-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating Account..."
            : values.role === "owner"
              ? "Create Owner Account"
              : "Create Customer Account"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;