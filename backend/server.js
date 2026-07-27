const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Sample Sir Jay Courses API Endpoint
app.get('/api/courses', (req, res) => {
  res.json([
    {
      id: 1,
      category: 'fashion',
      title: 'Fashion Design & Garment Construction',
      level: 'Diploma / Certificate',
      duration: '6 Months to 1 Year',
      fees: 'KES 22,000 / Term',
      image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b'
    },
    {
      id: 2,
      category: 'ict',
      title: 'Graphic Design & Brand Arts',
      level: 'Certificate',
      duration: '3 Months',
      fees: 'KES 20,000 Total',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d'
    }
  ]);
});

// Online Application Form Handler
app.post('/api/admissions/apply', (req, res) => {
  const { name, phone, email, course, intake } = req.body;
  console.log('New Application Received:', { name, phone, email, course, intake });
  res.status(201).json({ success: true, message: 'Application submitted successfully!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sir Jay API Server running on port ${PORT}`));