const express = require('express');
const router = express.Router();
const ComingSoonDept = require('../models/ComingSoonDept');
const { protect } = require('../middleware/auth');

// GET /api/coming-soon
router.get('/', async (req, res) => {
  try {
    const depts = await ComingSoonDept.find().sort({ createdAt: 1 });
    res.json({ success: true, count: depts.length, depts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/coming-soon (Protected)
router.post('/', protect, async (req, res) => {
  try {
    const dept = await ComingSoonDept.create(req.body);
    res.status(201).json({ success: true, dept });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/coming-soon/:id (Protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const dept = await ComingSoonDept.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dept) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, dept });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/coming-soon/:id (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const dept = await ComingSoonDept.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
