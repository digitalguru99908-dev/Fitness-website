import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/inquiry", async (req, res) => {
  const { name, phone, plan, message } = req.body as {
    name?: string;
    phone?: string;
    plan?: string;
    message?: string;
  };

  if (!name || !phone) {
    res.status(400).json({ error: "Name and phone are required." });
    return;
  }

  const gmailUser = "digitalguru99908@gmail.com";
  const appPassword = process.env["GMAIL_APP_PASSWORD"];

  if (!appPassword) {
    logger.error("GMAIL_APP_PASSWORD secret is not set");
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: appPassword,
    },
  });

  const mailOptions = {
    from: `"Infinity Fitness Gym" <${gmailUser}>`,
    to: gmailUser,
    subject: `New Inquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #ffffff; border: 1px solid #7c3aed;">
        <h2 style="color: #7c3aed; text-transform: uppercase; letter-spacing: 2px;">New Membership Inquiry</h2>
        <hr style="border-color: #7c3aed; margin: 16px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #aaa; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; font-weight: bold;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Preferred Plan</td>
            <td style="padding: 10px 0; font-weight: bold;">${plan || "Not specified"}</td>
          </tr>
          ${
            message
              ? `<tr>
            <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Message</td>
            <td style="padding: 10px 0;">${message}</td>
          </tr>`
              : ""
          }
        </table>
        <hr style="border-color: #333; margin: 16px 0;" />
        <p style="color: #666; font-size: 12px;">Sent from Infinity Fitness Gym website contact form.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info({ name, phone, plan }, "Inquiry email sent");
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send inquiry email");
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
