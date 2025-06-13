const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  totalCopies: { type: Number, required: true, min: 0 },
  copiesAvailable: { type: Number, required: true, min: 0 },
  copiesIssued: { type: Number, required: true, min: 0, default: 0 },
});

module.exports = mongoose.model('Book', bookSchema);
