const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type:        { type: String, required: true },
  description: { type: String },
  location: {
    type:        { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  priority:    { type: String, enum: ['low','medium','high'], default: 'medium' },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status:      { type: String, enum: ['open','matched','closed'], default: 'open' },
}, { timestamps: true });

alertSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Alert', alertSchema);
