import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = process.env.MAIL_FROM ?? 'noreply@contentflow.ai';

export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  const link = `${process.env.CLIENT_ORIGIN}/verify-email/${token}`;
  await transporter.sendMail({
    from: FROM,
    to,
    subject: 'Verify your ContentFlow email',
    html: `<p>Click <a href="${link}">here</a> to verify your email. This link expires in 24 hours.</p>`,
  });
}

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  const link = `${process.env.CLIENT_ORIGIN}/reset-password/${token}`;
  await transporter.sendMail({
    from: FROM,
    to,
    subject: 'Reset your ContentFlow password',
    html: `<p>Click <a href="${link}">here</a> to reset your password. This link expires in 1 hour.</p>`,
  });
}
