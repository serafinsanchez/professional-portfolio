'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ImageLightboxProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

export function ImageLightbox({ 
  src, 
  alt, 
  className = '',
  width,
  height,
  priority,
  sizes
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const openLightbox = () => {
    setIsOpen(true)
    setIsZoomed(false)
  }

  const closeLightbox = () => {
    setIsOpen(false)
    setIsZoomed(false)
  }

  return (
    <>
      {/* Thumbnail Image */}
      <div 
        className={`relative cursor-pointer group overflow-hidden rounded-lg ${className}`}
        onClick={openLightbox}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="transition-transform duration-300 group-hover:scale-105 w-full h-auto"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 bg-white/90 rounded-full">
            <ZoomIn className="h-6 w-6 text-gray-900" />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="max-w-7xl w-full max-h-screen h-full p-0 border-none bg-black/95"
          onPointerDownOutside={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white border-none"
              onClick={closeLightbox}
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white border-none"
                onClick={() => setIsZoomed(!isZoomed)}
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? <ZoomOut className="h-6 w-6" /> : <ZoomIn className="h-6 w-6" />}
              </Button>
            </div>

            {/* Main Image */}
            <div 
              className={`relative max-w-full max-h-full transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-grab' : 'scale-100 cursor-default'
              }`}
              style={{
                minWidth: '50%',
                minHeight: '50%'
              }}
            >
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 90vw, 85vw"
                priority
              />
            </div>

            {/* Image Caption */}
            {alt && (
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-white text-sm bg-black/50 px-4 py-2 rounded-lg max-w-2xl mx-auto text-center">
                  {alt}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
