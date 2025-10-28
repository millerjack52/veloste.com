import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z, ZodError } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS for your production origin
  const origin = req.headers.origin || '';
  const allow = ['https://www.veloste.com', 'http://localhost:5173'];
  if (allow.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { name, email, message } = schema.parse(req.body);

    const port = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,          // e.g. smtp.zoho.com.au
      port,
      secure: port === 465,                  // SSL 465
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
      requireTLS: port === 587,
    });

    await transporter.verify(); // will throw if SMTP creds wrong

    await transporter.sendMail({
      from: process.env.MAIL_FROM!,          // must be allowed in Zoho
      to: process.env.MAIL_TO!,
      replyTo: `${name} <${email}>`,
      subject: `Veloste contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p style="white-space:pre-wrap">${message}</p>`,
    });

    res.status(200).json({ ok: true });
  } catch (err: any) {
    if (err instanceof ZodError) {
      const first = err.issues?.[0];
      return res.status(400).json({ error: first?.message || 'Invalid input' });
    }
    return res.status(400).json({
      error: err?.message || 'Unable to send message',
      code: err?.code || err?.responseCode,
      response: err?.response,
    });
  }
}
