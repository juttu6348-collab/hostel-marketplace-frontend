export function validateMoveInDate(moveInDate) {
  if (!moveInDate) {
    return "Select your expected move-in date.";
  }

  const selectedDate = new Date(`${moveInDate}T00:00:00`);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(selectedDate.getTime())) {
    return "Enter a valid move-in date.";
  }

  if (selectedDate < today) {
    return "Move-in date cannot be in the past.";
  }

  return "";
}

export function validateStayDuration(duration) {
  if (!duration) {
    return "Select your expected stay duration.";
  }

  return "";
}

export function validateGuardianName(guardianName) {
  if (!guardianName.trim()) {
    return "Guardian name is required.";
  }

  if (guardianName.trim().length < 3) {
    return "Guardian name must contain at least 3 characters.";
  }

  return "";
}

export function validateMessage(message) {
  if (message.length > 500) {
    return "Additional message cannot exceed 500 characters.";
  }

  return "";
}