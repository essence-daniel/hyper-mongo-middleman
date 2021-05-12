const express = require("express");
const authenticate = require("../middleware/authenticate");
const mongo = require("../mongo/mongo");

const router = express.Router();

// As we are already listening on "/success" in index.js,
// we only need to specify "/" in here.
// If you wanted multiple success types (e.g. Nike and Supreme),
// you could specify "/supreme" and "/nike" which would then have
// the url of https://mysite.com/success/supreme etc.

// handle GET
router.get("/", authenticate, (req, res) => {
  mongo.getSuccesses(req, res);
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
    mongo.postSuccess(req, res);
  }
});

module.exports = router;
