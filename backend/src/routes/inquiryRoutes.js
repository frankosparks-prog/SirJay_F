const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect } = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

// POST /api/contact/inquire (Public)
router.post('/inquire', async (req, res) => {
  try {
    const { fullName, phone, email, courseOfInterest, message } = req.body;
    if (!fullName || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please provide Name, Phone, and Message' });
    }

    const inquiry = await Inquiry.create({
      fullName,
      phone,
      email,
      courseOfInterest,
      message,
    });

    // 1. Send email alert to Admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #FAFAFA; border-radius: 10px;">
        <h2 style="color: #0F172A;">New Contact Us Inquiry Received</h2>
        <hr style="border-top: 2px solid #D4AF37;" />
        <p><strong>Sender Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email Address:</strong> ${email || 'Not Provided'}</p>
        <p><strong>Course of Interest:</strong> ${courseOfInterest}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #F1F5F9; padding: 12px; border-left: 4px solid #D4AF37; border-radius: 4px;">${message}</blockquote>
        <br />
        <p style="font-size: 12px; color: #64748B;">Login to Sir Jay Admin Dashboard to mark as read and respond.</p>
      </div>
    `;

    sendEmail({
      to: 'sirjaysuits@gmail.com',
      subject: `New Contact Inquiry from ${fullName} (${courseOfInterest})`,
      html: adminEmailHtml,
    }).catch(err => console.error('Admin Inquiry Email send failure:', err.message));

    // 2. Send confirmation email to Recipient User (if email provided)
    if (email && email.includes('@')) {
      const recipientEmailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 25px; background-color: #0B1329; color: #FFFFFF; border-radius: 12px; border: 1px solid #D4AF37;">
          <h2 style="color: #F59E0B; margin-top: 0;">Thank You for Contacting Sir Jay Training Institute</h2>
          <p>Dear <strong>${fullName}</strong>,</p>
          <p>We have successfully received your inquiry regarding <strong>${courseOfInterest}</strong>.</p>
          <p>Our admissions desk at Nanyuki Campus is reviewing your message and will reach out to you shortly via phone (<strong>${phone}</strong>) or email.</p>
          <div style="background-color: #1E293B; padding: 15px; border-left: 4px solid #F59E0B; margin: 20px 0; border-radius: 6px;">
            <p style="margin: 0; font-size: 13px; color: #CBD5E1;"><strong>Your Submitted Message:</strong></p>
            <p style="margin: 5px 0 0 0; font-style: italic; color: #E2E8F0;">"${message}"</p>
          </div>
          <p style="font-size: 13px; color: #94A3B8;">
            Sir Jay Training Institute • Hospital Road, Off Nyeri-Nanyuki Highway, Nanyuki<br/>
            Direct Helpline: +254 719 185 821 | Email: sirjaysuits@gmail.com
          </p>
        </div>
      `;

      sendEmail({
        to: email,
        subject: `Inquiry Confirmation - Sir Jay Training Institute`,
        html: recipientEmailHtml,
      }).catch(err => console.error('Recipient Confirmation Email send failure:', err.message));
    }

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully!', inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/contact/inquiries (Protected Admin)
router.get('/inquiries', protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/contact/inquiries/read-all (Protected Admin)
router.patch('/inquiries/read-all', protect, async (req, res) => {
  try {
    await Inquiry.updateMany({ isRead: false }, { isRead: true });
    res.json({ success: true, message: 'All inquiries marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/contact/inquiries/:id/read (Protected Admin)
router.patch('/inquiries/:id/read', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/contact/inquiries/:id (Protected Admin)
router.delete('/inquiries/:id', protect, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
