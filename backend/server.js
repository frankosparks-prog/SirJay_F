const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./src/config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/hero', require('./src/routes/heroRoutes'));
app.use('/api/why-choose', require('./src/routes/whyChooseRoutes'));
app.use('/api/fashion-modules', require('./src/routes/fashionModuleRoutes'));
app.use('/api/coming-soon', require('./src/routes/comingSoonRoutes'));
app.use('/api/courses', require('./src/routes/courseRoutes'));
app.use('/api/admissions', require('./src/routes/applicationRoutes'));
app.use('/api/contact', require('./src/routes/inquiryRoutes'));
app.use('/api/events', require('./src/routes/eventRoutes'));
app.use('/api/gallery', require('./src/routes/galleryRoutes'));
app.use('/api/faqs', require('./src/routes/faqRoutes'));
app.use('/api/staff', require('./src/routes/staffRoutes'));
app.use('/api/admin', require('./src/routes/adminStatsRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Sir Jay API Server Running smoothly' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sir Jay API Server running on port ${PORT}`));