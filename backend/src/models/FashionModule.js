const mongoose = require('mongoose');

const fashionModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, default: '3 Months' },
  desc: { type: String, required: true },
  order: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('FashionModule', fashionModuleSchema);
