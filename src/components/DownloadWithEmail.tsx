'use client'
import { useState, useEffect } from 'react'
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

interface DownloadWithEmailProps {
  downloadUrl: string
  fileName: string
  source: string
  title?: string
  description?: string
  fileSize?: string
}

export default function DownloadWithEmail({
  downloadUrl,
  fileName,
  source,
  title = 'Download',
  description = 'Get notified about updates and new features',
  fileSize,
}: DownloadWithEmailProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ 
    resolver: zodResolver(schema) 
  })

  // Check localStorage on mount
  useEffect(() => {
    const storageKey = `download_${source}`
    const hasDownloaded = localStorage.getItem(storageKey) === 'true'
    if (hasDownloaded) {
      setHasAccess(true)
    }
  }, [source])

  const onSubmit = async (data: FormData) => {
    setStatus('idle')
    setIsLoading(true)
    
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      })
      
      const json = await res.json().catch(() => ({}))
      
      if (res.ok && (json as any)?.ok) {
        setStatus('ok')
        setHasAccess(true)
        localStorage.setItem(`download_${source}`, 'true')
        reset()
      } else {
        setStatus('err')
      }
    } catch (error) {
      setStatus('err')
    } finally {
      setIsLoading(false)
    }
  }

  if (hasAccess) {
    return (
      <Card className="p-6 text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ready to download • {fileSize && `${fileSize} • `}macOS 11.0+
          </p>
        </div>
        <a
          href={downloadUrl}
          download={fileName}
          className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          📥 Download {fileName}
        </a>
        <p className="text-xs text-muted-foreground mt-4">
          Thanks for downloading! Check your email for updates.
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Free Download • {fileSize && `${fileSize} • `}macOS 11.0+
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input 
            placeholder="Your name" 
            {...register('name')} 
            disabled={isLoading}
            className="sm:col-span-1" 
          />
          <Input 
            type="email" 
            placeholder="Your email" 
            {...register('email')} 
            disabled={isLoading}
            className="sm:col-span-1" 
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Get Download Link'}
        </Button>
      </form>
      
      {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
      {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
      {status === 'err' && <p className="mt-2 text-sm text-red-500">Something went wrong. Please try again.</p>}
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Your email helps me know how many people use the app and share updates.
      </p>
    </Card>
  )
}

