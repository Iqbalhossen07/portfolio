import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function GET(request) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET Messages Error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Database
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject: subject || "No Subject",
        message,
      },
    });

    // 2. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Email Template for Admin (You)
    const adminMailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Send via authenticated email
      replyTo: email,
      to: process.env.SMTP_USER, // Send to yourself
      subject: `New Portfolio Message: ${subject || "No Subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #14b8a6, #0f766e); padding: 30px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px;">New Message Received!</h2>
            <p style="color: #ccfbf1; margin-top: 10px; font-size: 14px;">You have a new inquiry from your portfolio.</p>
          </div>
          <div style="padding: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 30%;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; color: #0f172a; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; color: #0f172a; font-weight: bold;"><a href="mailto:${email}" style="color: #14b8a6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; color: #0f172a; font-weight: bold;">${subject || "No Subject"}</td>
              </tr>
            </table>
            <div style="margin-top: 30px;">
              <div style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Message</div>
              <div style="background: #f8fafc; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">Reply to ${name}</a>
            </div>
          </div>
          <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
            This email was automatically generated from your portfolio website.
          </div>
        </div>
      `,
    };

    // 4. Email Template for User (Auto-reply)
    const userMailOptions = {
      from: `"Iqbal Hossen" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background: #0f172a; padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: #94a3b8; margin-top: 10px; font-size: 16px;">I've received your message.</p>
          </div>
          <div style="padding: 40px 30px; color: #334155; line-height: 1.6; font-size: 16px;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thanks for getting in touch! I have received your message regarding <strong>"${subject || 'your inquiry'}"</strong>.</p>
            <p>I usually respond within 30 minutes to a few hours depending on my timezone (BST). I will review your message and get back to you as soon as possible.</p>
            <p>If you need immediate assistance, you can also reach me directly via <a href="https://wa.me/8801781834638" style="color: #14b8a6; font-weight: bold; text-decoration: none;">WhatsApp</a>.</p>
            <div style="margin-top: 40px; border-top: 1px solid #eaeaea; padding-top: 20px;">
              <p style="margin: 0; font-weight: bold; color: #0f172a;">Best regards,</p>
              <p style="margin: 5px 0 0 0; color: #64748b;">Md Iqbal Hossen<br>Software Engineer</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send emails (we can await Promise.all to send them concurrently)
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ message: "Message sent successfully", data: newMessage }, { status: 201 });
  } catch (error) {
    console.error("POST Message Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
