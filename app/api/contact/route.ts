import { type NextRequest, NextResponse } from "next/server"

async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured")
    return false
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error("Turnstile verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, eventDate, message, turnstileToken } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !eventDate || !message || !turnstileToken) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Verify Turnstile token server-side
    const isValid = await verifyTurnstile(turnstileToken)

    if (!isValid) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 })
    }

    // Here you would normally:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    // For now, just log the contact request
    console.log("[v0] Contact form submission:", {
      firstName,
      lastName,
      email,
      phone,
      eventDate,
      message,
      verifiedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Contact form submitted successfully" })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
