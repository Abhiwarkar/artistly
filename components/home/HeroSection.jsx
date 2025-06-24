'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Star, Users, ArrowRight } from 'lucide-react'

/**
 * Hero Section Component
 * Main banner section with platform introduction and call-to-action buttons
 * Features gradient background and responsive design
 */
export default function HeroSection() {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop&crop=center')"
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Find Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Artists
              </span>
              for Your Events
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Connect with India's most talented singers, dancers, speakers, DJs, bands, and comedians. 
              Professional booking made simple and reliable.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                500+
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Verified Artists
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                1000+
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Events Completed
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                50+
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Cities Covered
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                4.8★
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Average Rating
              </div>
            </div>
          </div>

          {/* Call-to-Action Buttons - Force text visibility */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 h-auto font-semibold shadow-lg border-2 border-transparent hover:border-white transition-all min-w-[200px]"
            >
              <Link 
                href="/artists" 
                className="flex items-center justify-center space-x-3 no-underline text-gray-900"
                style={{ color: '#1f2937', textDecoration: 'none' }}
              >
                <Search className="h-5 w-5 flex-shrink-0" />
                <span className="whitespace-nowrap" style={{ color: '#1f2937', fontWeight: '600' }}>
                  Find Artists Now
                </span>
                <ArrowRight className="h-5 w-5 flex-shrink-0" />
              </Link>
            </Button>
            
            {/* Simple button without Tailwind Button component */}
            <Link 
              href="/onboard"
              className="border-2 border-white bg-transparent text-white font-semibold text-lg px-8 py-4 rounded-lg flex items-center justify-center space-x-3 hover:bg-white hover:text-gray-900 transition-all duration-200 min-w-[200px]"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              <Star size={20} color="white" />
              <span style={{ color: 'white', fontWeight: '600' }}>Join as Artist</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-yellow-400 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Trusted by 500+ Event Planners</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Verified Professional Artists</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - REMOVED */}
      {/* Mouse cursor removed as requested */}
    </section>
  )
}