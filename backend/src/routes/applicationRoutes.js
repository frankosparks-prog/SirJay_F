const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect } = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

// POST /api/admissions/apply (Public)
router.post('/apply', async (req, res) => {
  try {
    const { fullName, phone, email, intendedCourse, educationLevel, preferredIntake, schedulePreference } = req.body;
    if (!fullName || !phone || !intendedCourse) {
      return res.status(400).json({ success: false, message: 'Please provide required fields (Name, Phone, Course)' });
    }

    const application = await Application.create({
      fullName,
      phone,
      email,
      intendedCourse,
      educationLevel,
      preferredIntake,
      schedulePreference,
    });

    // 1. Dispatch email alert to Admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #FAFAFA; border-radius: 10px;">
        <h2 style="color: #0F172A;">New Student Online Application Received</h2>
        <hr style="border-top: 2px solid #D4AF37;" />
        <p><strong>Applicant Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email Address:</strong> ${email || 'Not Provided'}</p>
        <p><strong>Intended Course:</strong> ${intendedCourse}</p>
        <p><strong>Education Level:</strong> ${educationLevel}</p>
        <p><strong>Preferred Intake:</strong> ${preferredIntake}</p>
        <p><strong>Schedule Preference:</strong> ${schedulePreference}</p>
        <br />
        <p style="font-size: 12px; color: #64748B;">Login to Sir Jay Admin Dashboard to review and manage this application.</p>
      </div>
    `;

    sendEmail({
      to: 'sirjaysuits@gmail.com',
      subject: `New Student Application: ${fullName} (${intendedCourse})`,
      html: adminEmailHtml,
    }).catch(err => console.error('Admin Application Email send failure:', err.message));

    // 2. Dispatch confirmation email to Recipient Applicant (if email provided)
    if (email && email.includes('@')) {
      const applicantEmailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 25px; background-color: #0B1329; color: #FFFFFF; border-radius: 12px; border: 1px solid #D4AF37;">
          <h2 style="color: #F59E0B; margin-top: 0;">Application Received - Sir Jay Training Institute</h2>
          <p>Dear <strong>${fullName}</strong>,</p>
          <p>Congratulations! Your online application for <strong>${intendedCourse}</strong> has been successfully received by our Admissions Board.</p>
          <div style="background-color: #1E293B; padding: 15px; border-left: 4px solid #F59E0B; margin: 20px 0; border-radius: 6px;">
            <p style="margin: 0; font-size: 13px; color: #CBD5E1;"><strong>Application Summary:</strong></p>
            <p style="margin: 5px 0 0 0; color: #E2E8F0;">
              • Intended Program: ${intendedCourse}<br/>
              • Preferred Intake: ${preferredIntake}<br/>
              • Class Schedule: ${schedulePreference}<br/>
              • Contact Phone: ${phone}
            </p>
          </div>
          <p>Our admissions officer will contact you directly on <strong>${phone}</strong> to guide you through registration requirements, fee structures, and campus reporting schedules.</p>
          <p style="font-size: 13px; color: #94A3B8;">
            Sir Jay Training Institute • Hospital Road, Off Nyeri-Nanyuki Highway, Nanyuki<br/>
            Direct Helpline: +254 719 185 821 | Email: sirjaysuits@gmail.com
          </p>
        </div>
      `;

      sendEmail({
        to: email,
        subject: `Application Confirmation: ${intendedCourse} - Sir Jay Training Institute`,
        html: applicantEmailHtml,
      }).catch(err => console.error('Applicant Confirmation Email send failure:', err.message));
    }

    res.status(201).json({ success: true, message: 'Application submitted successfully!', application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admissions (Protected Admin)
router.get('/', protect, async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { intendedCourse: { $regex: search, $options: 'i' } },
      ];
    }

    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/admissions/:id/status (Protected Admin)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admissions/:id (Protected Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
