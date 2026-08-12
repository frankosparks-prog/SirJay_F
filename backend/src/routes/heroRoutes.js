const express = require('express');
const router = express.Router();
const HeroConfig = require('../models/HeroConfig');
const { protect } = require('../middleware/auth');

// GET /api/hero
router.get('/', async (req, res) => {
  try {
    let hero = await HeroConfig.findOne();
    if (!hero) {
      // Default fallback seed if DB empty
      hero = await HeroConfig.create({
        announcementBadgeText: 'Admissions Open for 2025/2026',
        announcementActive: true,
        stats: [
          { label: 'Graduated Alumni', value: '1,800', suffix: '+', iconName: 'Users' },
          { label: 'Professional Courses', value: '16', suffix: '+', iconName: 'GraduationCap' },
          { label: 'Self-Employment Rate', value: '95', suffix: '%', iconName: 'Briefcase' },
          { label: 'Practical Workshop Access', value: '100', suffix: '%', iconName: 'TrendingUp' }
        ]
      });
    }
    res.json({ success: true, hero });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/hero (Protected)
router.put('/', protect, async (req, res) => {
  try {
    const { announcementBadgeText, announcementActive, stats } = req.body;
    let hero = await HeroConfig.findOne();
    if (!hero) {
      hero = new HeroConfig({});
    }
    if (announcementBadgeText !== undefined) hero.announcementBadgeText = announcementBadgeText;
    if (announcementActive !== undefined) hero.announcementActive = announcementActive;
    if (stats !== undefined) hero.stats = stats;

    await hero.save();
    res.json({ success: true, hero });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
