import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
console.log('Initializing database...');
const db = new Database('./bookings.db');

console.log('Creating table...');
db.exec(`
  CREATE TABLE IF NOT EXISTS booking_inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    course_title TEXT NOT NULL,
    preferred_date TEXT,
    experience_level TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT NOT NULL
  )
`);

// Add status column if it doesn't exist
try {
  db.exec(`ALTER TABLE booking_inquiries ADD COLUMN status TEXT DEFAULT 'pending'`);
  console.log('Added status column');
} catch (e) {
  // Column already exists
}

console.log('Database initialized successfully');

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'bookingbas@onemedia.asia',
    pass: process.env.SMTP_PASS || 'Fd~6BQj?#6I',
  },
});

// Test email connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter error:', error.message);
    console.log('Email functionality will not work until SMTP credentials are fixed');
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// API Routes

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Submit booking
app.post('/api/bookings', async (req, res) => {
  console.log('Booking request received:', req.body);
  try {
    const { name, email, phone, course_title, preferred_date, experience_level, message } = req.body;
    const id = randomUUID();
    const created_at = new Date().toISOString();

    console.log('Inserting into database...');
    const stmt = db.prepare(`
      INSERT INTO booking_inquiries (id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `);
    const result = stmt.run(id, name, email, phone, course_title, preferred_date, experience_level, message, created_at);
    console.log('Database insert result:', result);

    // Send admin notification email
    try {
      const adminMailOptions = {
        from: 'bookingbas@onemedia.asia',
        to: 'peter@onemedia.asia',
        subject: `New Booking Inquiry: ${course_title}`,
        html: `
          <h2>New Booking Inquiry</h2>
          <p><strong>Course/Dive:</strong> ${course_title}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Preferred Date:</strong> ${preferred_date || 'Not specified'}</p>
          <p><strong>Experience Level:</strong> ${experience_level || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message ? message.replace(/\n/g, '<br>') : 'No message'}</p>
        `,
      };
      await transporter.sendMail(adminMailOptions);
      console.log('Admin notification email sent');
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    // Send customer confirmation email
    try {
      const customerMailOptions = {
        from: 'bookingbas@onemedia.asia',
        to: email,
        subject: `Booking Confirmation - ${course_title}`,
        html: `
          <h2>Thank you for your booking inquiry!</h2>
          <p>Dear ${name},</p>
          <p>We have received your inquiry for <strong>${course_title}</strong> and will get back to you shortly.</p>
          
          <h3>Your Booking Details:</h3>
          <p><strong>Course/Dive:</strong> ${course_title}</p>
          ${preferred_date ? `<p><strong>Preferred Date:</strong> ${preferred_date}</p>` : ''}
          ${experience_level ? `<p><strong>Experience Level:</strong> ${experience_level}</p>` : ''}
          
          <p>If you have any questions, feel free to reply to this email or contact us directly.</p>
          
          <p>Best regards,<br>The Dive School Team</p>
        `,
      };
      await transporter.sendMail(customerMailOptions);
      console.log('Customer confirmation email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send customer confirmation:', emailError);
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to submit booking', details: error.message });
  }
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM booking_inquiries ORDER BY created_at DESC');
    const bookings = stmt.all();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update booking status
app.patch('/api/bookings/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const stmt = db.prepare('UPDATE booking_inquiries SET status = ? WHERE id = ?');
    stmt.run(status, id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Delete booking
app.delete('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM booking_inquiries WHERE id = ?');
    stmt.run(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  console.log('Contact form request received:', req.body);
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    const id = randomUUID();
    const created_at = new Date().toISOString();

    console.log('Inserting contact into database...');
    const stmt = db.prepare(`
      INSERT INTO booking_inquiries (id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `);
    const result = stmt.run(id, `${firstName} ${lastName}`, email, null, `Contact: ${subject}`, null, null, message, created_at);
    console.log('Database insert result:', result);

    // Send email notification
    const mailOptions = {
      from: 'bookingbas@onemedia.asia',
      to: 'peter@onemedia.asia',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email send error:', error);
        // Don't fail the request if email fails
      } else {
        console.log('Contact email sent:', info.response);
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
