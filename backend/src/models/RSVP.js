const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  eventTitle: { type: String },
  fullName: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('RSVP', rsvpSchema);
