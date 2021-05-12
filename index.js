const express = require("express");
const helmet = require("helmet");
const app = express();
const mongoose = require("mongoose");
const MONGO_DB_URI = process.env.MONGO_DB_URI || "";

var database = mongoose
  .connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Conected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB"));


require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Import Routes 
const successRoute = require("./routes/success");
const _404Route = require('./routes/404')

// helmet() helps to secure the express app and express.json()
// parses the incomming requests to JSON
app.use(helmet());
app.use(express.json());

// Routes 
app.use("/success", successRoute);

// 404 response if navigated to unspecified path
app.use(_404Route)

// Start listening
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
