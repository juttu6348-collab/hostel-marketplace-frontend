import { calculatePasswordStrength } from "../../utils/authValidation";
import "./PasswordStrength.css";

function PasswordStrength({ password }) {
  if (!password) {
    return null;
  }

  const strength = calculatePasswordStrength(password);

  return (
    <div
      className="password-strength"
      aria-label={`Password strength: ${strength.label}`}
    >
      <div className="password-strength-header">
        <span>Password strength</span>

        <strong
          className={`password-strength-label password-strength-${strength.label.toLowerCase()}`}
        >
          {strength.label}
        </strong>
      </div>

      <div className="password-strength-bars">
        {[1, 2, 3, 4, 5].map((barNumber) => (
          <span
            className={
              barNumber <= strength.score
                ? `strength-bar-active strength-${strength.label.toLowerCase()}`
                : ""
            }
            key={barNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default PasswordStrength;