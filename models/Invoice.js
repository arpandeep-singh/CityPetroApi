const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
