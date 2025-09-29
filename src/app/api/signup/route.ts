export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { init } from '@instantdb/admin'

const db = init({
  appId: process.env.INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
})

const SignupSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  source: z.string().max(50).optional(),
})

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = SignupSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }

  const { name, email, source } = parsed.data

  try {
    const id = crypto.randomUUID()
    await db.transact(
      db.tx.signups[id].update({ 
        name, 
        email, 
        source: source || 'newsletter',
        createdAt: Date.now() 
      })
    )
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    if (err?.code === 'constraint_violation' || /unique/i.test(String(err?.message))) {
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}


