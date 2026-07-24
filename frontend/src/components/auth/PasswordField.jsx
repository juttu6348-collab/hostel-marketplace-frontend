import { useState } from "react";
import "./FormField.css";

function PasswordField({
  id,
  label,
  name,
  value,
  placeholder = "",
  autoComplete,
  error = "",
  hint = "",
  required = false,
  onChange,
  onBlur,
  children,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [
    hint ? hintId : "",
    error ? errorId : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`auth-form-group ${
        error ? "auth-form-group-error" : ""
      }`}
    >
      <label htmlFor={id}>
        {label}

        {required && (
          <span className="required-indicator" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="password-input-wrapper">
        <input
          id={id}
          name={name}
          type={isVisible ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          onChange={onChange}
          onBlur={onBlur}
        />

        <button
          className="password-visibility-button"
          type="button"
          aria-label={
            isVisible ? "Hide password" : "Show password"
          }
          aria-pressed={isVisible}
          onClick={() =>
            setIsVisible((currentValue) => !currentValue)
          }
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>

      {hint && !error && (
        <span className="auth-field-hint" id={hintId}>
          {hint}
        </span>
      )}

      {error && (
        <span
          className="auth-field-error"
          id={errorId}
          role="alert"
        >
          {error}
        </span>
      )}

      {children}
    </div>
  );
}

export default PasswordField;