const mongoose = require('mongoose');

const heroConfigSchema = new mongoose.Schema({
  announcementBadgeText: { type: String, default: 'Admissions Open for 2025/2026' },
  announcementActive: { type: Boolean, default: true },
  stats: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true },
      suffix: { type: String, default: '+' },
      iconName: { type: String, default: 'Users' }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('HeroConfig', heroConfigSchema);
