'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Search, 
  UserPlus, 
  BarChart3,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

// Navigation items configuration
const navigationItems = [
  { 
    name: 'Home', 
    href: '/', 
    icon: Home,
    description: 'Platform overview'
  },
  { 
    name: 'Find Artists', 
    href: '/artists', 
    icon: Search,
    description: 'Browse talented performers'
  },
  { 
    name: 'Join as Artist', 
    href: '/onboard', 
    icon: UserPlus,
    description: 'Create your artist profile'
  },
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: BarChart3,
    description: 'Manage platform'
  }
]

/**
 * Navigation Component
 * Reusable navigation component that can be used in different layouts
 * Supports both horizontal and vertical orientations
 */
export default function Navigation({ 
  orientation = 'horizontal', 
  showIcons = true, 
  showDescriptions = false,
  className = "" 
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={cn(
        "hidden md:flex",
        orientation === 'vertical' ? 'flex-col space-y-2' : 'items-center space-x-6',
        className
      )}>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                orientation === 'vertical' ? 'w-full justify-start' : '',
                isActive 
                  ? "text-primary bg-accent" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent"
              )}
            >
              {showIcons && <Icon className="h-4 w-4" />}
              <span>{item.name}</span>
              {isActive && orientation === 'horizontal' && (
                <Badge variant="secondary" className="ml-1">Active</Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Navigation Toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-3">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                      isActive 
                        ? "text-primary bg-accent border-l-4 border-primary" 
                        : "text-muted-foreground hover:text-primary hover:bg-accent"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {showDescriptions && (
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}