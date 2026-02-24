import nodemailer from "nodemailer"

if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD) {
  throw new Error("MAIL_USER and MAIL_PASSWORD environment variables are required")
}

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
})

// <CHANGE> Добавлен параметр fromName для кастомного имени отправителя
export async function sendEmail(to: string, subject: string, html: string, fromName?: string) {
  const emailAddress = process.env.MAIL_USER
  
  const mailOptions = {
    // Формат: "Имя Отправителя <email@example.com>"
    from: fromName ? `"${fromName}" <${emailAddress}>` : emailAddress,
    to,
    subject,
    html,
  }

  return await transporter.sendMail(mailOptions)
}
