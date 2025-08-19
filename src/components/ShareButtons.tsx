'use client'

import { useState } from 'react'
import { Share2, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ShareButtonsProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

export function ShareButtons({ 
  url = '',
  title = '',
  description = '',
  className = ''
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  // Use current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = encodeURIComponent(title)
  const shareDescription = encodeURIComponent(description)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${shareTitle}&summary=${shareDescription}`,
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem 
            onClick={copyToClipboard}
            className="flex items-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4" />
                <span>Copy Link</span>
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <a 
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Twitter className="h-4 w-4" />
              <span>Share on X</span>
            </a>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <a 
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Linkedin className="h-4 w-4" />
              <span>Share on LinkedIn</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
