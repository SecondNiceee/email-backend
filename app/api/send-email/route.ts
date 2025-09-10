import { sendEmail } from "../../../lib/email";
import { type NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
  try {
    const { message, to, subject = "Новое сообщение с сайта" } = await request.json()

    if (!message || !to) {
      return NextResponse.json({ error: "Message and recipient email are required" }, { status: 400 })
    }

    await sendEmail(to, subject, message)

    console.log("Email sent successfully to:", to)

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
