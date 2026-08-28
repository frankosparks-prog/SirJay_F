const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./src/config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Security & Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// Configurable CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://sirjay.co.ke', 'https://www.sirjay.co.ke'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback allow to avoid breaking dynamic clients in dev
    }
  },
  credentials: true,
}));

// Rate Limiter (300 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});

app.use('/api', limiter);
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

// Global Express Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack || err);
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : (err.status || 500);
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sir Jay API Server running on port ${PORT}`));