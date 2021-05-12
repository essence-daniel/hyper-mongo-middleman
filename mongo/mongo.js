const mongoose = require("mongoose");

// Data Models
const Success = require("./models/success");

// MongoDB URI
const MONGO_DB_URI = process.env.MONGO_DB_URI || "";

// Connect to MongoDB
mongoose
  .connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Conected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB"));

// Methods

const postSuccess = (req, res) => {
  const { item, size, sku } = req.body;

  // Allows for either method of key passing
  const key =
    req.headers?.authorization?.replace(/(bearer| )/gi, "") || req.query.key;

  // Creates new Success model with relevant data
  const success = new Success({
    item,
    size,
    sku,
    key,
  });

  // Save success entry to MongoDB
  success
    .save()
    .then((result) => {
      res.status(201).send({ message: "added success" });
    })
    .catch((err) => {
      res.status(500).send({ message: "failed to add success" });
      console.log(err);
    });
};

const getSuccesses = (req, res) => {
  // Retrieves ALL data entries from the success database
  // Remove the commenting from .limit(50) to limit the 
  // number of results to 50
  Success.find()
  // .limit(50)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send({ message: "failed to retrieve data" });
    });
};

module.exports = {
  postSuccess,
  getSuccesses,
};
