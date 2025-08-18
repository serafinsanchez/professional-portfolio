export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { href: 'https://github.com/', label: 'GitHub' },
    { href: 'https://linkedin.com/in/', label: 'LinkedIn' },
    { href: 'https://twitter.com/', label: 'Twitter' },
    { href: 'mailto:contact@example.com', label: 'Email' },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            © {currentYear} Portfolio. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                aria-label={`Visit my ${link.label} profile (opens in new tab)`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
