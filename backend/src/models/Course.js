const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  fees: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  unitsCovered: [
    {
      title: { type: String, required: true },
      desc: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
