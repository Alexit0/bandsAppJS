function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidEmail(value) {
  return value && value.includes("@");
}

function isValidYear(value) {
  return;
}

exports.isValidText = isValidText;
exports.isValidEmail = isValidEmail;
