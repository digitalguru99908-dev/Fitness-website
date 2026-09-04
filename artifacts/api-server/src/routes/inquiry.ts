import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const GYM_EMAIL = "digitalguru99908@gmail.com";
const GYM_PHONE_DISPLAY = "81688 28832";
const GYM_PHONE_TEL = "+918168828832";
const GYM_WHATSAPP = "https://wa.me/918168828832";
const GYM_ADDRESS =
  "Kaithal - Dhand Rd, Opp. Maharaja Palace, Rishi Nagar, Kaithal, Haryana 136027";

// Free trial kitne din ka hai — owner/customer kam kare to bas yahan badlo (ek jagah).
const FREE_TRIAL_DAYS = 7;

const RESEND_API_URL = "https://api.resend.com/emails";

// ── Email delivery — try Gmail SMTP pehle, phir Resend fallback ──
// Gmail SMTP kisi bhi recipient ko bhej sakta hai (Resend ke free plan par
// onboarding@resend.dev se sirf owner email jaata hai). Isliye hum Gmail ko
// primary rakhte hain taaki customer ko auto-reply pakka pahunche. Agar
// Gmail unavailable ho (jaise Render par IPv6 wala issue) to Resend try hota hai.

const gmailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 15000,
  socketTimeout: 20000,
  auth: {
    user: GYM_EMAIL,
    pass: process.env["GMAIL_APP_PASSWORD"] || "",
  },
});

