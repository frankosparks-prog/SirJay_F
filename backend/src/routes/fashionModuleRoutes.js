const express = require('express');
const router = express.Router();
const FashionModule = require('../models/FashionModule');
const { protect } = require('../middleware/auth');

// GET /api/fashion-modules
router.get('/', async (req, res) => {
  try {
    const modules = await FashionModule.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: modules.length, modules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/fashion-modules (Protected)
router.post('/', protect, async (req, res) => {
  try {
    const moduleItem = await FashionModule.create(req.body);
    res.status(201).json({ success: true, module: moduleItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/fashion-modules/:id (Protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const moduleItem = await FashionModule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!moduleItem) return res.status(404).json({ success: false, message: 'Module not found' });
    res.json({ success: true, module: moduleItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/fashion-modules/:id (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const moduleItem = await FashionModule.findByIdAndDelete(req.params.id);
    if (!moduleItem) return res.status(404).json({ success: false, message: 'Module not found' });
    res.json({ success: true, message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
