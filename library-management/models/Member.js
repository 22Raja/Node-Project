const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  membershipStart: { type: Date, default: Date.now },
  membershipExpiry: { type: Date, required: true },
});

module.exports = mongoose.model('Member', memberSchema);