const gmailSender = async (options: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> => {
  if (!process.env["GMAIL_APP_PASSWORD"]) {
    throw new Error("GMAIL_APP_PASSWORD secret is not set");
  }
  await gmailTransporter.sendMail({
    from: `"Infinity Fitness Gym" <${GYM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};

const resendSender = async (options: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> => {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    throw new Error("RESEND_API_KEY secret is not set");
  }
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Infinity Fitness Gym <onboarding@resend.dev>",
      to: [options.to],
      subject: options.subject,
      html: options.html,
    }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Resend API error ${response.status}: ${text}`);
  }
};

// Ek unified sender: Gmail pehle, fail hone par Resend. Return transport naam.
const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
}): Promise<string> => {
  try {
    await gmailSender(options);
    return "gmail";
  } catch (gmailErr) {
    logger.warn({ err: gmailErr }, "Gmail SMTP failed — trying Resend fallback");
    try {
      await resendSender(options);
      return "resend";
    } catch (resendErr) {
      throw new Error(
        `Both email providers failed. Gmail: ${(gmailErr as Error).message} | Resend: ${(resendErr as Error).message}`,
      );
    }
  }
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

interface Topic {
  keywords: string[];
  title: string;
  html: string;
}

// Customer ke message se common questions detect karke ready-made sahi jawab
const TOPICS: Topic[] = [
  {
    keywords: [
      "fee", "fees", "fess", "price", "prices", "pricing", "rate", "rates",
      "cost", "costs", "charge", "charges", "kitna", "kitne", "kitni",
      "paisa", "paise", "rupees", "membership", "monthly", "yearly",
      "package", "plan", "plans", "6 month", "six month", "1 year",
      "one year", "admission",
    ],
    title: "Membership Fees",
    html: `
      <table style="width:100%; border-collapse:collapse; margin:8px 0;">
        <tr><td style="padding:6px 0; color:#ccc;">Standard Monthly</td><td style="padding:6px 0; color:#FF3C00; font-weight:bold; text-align:right;">&#8377;2,000 / month</td></tr>
        <tr><td style="padding:6px 0; color:#ccc;">6-Month Package</td><td style="padding:6px 0; color:#FF3C00; font-weight:bold; text-align:right;">&#8377;6,000 total <span style="color:#25D366;">(save &#8377;6,000)</span></td></tr>
        <tr><td style="padding:6px 0; color:#ccc;">1-Year Package</td><td style="padding:6px 0; color:#FF3C00; font-weight:bold; text-align:right;">&#8377;11,000 total <span style="color:#25D366;">(~&#8377;917/month)</span></td></tr>
      </table>
      <p style="margin:4px 0 0; color:#aaa; font-size:13px;">Koi joining fee nahi hai — jo membership amount hai bas wahi. Kabhi bhi upgrade kar sakte ho, sirf difference pay karna hota hai.</p>
    `,
  },
  {
    keywords: [
      "time", "timing", "timings", "hour", "hours", "open", "opens",
      "close", "closes", "khulta", "khul", "band", "kab", "morning",
      "evening", "night", "schedule", "sunday",
    ],
    title: "Gym Timings",
    html: `<p style="margin:4px 0; color:#ddd;">Gym saatono 7 din khulta hai — subah se raat <b style="color:#FF3C00;">11:00 PM</b> tak. Shaam 6–9 PM sabse busy hours hote hain, off-peak time zyada peaceful rehta hai.</p>`,
  },
  {
    keywords: [
      "location", "address", "where", "kahan", "kaha", "direction",
      "directions", "reach", "map", "pata", "place", "kidhar",
    ],
    title: "Location",
    html: `<p style="margin:4px 0; color:#ddd;">${GYM_ADDRESS}</p><p style="margin:4px 0; color:#aaa; font-size:13px;">Google Maps par &quot;Infinity Fitness Gym Kaithal&quot; search karke easily aa sakte ho.</p>`,
  },
  {
    keywords: ["trial", "demo", "tour", "visit", "first visit", "pehli baar"],
    title: "Free Trial",
    html: `<p style="margin:4px 0; color:#ddd;">Aapka <b style="color:#FF3C00;">${FREE_TRIAL_DAYS}-din ka free trial</b> hai — koi commitment nahi. Kisi bhi off-peak time par aa jao, hum gym ka pura tour karwayenge.</p>`,
  },
  {
    keywords: [
      "payment", "pay", "upi", "paytm", "gpay", "google pay", "phonepe",
      "bank", "transfer", "cash", "card", "emi",
    ],
    title: "Payment Options",
    html: `<p style="margin:4px 0; color:#ddd;">Cash, UPI (Google Pay, PhonePe, Paytm) aur direct bank transfer — sab accept karte hain.</p>`,
  },
  {
    keywords: ["freeze", "pause", "hold", "break"],
    title: "Membership Freeze",
    html: `<p style="margin:4px 0; color:#ddd;">Membership ek term me ek baar tak <b style="color:#FF3C00;">30 days</b> ke liye freeze kar sakte ho (medical reason, travel ya emergency par).</p>`,
  },
  {
    keywords: [
      "trainer", "trainers", "coach", "coaches", "guidance",
      "personal training", "personal trainer",
    ],
    title: "Trainers",
    html: `<p style="margin:4px 0; color:#ddd;">Certified trainers roz gym floor par hote hain — form, progress aur goals sab personally dekhte hain. Personal guidance membership me included hai.</p>`,
  },
  {
    keywords: [
      "weight loss", "weight gain", "fat loss", "muscle", "yoga",
      "workout", "program", "programs", "diet",
    ],
    title: "Programs",
    html: `<p style="margin:4px 0; color:#ddd;">Strength Training, Cardio, Weight Gain, Weight Loss, Yoga aur Modern Equipment zones — har goal ke liye targeted programs milte hain.</p>`,
  },
];

const detectTopics = (message: string): Topic[] => {
  if (!message) return [];
  const normalized = message.toLowerCase();
  return TOPICS.filter((topic) =>
    topic.keywords.some((kw) =>
      new RegExp(`(^|[^a-z])${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`).test(normalized),
    ),
  );
};

const buildOwnerEmailHtml = (data: {
  name: string;
  phone: string;
  email?: string;
  plan?: string;
  message?: string;
}): string => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #ffffff; border: 1px solid #7c3aed;">
    <h2 style="color: #7c3aed; text-transform: uppercase; letter-spacing: 2px;">New Membership Inquiry</h2>
    <hr style="border-color: #7c3aed; margin: 16px 0;" />
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #aaa; width: 140px; vertical-align: top;">Name</td>
        <td style="padding: 10px 0; font-weight: bold;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Phone</td>
        <td style="padding: 10px 0; font-weight: bold;">${escapeHtml(data.phone)}</td>
      </tr>
      ${data.email ? `<tr>
        <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Email</td>
        <td style="padding: 10px 0; font-weight: bold;">${escapeHtml(data.email)}</td>
      </tr>` : ""}
      <tr>
        <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Preferred Plan</td>
        <td style="padding: 10px 0; font-weight: bold;">${escapeHtml(data.plan || "Not specified")}</td>
      </tr>
      ${
        data.message
          ? `<tr>
        <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Message</td>
        <td style="padding: 10px 0;">${escapeHtml(data.message)}</td>
      </tr>`
          : ""
      }
    </table>
    <hr style="border-color: #333; margin: 16px 0;" />
    <p style="color: #666; font-size: 12px;">Sent from Infinity Fitness Gym website contact form. Is customer ko auto-reply email already chala gaya hai.</p>
  </div>
`;

const buildAutoReplyHtml = (name: string, topics: Topic[]): string => {
  const firstName = name.trim().split(/\s+/)[0] || "there";

  const quickAnswers = topics.length
    ? `
      <div style="background:#141414; border:1px solid #333; border-radius:8px; padding:18px 20px; margin:18px 0;">
        <p style="margin:0 0 6px; color:#FF3C00; font-weight:bold; text-transform:uppercase; letter-spacing:1px; font-size:13px;">Quick Answers</p>
        ${topics.map((t) => `
          <div style="margin-top:12px;">
            <p style="margin:0 0 2px; color:#ffffff; font-weight:bold;">${t.title}</p>
            ${t.html}
          </div>
        `).join("")}
      </div>`
    : "";

  const specificLine = topics.length
    ? `Aapke sawaal ka jawab upar &quot;Quick Answers&quot; me hai. Agar kuch aur poochna ho to seedha is email ko reply kar do.`
    : `Aapka sawaal humari team ko mil gaya hai — hum 1–2 din ke andar sahi jawab ke saath contact karenge.`;

  return `
  <div style="font-family: Arial, sans-serif; background:#f4f4f5; padding:24px 12px;">
    <div style="max-width:600px; margin:0 auto; background:#0a0a0a; border-radius:10px; overflow:hidden; border:1px solid #262626;">
      <div style="background:linear-gradient(135deg,#FF3C00,#ff7a45); padding:22px 28px;">
        <p style="margin:0; color:#ffffff; font-size:20px; font-weight:bold; letter-spacing:2px;">INFINITY FITNESS</p>
        <p style="margin:2px 0 0; color:rgba(255,255,255,0.85); font-size:12px; letter-spacing:1px;">KAITHAL &middot; TRAIN HARD, STAY HUMBLE</p>
      </div>

      <div style="padding:28px;">
        <p style="margin:0 0 14px; color:#ffffff; font-size:18px; font-weight:bold;">Namaste ${escapeHtml(firstName)}! 🙏</p>

        <p style="margin:0 0 12px; color:#dddddd; line-height:1.6;">
          Aapki inquiry receive ho gayi hai — <b style="color:#FF3C00;">thanks for reaching out!</b>
          Humari team aapse <b style="color:#ffffff;">24 ghante ke andar</b> call karegi aapki details discuss karne ke liye.
        </p>

        ${quickAnswers}

        <p style="margin:0 0 12px; color:#dddddd; line-height:1.6;">${specificLine}</p>

        <p style="margin:0 0 18px; color:#dddddd; line-height:1.6;">
          Agar turant jawab chahiye to seedha call ya WhatsApp karo:
          <a href="tel:${GYM_PHONE_TEL}" style="color:#FF3C00; font-weight:bold; text-decoration:none;">${GYM_PHONE_DISPLAY}</a>
        </p>

        <a href="${GYM_WHATSAPP}" style="display:inline-block; background:#25D366; color:#06301a; font-weight:bold; padding:12px 26px; border-radius:6px; text-decoration:none; letter-spacing:1px;">WhatsApp Par Message Karein</a>

        <hr style="border:none; border-top:1px solid #262626; margin:24px 0;" />

        <p style="margin:0; color:#888888; font-size:12px; line-height:1.7;">
          📍 ${GYM_ADDRESS}<br />
          🕐 Open all 7 days till 11:00 PM<br />
          📞 ${GYM_PHONE_DISPLAY} &nbsp;|&nbsp; ✉️ ${GYM_EMAIL}
        </p>
        <p style="margin:14px 0 0; color:#666666; font-size:11px;">
          Ye ek automatic confirmation email hai — aapne Infinity Fitness Gym website par inquiry fill ki thi. Thanks for your query, we will try to contact you as soon as possible!
        </p>
      </div>
    </div>
  </div>
  `;
};

router.post("/inquiry", async (req, res) => {
  const { name, phone, plan, message, email } = req.body as {
    name?: string;
    phone?: string;
    plan?: string;
    message?: string;
    email?: string;
  };

  if (!name || !phone) {
    res.status(400).json({ error: "Name and phone are required." });
    return;
  }

  const customerEmail = typeof email === "string" ? email.trim() : "";
  if (customerEmail && !EMAIL_RE.test(customerEmail)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

  if (!process.env["RESEND_API_KEY"] && !process.env["GMAIL_APP_PASSWORD"]) {
    logger.error("No email provider configured (need RESEND_API_KEY or GMAIL_APP_PASSWORD)");
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  const ownerMailOptions = {
    to: GYM_EMAIL,
    subject: `New Inquiry from ${name}`,
    html: buildOwnerEmailHtml({
      name,
      phone,
      email: customerEmail || undefined,
      plan,
      message,
    }),
  };

  // SPEED FIX: client ko TURANT response bhejo — emails background me jaate hain.
  res.json({ success: true });

  sendEmail(ownerMailOptions)
    .then((via) => {
      logger.info({ name, phone, email: customerEmail || null, plan, via }, "Inquiry email sent");
    })
    .catch((err: unknown) => {
      logger.error({ err }, "Failed to send inquiry email (background)");
    });

  if (!customerEmail) {
    logger.info({ name }, "No customer email provided — auto-reply skipped");
    return;
  }

  const topics = detectTopics(message || "");
  const autoReplyOptions = {
    to: customerEmail,
    subject: `Thanks for your inquiry, ${name.split(/\s+/)[0]}! — Infinity Fitness Gym Kaithal`,
    html: buildAutoReplyHtml(name, topics),
  };

  sendEmail(autoReplyOptions)
    .then((via) => {
      logger.info(
        { to: customerEmail, topics: topics.map((t) => t.title), via },
        "Customer auto-reply email sent",
      );
    })
    .catch((err: unknown) => {
      logger.error({ err }, "Failed to send customer auto-reply");
    });
});

export default router;
