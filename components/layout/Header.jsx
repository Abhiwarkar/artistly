'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 

  Search, 
  UserPlus, 
  BarChart3, 
  Menu, 
  X,
  Music,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Navigation items configuration
const navigationItems = [

  { name: 'Find Artists', href: '/artists', icon: Search },
  { name: 'Join as Artist', href: '/onboard', icon: UserPlus },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 }
]

/**
 * Header Component
 * Responsive navigation header with mobile menu
 * Includes logo, navigation links, and mobile hamburger menu
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand with Gap */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Music className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Artistly.com
              </span>
              
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-blue-600 hover:bg-blue-50",
                    isActive 
                      ? "text-blue-600 bg-blue-50 font-semibold" 
                      : "text-gray-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA Buttons - Always Visible Text */}
          <div className="hidden md:flex items-center space-x-3">
            <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium">
              <Link href="/artists" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Find Artists</span>
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium">
              <Link href="/onboard" className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Join Now</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 text-base font-medium transition-colors rounded-md",
                      isActive 
                        ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600 font-semibold" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {/* Mobile Action Buttons - Always Visible Text */}
              <div className="px-4 pt-4 space-y-3 border-t">
                <Button asChild variant="outline" className="w-full border-blue-600 text-blue-600 font-medium">
                  <Link href="/artists" className="flex items-center justify-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span>Find Artists</span>
                  </Link>
                </Button>
                <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium">
                  <Link href="/onboard" className="flex items-center justify-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Join Now</span>
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}