const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const studentRouter = require("./routers");

const app = express();
const DB_URI = process.env.MONGODB_URI;
const PORT = process.env.SERVER_PORT;
mongoose.connect(DB_URI).then(() => {
  console.log("Connected to DB");
  app.listen(PORT);
  console.log(`App listening to ${PORT}`);
});
app.use(cors());
app.use(bodyParser.json());
app.use("/students", studentRouter);
