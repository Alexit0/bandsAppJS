const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

const bandsRoute = require("./routes/bands");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(authRoutes);
app.use("/", bandsRoute);

app.listen(5000, () =>
  console.log(`\n *** Server is running on port 5000*** \n`)
);
