const bandToTitleCase = (bandName) => {
  return bandName
    .replace("_", " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

exports.bandToTitleCase = bandToTitleCase;
