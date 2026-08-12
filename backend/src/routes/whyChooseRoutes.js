const express = require('express');
const router = express.Router();
const WhyChooseCard = require('../models/WhyChooseCard');
const { protect } = require('../middleware/auth');

// GET /api/why-choose
router.get('/', async (req, res) => {
  try {
    const cards = await WhyChooseCard.find().sort({ createdAt: 1 });
    res.json({ success: true, count: cards.length, cards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/why-choose (Protected)
router.post('/', protect, async (req, res) => {
  try {
    const card = await WhyChooseCard.create(req.body);
    res.status(201).json({ success: true, card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/why-choose/:id (Protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const card = await WhyChooseCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    res.json({ success: true, card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/why-choose/:id (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const card = await WhyChooseCard.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    res.json({ success: true, message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
