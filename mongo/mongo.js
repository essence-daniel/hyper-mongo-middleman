const mongoose = require("mongoose");

// Data Models
const Success = require("./models/success");

// MongoDB URI
const MONGO_DB_URI = process.env.MONGO_DB_URI || "";
var database = mongoose
  .connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Conected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB"));

module.exports = {
  database,
};
