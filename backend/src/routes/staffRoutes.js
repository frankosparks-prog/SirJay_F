const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const { protect } = require('../middleware/auth');

// GET /api/staff (Public - get all staff ordered by hierarchy)
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find().sort({ hierarchyOrder: 1, createdAt: 1 });
    res.json({ success: true, count: staff.length, staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/staff (Protected Admin)
router.post('/', protect, async (req, res) => {
  try {
    const staffMember = await Staff.create(req.body);
    res.status(201).json({ success: true, staff: staffMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/staff/:id (Protected Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const staffMember = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, staff: staffMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/staff/:id (Protected Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Staff member removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
