import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { z, ZodError } from 'zod';

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], methods: ['POST', 'GET'] }));

// --- ENV GUARDS ---
const required = [
  'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'MAIL_TO'
] as const;

const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === '');
if (missing.length) {
  console.error('Missing required env vars:', missing);
  // fail fast: you can throw or keep running with errors; throwing is clearer
  throw new Error(`Missing required env vars: ${missing.join(', ')}`);
}

function maskEmail(email?: string) {
  if (!email) return '';
  const [u, d] = email.split('@');
  return d ? `${u.slice(0, 2)}***@${d}` : email;
}

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

function createTransport() {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST!,      // MUST be set; otherwise fallback is localhost
    port,
    secure: port === 465,              // SSL for 465; STARTTLS for 587
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    requireTLS: port === 587,          // enforce STARTTLS on 587
  });
}

// --- DEBUG: env snapshot (non-sensitive) ---
app.get('/api/_env', (_req, res) => {
  res.json({
    PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: maskEmail(process.env.SMTP_USER),
    MAIL_FROM: process.env.MAIL_FROM,
    MAIL_TO: process.env.MAIL_TO,
  });
});

// --- DEBUG: nodemailer verify ---
app.get('/api/_verify', async (_req, res) => {
  try {
    const t = createTransport();
    const ok = await t.verify();
    res.json({ ok, host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT) });
  } catch (err: any) {
    res.status(400).json({
      error: err?.message || 'verify failed',
      code: err?.code,
      response: err?.response,
      hostTried: process.env.SMTP_HOST,
      portTried: Number(process.env.SMTP_PORT),
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = schema.parse(req.body);

    const transporter = createTransport();

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM!,  // must be your Zoho user or a verified sender
      to: process.env.MAIL_TO!,
      replyTo: `${name} <${email}>`,
      subject: `Veloste contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p style="white-space:pre-wrap">${message}</p>`,
    });

    console.log('Mail sent OK', { id: info.messageId });
    res.status(200).json({ ok: true });
  } catch (err: any) {
    if (err instanceof ZodError) {
      const first = err.issues?.[0];
      return res.status(400).json({ error: first?.message || 'Invalid input' });
    }
    const smtpCode = err?.responseCode || err?.code;
    const smtpResponse = err?.response || err?.command;
    console.error('SMTP send error:', {
      message: err?.message,
      code: smtpCode,
      response: smtpResponse,
      host: process.env.SMTP_HOST,
      user: maskEmail(process.env.SMTP_USER),
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
    });
    let hint = '';
    if (smtpCode === 535) hint = ' (SMTP auth failed: check SMTP_USER/SMTP_PASS)';
    if (String(smtpResponse || '').toLowerCase().includes('sender') &&
        String(smtpResponse || '').toLowerCase().includes('not')) {
      hint = ' (From address not allowed: set MAIL_FROM to your Zoho mailbox or verify the sender in Zoho Admin)';
    }
    return res.status(400).json({
      error: err?.message || 'Unable to send message',
      smtpCode,
      smtpResponse,
      hint: hint || undefined,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
