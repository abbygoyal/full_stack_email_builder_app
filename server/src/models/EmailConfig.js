// backend/models/EmailConfig.js
const mongoose = require("mongoose");

const EmailConfigSchema = new mongoose.Schema({
  title: String,
  body: String,
  logoUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.EmailConfig ||
  mongoose.model("EmailConfig", EmailConfigSchema);
