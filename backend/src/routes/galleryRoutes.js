const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// GET /api/gallery (Public)
router.get('/', async (req, res) => {
  try {
    const { category, type, circular, tour } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (type) query.type = type;
    if (circular === 'true') query.isCircularGallery = true;
    if (tour === 'true') query.isFacilityTour = true;

    const items = await GalleryItem.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/gallery/upload (Protected Admin - Upload file to Cloudinary)
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const fileUrl = req.file.path;
    const isVideo = req.file.mimetype.startsWith('video/');

    res.json({
      success: true,
      url: fileUrl,
      type: isVideo ? 'video' : 'image',
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/gallery (Protected Admin - Save Item)
router.post('/', protect, async (req, res) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/gallery/:id (Protected Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/gallery/:id (Protected Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
