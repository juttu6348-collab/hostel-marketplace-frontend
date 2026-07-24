export function validateEmail(email) {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    return "Email address is required.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(normalizedEmail)) {
    return "Enter a valid email address.";
  }

  return "";
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain an uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain a lowercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain a number.";
  }

  return "";
}

export function validateFullName(fullName) {
  const normalizedName = fullName.trim();

  if (!normalizedName) {
    return "Full name is required.";
  }

  if (normalizedName.length < 3) {
    return "Full name must contain at least 3 characters.";
  }

  return "";
}

export function validatePhoneNumber(phoneNumber) {
  const normalizedPhone = phoneNumber.replace(/\s+/g, "");

  if (!normalizedPhone) {
    return "Phone number is required.";
  }

  const pakistanPhonePattern = /^(\+92|0)3[0-9]{9}$/;

  if (!pakistanPhonePattern.test(normalizedPhone)) {
    return "Enter a valid Pakistani mobile number.";
  }

  return "";
}

export function validateCnic(cnic) {
  const normalizedCnic = cnic.replace(/-/g, "").trim();

  if (!normalizedCnic) {
    return "CNIC is required for hostel-owner registration.";
  }

  if (!/^[0-9]{13}$/.test(normalizedCnic)) {
    return "CNIC must contain exactly 13 digits.";
  }

  return "";
}

export function calculatePasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  if (score <= 1) {
    return {
      score,
      label: "Weak",
    };
  }

  if (score <= 3) {
    return {
      score,
      label: "Medium",
    };
  }

  return {
    score,
    label: "Strong",
  };
}