const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const RSVP = require('../models/RSVP');
const { protect } = require('../middleware/auth');

// GET /api/events (Public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ success: true, count: events.length, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/events/rsvps/all (Protected Admin)
router.get('/rsvps/all', protect, async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    res.json({ success: true, count: rsvps.length, rsvps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/events (Protected Admin)
router.post('/', protect, async (req, res) => {
  try {
    const eventItem = await Event.create(req.body);
    res.status(201).json({ success: true, event: eventItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/events/:id (Protected Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const eventItem = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!eventItem) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event: eventItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/events/:id (Protected Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const eventItem = await Event.findByIdAndDelete(req.params.id);
    if (!eventItem) return res.status(404).json({ success: false, message: 'Event not found' });
    await RSVP.deleteMany({ eventId: req.params.id });
    res.json({ success: true, message: 'Event and associated RSVPs deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/events/:id/rsvp (Public RSVP with WhatsApp Number)
router.post('/:id/rsvp', async (req, res) => {
  try {
    const { fullName, whatsappNumber, email } = req.body;
    if (!fullName || !whatsappNumber) {
      return res.status(400).json({ success: false, message: 'Please provide Full Name and WhatsApp Number' });
    }

    const eventItem = await Event.findById(req.params.id);
    if (!eventItem) return res.status(404).json({ success: false, message: 'Event not found' });

    const rsvp = await RSVP.create({
      eventId: eventItem._id,
      eventTitle: eventItem.title,
      fullName,
      whatsappNumber,
      email,
    });

    res.status(201).json({ success: true, message: 'RSVP registered successfully! We will reach out via WhatsApp.', rsvp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
