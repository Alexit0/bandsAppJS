// require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

const bandsRoute = require("./routes/bands");
const LineUpRoute = require("./routes/bandMusInst");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use("/", bandsRoute);
// app.use("/lineup", LineUpRoute);

app.listen(5000, () =>
  console.log(`\n *** Server is running on port 5000*** \n`)
);
