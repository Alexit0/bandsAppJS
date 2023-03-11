// const knexConfig = require("./knexfile");
// const knex = require("knex")(knexConfig.development);

// function getLineUp(band) {
//   return knex("band_mus_inst")
//     .join("bands", "band_mus_inst.band_id", "=", "bands.id")
//     .join("musicians", "band_mus_inst.musician_id", "=", "musicians.id")
//     .join("instruments", "band_mus_inst.instrument_id", "=", "instruments.id")
//     .select(
//       "musicians.first_name as First_Name",
//       "musicians.last_name as Last_Name",
//       "instruments.name as Instrument"
//     )
//     .where("bands.name", band);
// }

// module.exports = {
//   getLineUp,
// };
