const express = require("express");
const authenticate = require("../middleware/authenticate");
const Success = require("../models/success");

const router = express.Router();

// As we are already listening on "/success" in index.js,
// we only need to specify "/" in here.
// If you wanted multiple success types (e.g. Nike and Supreme),
// you could specify "/supreme" and "/nike" which would then have
// the url of https://mysite.com/success/supreme etc.

// handle GET
router.get("/", authenticate, (req, res) => {
  Success.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send({ message: "failed to retrieve data" });
    });
});

// handle POST
router.post("/", authenticate, (req, res) => {
  const { item, size, sku } = req.body;

  // checks if all data required is present
  // if not all data is required then you can remove individual items
  // from the below statement
  if (!(item && size && sku)) {
    res.status(418).send({ message: "incomplete data" });
  } else {
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
  }
});

module.exports = router;
