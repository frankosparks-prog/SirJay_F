const mongoose = require('mongoose');

const whyChooseCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: 'Feature' },
  iconName: { type: String, default: 'Scissors' },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('WhyChooseCard', whyChooseCardSchema);
