import Link from 'next/link'
import { Music, Mail, Phone, MapPin, Instagram, Youtube, Globe } from 'lucide-react'

/**
 * Footer Component
 * Provides site-wide footer with links, contact info, and branding
 * Responsive design with proper SEO structure
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Music className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Artistly.com</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              India's premier artist booking platform connecting event planners with talented performers across the country.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Website"
              >
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/artists" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Find Artists
              </Link>
              <Link 
                href="/onboard" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Join as Artist
              </Link>
              <Link 
                href="/dashboard" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/artists?category=singers" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Singers
              </Link>
              <Link 
                href="/artists?category=dancers" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dancers
              </Link>
              <Link 
                href="/artists?category=speakers" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Speakers
              </Link>
              <Link 
                href="/artists?category=djs" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                DJs
              </Link>
              <Link 
                href="/artists?category=bands" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Bands
              </Link>
              <Link 
                href="/artists?category=comedians" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Comedians
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@artistly.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Artistly.com. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}