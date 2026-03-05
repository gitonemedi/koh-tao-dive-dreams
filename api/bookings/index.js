import { handleOptions } from '../_lib/cors.js';
import { applyCors, handleOptions } from '../_lib/cors.js';
import { requireAdmin } from '../_lib/auth.js';
import { createClient } from '@supabase/supabase-js';


const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
// Bookings API with Supabase removed. Only accept POST to send email, no CRM/DB actions.
import nodemailer from 'nodemailer';
import { applyCors, handleOptions } from '../_lib/cors.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, phone, item_type, course_title, preferred_date, experience_level, addons, addons_json, addons_total, subtotal_amount, total_payable_now, message } = body || {};

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields: name and email' });
    }

    // Send booking email
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      res.status(500).json({ success: false, error: 'SMTP not configured' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const mailOptions = {
      from: smtpUser,
      to: 'contact@prodiving.asia',
      subject: 'New Booking Submission',
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\nItem Type: ${item_type || ''}\nCourse Title: ${course_title || ''}\nPreferred Date: ${preferred_date || ''}\nExperience Level: ${experience_level || ''}\nAddons: ${addons || ''}\nAddons JSON: ${addons_json || ''}\nAddons Total: ${addons_total || ''}\nSubtotal Amount: ${subtotal_amount || ''}\nTotal Payable Now: ${total_payable_now || ''}\nMessage: ${message || ''}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('api/bookings error', err);
    res.status(500).json({ error: err?.message || 'Internal error' });
  }
}