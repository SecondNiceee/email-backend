import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER || "kolya.titov.05@inbox.ru",
    pass: process.env.MAIL_PASSWORD || "77V49AsPjPgMYw25LrdK",
  },
})

// <CHANGE> Добавлен параметр fromName для кастомного имени отправителя
export async function sendEmail(to: string, subject: string, html: string, fromName?: string) {
  const emailAddress = process.env.MAIL_USER || "kolya.titov.05@inbox.ru"
  
  const mailOptions = {
    // Формат: "Имя Отправителя <email@example.com>"
    from: fromName ? `"${fromName}" <${emailAddress}>` : emailAddress,
    to,
    subject,
    html,
  }

  return await transporter.sendMail(mailOptions)
}