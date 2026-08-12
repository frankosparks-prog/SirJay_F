const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Inquiry = require('../models/Inquiry');
const Event = require('../models/Event');
const RSVP = require('../models/RSVP');
const Course = require('../models/Course');
const GalleryItem = require('../models/GalleryItem');
const Staff = require('../models/Staff');
const { protect } = require('../middleware/auth');

// GET /api/admin/dashboard-stats
router.get('/dashboard-stats', protect, async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'Pending' });
    const totalInquiries = await Inquiry.countDocuments();
    const unreadInquiries = await Inquiry.countDocuments({ isRead: false });
    const totalEvents = await Event.countDocuments();
    const totalRSVPs = await RSVP.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalGalleryItems = await GalleryItem.countDocuments();
    const totalStaff = await Staff.countDocuments();

    res.json({
      success: true,
      stats: {
        totalApplications,
        pendingApplications,
        totalInquiries,
        unreadInquiries,
        totalEvents,
        totalRSVPs,
        totalCourses,
        totalGalleryItems,
        totalStaff,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
