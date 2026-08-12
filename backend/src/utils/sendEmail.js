const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    if (!process.env.EMAIL_PASS) {
      console.log('Nodemailer info: EMAIL_PASS not set in .env. Skipping email dispatch.');
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'sirjaysuits@gmail.com',
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Sir Jay Training Institute" <${process.env.EMAIL_USER || 'sirjaysuits@gmail.com'}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Nodemailer Error:', error.message);
    return false;
  }
};

module.exports = sendEmail;
