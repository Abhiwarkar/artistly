import HeroSection from '@/components/home/HeroSection'
import CategoryCard from '@/components/home/CategoryCard'
import FeaturedArtists from '@/components/home/FeaturedArtists'
import CTASection from '@/components/home/CTASection'

export const metadata = {
  title: 'Artistly.com - Premier Artist Booking Platform | Find Perfect Performers',
  description: 'Discover and book talented singers, dancers, speakers, DJs, bands, and comedians for your events. Trusted by event planners across India.',
  keywords: 'artist booking, event performers, singers, dancers, speakers, DJs, bands, comedians, entertainment booking India',
  openGraph: {
    title: 'Artistly.com - Premier Artist Booking Platform',
    description: 'Discover and book talented performers for your events',
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop&crop=center'],
  }
}

/**
 * Homepage Component
 * Main landing page showcasing platform features and artist categories
 * Fixed to prevent double rendering and ensure single homepage display
 */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Main banner with platform introduction */}
      <HeroSection />
      
      {/* Category Section - Artist category cards */}
      <CategoryCard />
      
      {/* Featured Artists - Showcase top performers */}
      <FeaturedArtists />
      
      {/* Call to Action - Encourage user engagement */}
      <CTASection />
    </main>
  )
}