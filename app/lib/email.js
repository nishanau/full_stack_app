import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;
  const mailOptions = {
    from: 'no-reply@example.com',
    to: user.email,
    subject: 'Verify your email',
    html: `<p>Hi ${user.name},</p>
           <p>Please verify your email by clicking the link below:</p>
           <a href="${verificationUrl}">Verify Email</a>`,
  };

  await transporter.sendMail(mailOptions);
};
