const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const employeeRoute = require("./RoutesAndControllers/employeeRoute")

const app = express();
app.use(
  cors({
    allowedOrigin: ["*"],
  })
);
app.use(express.json());

PORT = process.env.PORT;
MONGODB_URL = process.env.MONGODB_URL;

const serverConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  } catch (error) {
    console.log("CONNECTION FAILED");
  }
};

serverConnect();


app.use("/api/", employeeRoute);