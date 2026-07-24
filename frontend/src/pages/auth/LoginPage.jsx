import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import FormField from "../../components/auth/FormField";
import PasswordField from "../../components/auth/PasswordField";
import { useAuth } from "../../context/AuthContext";
import {
  validateEmail,
  validatePassword,
} from "../../utils/authValidation";
import ROUTES from "../../constants/routes";
import "./AuthPages.css";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectFromQuery = searchParams.get("redirect");
  const redirectFromState = location.state?.from;

  const redirectPath =
    redirectFromQuery ||
    redirectFromState ||
    ROUTES.ACCOUNT;

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

  function validateForm() {
    const nextErrors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };

    Object.keys(nextErrors).forEach((key) => {
      if (!nextErrors[key]) {
        delete nextErrors[key];
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    let error = "";

    if (name === "email") {
      error = validateEmail(value);
    }

    if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: error,
    }));
  }

  function handleUseDemoAccount() {
    setValues({
      email: "student@hostelhub.demo",
      password: "Student123",
      rememberMe: true,
    });

    setErrors({});
    setGeneralError("");
  }

  function handleUseAdminAccount() {
  setValues({
    email: "admin@hostelhub.demo",
    password: "Admin123",
    rememberMe: true,
  });

  setErrors({});
  setGeneralError("");
}

function handleUseOwnerAccount() {
  setValues({
    email: "owner@hostelhub.demo",
    password: "Owner123",
    rememberMe: true,
  });

  setErrors({});
  setGeneralError("");
}

  function handleForgotPassword() {
    setGeneralError(
      "Password recovery will be connected when backend email services are implemented.",
    );
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
        window.setTimeout(resolve, 600);
      });

const loggedInUser = login({
  email: values.email,
  role: "customer",
  password: values.password,
});

let destination = redirectPath;

if (loggedInUser.role === "admin") {
  destination = ROUTES.ADMIN_DASHBOARD;
} else if (loggedInUser.role === "owner") {
  destination = ROUTES.OWNER_DASHBOARD;
}

navigate(destination, {
  replace: true,
});

    } catch (error) {
      console.error("Mock login failed:", error);

      setGeneralError(
        "Unable to complete login. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to your account"
      description="Access your saved hostels, booking requests and account information."
      footerText="Do not have an account?"
      footerLinkText="Create an account"
      footerLinkTo={ROUTES.REGISTER}
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

        <FormField
          id="loginEmail"
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

        <PasswordField
          id="loginPassword"
          label="Password"
          name="password"
          value={values.password}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password}
          required
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <div className="auth-form-options">
          <label className="auth-checkbox-label">
            <input
              name="rememberMe"
              type="checkbox"
              checked={values.rememberMe}
              onChange={handleInputChange}
            />

            <span>Keep me signed in on this device</span>
          </label>

          <button
            className="auth-text-button"
            type="button"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <button
          className="btn btn-primary auth-form-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>

        <div className="auth-divider">
          <span>Frontend demonstration</span>
        </div>

<div className="demo-account-box">
  <strong>Use a demonstration account</strong>

  <div className="demo-account-option">
    <p>
      Customer:{" "}
      <code>student@hostelhub.demo</code>
    </p>

    <button
      className="auth-text-button"
      type="button"
      onClick={handleUseDemoAccount}
    >
      Fill Customer Credentials
    </button>
  </div>

  <div className="demo-account-option">
  <p>
    Owner:{" "}
    <code>owner@hostelhub.demo</code>
  </p>

  <button
    className="auth-text-button"
    type="button"
    onClick={handleUseOwnerAccount}
  >
    Fill Owner Credentials
  </button>
</div>

  <div className="demo-account-option">
    <p>
      Admin:{" "}
      <code>admin@hostelhub.demo</code>
    </p>

    <button
      className="auth-text-button"
      type="button"
      onClick={handleUseAdminAccount}
    >
      Fill Admin Credentials
    </button>
  </div>
</div>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;