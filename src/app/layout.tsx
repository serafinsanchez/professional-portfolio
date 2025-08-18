import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SkipLink } from '@/components/SkipLink'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
})

const instrumentSerif = Instrument_Serif({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: {
    template: '%s · Serafin Sanchez',
    default: 'Serafin Sanchez',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👋🏽</text></svg>",
  },
  description: 'AI-Native Software Developer building the future with intelligent applications and modern web technologies.',
  keywords: [
    'developer',
    'portfolio',
    'AI developer',
    'AI-native',
    'web development',
    'React',
    'Next.js',
    'TypeScript',
    'full-stack',
    'frontend',
    'backend',
    'artificial intelligence',
  ],
  authors: [{ name: 'Serafin Sanchez' }],
  creator: 'Serafin Sanchez',
  metadataBase: new URL('https://serafin.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Serafin Sanchez',
    title: 'Serafin Sanchez',
    description: 'AI-Native Software Developer building the future with intelligent applications and modern web technologies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Serafin Sanchez - Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@serafinsanchez_',
    creator: '@serafinsanchez_',
    title: 'Serafin Sanchez',
    description: 'AI-Native Software Developer building the future with intelligent applications and modern web technologies.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '6_-YtgA7FTIxEsndh8V_Rk6F0byxVqUrOxjWIv0NqGI',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="71e952aa-208e-4748-a34e-f270836b5ecd"
        />
      </head>
      <body className="font-sans antialiased">
        <SkipLink href="#about">Skip to content</SkipLink>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
