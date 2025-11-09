import nodemailer from "nodemailer";
import { sign, verify } from "jsonwebtoken";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "change_this_secret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "souravarora285@gmail.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_KEY,
  },
});

export async function sendAdminApprovalEmail(listing: {
  id: string;
  title?: string | null;
  locationValue?: string | null;
}) {
  const token = sign({ listingId: listing.id }, EMAIL_SECRET, {
    expiresIn: "2m",
  });
  const approveUrl = `${APP_URL}/api/admin/approve?token=${token}&action=approve`;
  const rejectUrl = `${APP_URL}/api/admin/approve?token=${token}&action=reject`;

  const html = `
    <h3>New property listed</h3>
    <p><strong>${listing.title ?? "Untitled"}</strong></p>
    <p>Location: ${listing.locationValue ?? "Unknown"}</p>
    <p>These links expire in 2 minutes.</p>
    <p><a href="${approveUrl}">Approve</a> | <a href="${rejectUrl}">Reject</a></p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: ADMIN_EMAIL,
    subject: "New property listing requires admin approval",
    html,
  });
}

export function verifyAdminToken(token: string) {
  try {
    return verify(token, EMAIL_SECRET) as {
      listingId: string;
      iat?: number;
      exp?: number;
    };
  } catch {
    return null;
  }
}
