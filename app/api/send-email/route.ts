import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { status: 200, headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  try {
    // <CHANGE> Добавлен параметр fromName
    const { message, to, subject = "Новое сообщение с сайта", fromName } = await request.json()

    if (!message || !to) {
      return NextResponse.json(
        { error: "Message and recipient email are required" },
        { status: 400, headers: corsHeaders }
      )
    }

    // <CHANGE> Передаём fromName в sendEmail
    await sendEmail(to, subject, message, fromName)

    console.log("Email sent successfully to:", to)

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: corsHeaders }
    )
  }
}