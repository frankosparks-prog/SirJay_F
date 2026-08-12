const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, default: 'Exhibition' },
  badge: { type: String, default: 'Featured Event' },
  description: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
