const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  intendedCourse: { type: String, required: true },
  educationLevel: { type: String, required: true },
  preferredIntake: { type: String, required: true },
  schedulePreference: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
