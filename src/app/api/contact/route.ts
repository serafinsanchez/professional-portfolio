import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Invalid form data: ' + result.error.issues[0]?.message 
        },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    // Check required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable')
      return NextResponse.json(
        { ok: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!process.env.CONTACT_TO) {
      console.error('Missing CONTACT_TO environment variable')
      return NextResponse.json(
        { ok: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Log the email attempt
    console.log(`Attempting to send email from ${name} (${email})`)
    console.log(`From: Portfolio <serafin@serafin.ai>`)
    console.log(`To: ${process.env.CONTACT_TO}`)
    console.log(`Subject: New portfolio message from ${name}`)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <serafin@serafin.ai>',
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `
New message from your portfolio:

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio contact form.
      `.trim(),
    })

    if (error) {
      console.error('Resend API error:', JSON.stringify(error, null, 2))
      console.error('Error type:', typeof error)
      console.error('Error message:', error.message || 'No error message')
      return NextResponse.json(
        { ok: false, error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    console.log('✅ Email sent successfully!')
    console.log('Email ID:', data?.id)
    console.log('Email data:', JSON.stringify(data, null, 2))
    return NextResponse.json({ ok: true, emailId: data?.id })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { ok: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}
