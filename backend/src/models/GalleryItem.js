const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Fashion Design' },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  src: { type: String, required: true },
  poster: { type: String },
  desc: { type: String },
  tags: [{ type: String }],
  isCircularGallery: { type: Boolean, default: false },
  isFacilityTour: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
