// const express = require("express");
// const router = express.Router();
// const LineUp = require("../db/bandMusInst");

// const bandToTitleCase = (bandName) => {
//   return bandName
//     .replace("_", " ")
//     .toLowerCase()
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// router.get("/:lineup", async (req, res) => {
//   const results = await LineUp.getLineUp(bandToTitleCase(req.params.lineup));
//   console.log(req.params);
//   res.send(results);
// });

// module.exports = router;
