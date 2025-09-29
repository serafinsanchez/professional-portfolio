'use client'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email'),
})

type FormData = z.infer<typeof schema>

export default function EmailSignupForm() {
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('idle')
    const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const json = await res.json().catch(() => ({}))
    if (res.ok && (json as any)?.ok) { setStatus('ok'); reset() } else { setStatus('err') }
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
        <p className="text-sm text-muted-foreground">Get notified about new projects and blog posts</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-3">
        <Input placeholder="Your name" {...register('name')} className="sm:col-span-1" />
        <Input type="email" placeholder="Your email" {...register('email')} className="sm:col-span-1" />
        <Button type="submit" className="sm:col-span-1">Sign up</Button>
      </form>
      {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
      {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
      {status === 'ok' && <p className="mt-2 text-sm text-green-600">Thanks! You’re on the list.</p>}
      {status === 'err' && <p className="mt-2 text-sm text-red-500">Something went wrong. Please try again.</p>}
    </Card>
  )
}


