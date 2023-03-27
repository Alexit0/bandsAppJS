function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidEmail(value) {
  return value && value.includes("@");
}

function isValidYear(value) {
  return +value && value % 1 == 0 && value > 1900 && value < 2099;
}

exports.isValidText = isValidText;
exports.isValidEmail = isValidEmail;
exports.isValidYear = isValidYear;
