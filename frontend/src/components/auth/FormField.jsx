import "./FormField.css";

function FormField({
  id,
  label,
  name,
  type = "text",
  value,
  placeholder = "",
  autoComplete,
  error = "",
  hint = "",
  required = false,
  disabled = false,
  onChange,
  onBlur,
}) {
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

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        onChange={onChange}
        onBlur={onBlur}
      />

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
    </div>
  );
}

export default FormField;