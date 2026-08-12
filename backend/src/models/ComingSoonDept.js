const mongoose = require('mongoose');

const comingSoonDeptSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  iconName: { type: String, default: 'Palette' },
  status: { type: String, default: 'Registration Opening Soon' }
}, { timestamps: true });

module.exports = mongoose.model('ComingSoonDept', comingSoonDeptSchema);
