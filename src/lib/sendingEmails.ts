import EventEmitter from "node:events";
import nodemailer from "nodemailer";
import { sendEmailEvent } from "../constants.js";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

const transporter =
  GMAIL_USER && GMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      })
    : null;

export const sendEmail = async ({
  subject,
  text,
  html,
  to,
}: {
  subject: string;
  text?: string;
  html: string;
  to: string;
}) => {
  if (!transporter) {
    console.warn("missing GMAIL_USER/GMAIL_PASS");
    return;
  }
if (!to || typeof to !== "string" || !to.trim()) {
    console.warn("missing recipient `to`", { to });
    return;
  }

  await transporter
    .sendMail({
      from: `"ScreenRecApp" <${GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    })
    .catch((err) => console.log("sendMail error:", err));
};

export const emailEmitter = new EventEmitter();
emailEmitter.on(sendEmailEvent, (payload) => {
  sendEmail(payload).catch((err) => console.log("sendEmail listener error:", err));
});
