const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    key: { type: String, required: true },
    item: { type: String, required: true },
    size: { type: String, required: true },
    sku: { type: String, required: true },
  },
  { timestamps: true }
);

const Success = mongoose.model("Success", entrySchema);
module.exports = Success;
