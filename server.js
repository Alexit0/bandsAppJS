const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

const bandsRoutes = require("./routes/bands");
const musiciansRoutes = require("./routes/musicians");
const instrumentsRoutes = require("./routes/instruments");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(authRoutes);
app.use("/musicians", musiciansRoutes);
app.use("/instruments", instrumentsRoutes);
app.use("/", bandsRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong..";
  res.status(status).json({ message: message });
});

app.listen(5000, () =>
  console.log(`\n *** Server is running on port 5000*** \n`)
);
