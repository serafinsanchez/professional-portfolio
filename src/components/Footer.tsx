import { Github, Linkedin } from 'lucide-react'

// Custom X (formerly Twitter) icon component
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="inline-block"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export function Footer() {
  const socialLinks = [
    { 
      href: 'https://github.com/serafinsanchez', 
      label: 'GitHub',
      icon: Github
    },
    { 
      href: 'https://x.com/serafinsanchez_', 
      label: 'X (Twitter)',
      icon: XIcon
    },
    { 
      href: 'https://www.linkedin.com/in/serafin-sanchez/', 
      label: 'LinkedIn',
      icon: Linkedin
    },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center">
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  aria-label={`Visit my ${link.label} profile (opens in new tab)`}
                >
                  <IconComponent size={20} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
