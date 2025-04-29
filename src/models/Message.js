const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  alert: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert', required: true },
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
