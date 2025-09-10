import nodemailer from "nodemailer"

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER || "kolya.titov.05@inbox.ru",
    pass: process.env.MAIL_PASSWORD || "77V49AsPjPgMYw25LrdK",
  },
})

export async function sendEmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: process.env.MAIL_USER || "kolya.titov.05@inbox.ru",
    to,
    subject,
    html,
  }

  return await transporter.sendMail(mailOptions)
}
