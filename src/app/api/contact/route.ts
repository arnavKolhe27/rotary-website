import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS, // App password or OAuth token
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'rcamravatiambika@gmail.com',
      subject: `[New Web Inquiry] From: ${firstName} ${lastName}`,
      replyTo: email,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
}
