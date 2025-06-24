'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Quote } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { getRandomItems, truncateText } from '@/lib/utils'

// Artist placeholder images from Unsplash
const artistPlaceholderImages = [
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop&crop=center'
]

/**
 * FeaturedArtistCard Component
 * Individual featured artist card with rating and details
 */
function FeaturedArtistCard({ artist, index }) {
  // Use Unsplash image or placeholder
  const imageUrl = artist.profileImage || artistPlaceholderImages[index % artistPlaceholderImages.length]
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 card-hover featured-artist-card">
      <CardContent className="p-6 featured-artist-content">
        <div className="space-y-4 flex flex-col h-full">
          {/* Artist Image with Unsplash */}
          <div className="relative">
            <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
              <img 
                src={imageUrl}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                      <div class="text-6xl font-bold text-primary/30">${artist.name.charAt(0)}</div>
                    </div>
                  `
                }}
              />
            </div>
            <Badge className="absolute top-2 right-2 bg-white text-gray-900 shadow-md">
              ⭐ {artist.rating || 4.5}
            </Badge>
          </div>

          {/* Artist Info - Flexible content */}
          <div className="space-y-3 flex-1">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {artist.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span>{artist.location}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {artist.category.slice(0, 2).map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs capitalize">
                  {cat}
                </Badge>
              ))}
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground line-clamp-3">
              {truncateText(artist.bio, 100)}
            </p>

            {/* Fee Range */}
            <div className="text-sm font-medium text-primary">
              {artist.feeRange}
            </div>
          </div>

          {/* Action Button - Always at bottom */}
          <div className="featured-artist-button">
            <Button asChild className="w-full">
              <Link href={`/artists?highlight=${artist.id}`} className="no-underline">
                <span>View Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * FeaturedArtists Component
 * Displays top-rated artists in a carousel/grid format
 */
export default function FeaturedArtists() {
  const { artists, loading } = useApp()

  // Get featured artists (top-rated, random selection)
  const featuredArtists = artists.length > 0 
    ? getRandomItems(
        artists.filter(artist => (artist.rating || 4.5) >= 4.5), 
        4
      )
    : []

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Featured Artists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet some of our top-rated performers who have delighted audiences 
            across the country with their exceptional talent.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-20 bg-gray-300 rounded"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Featured Artists Grid */}
        {!loading && featuredArtists.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtists.map((artist, index) => (
              <FeaturedArtistCard key={artist.id} artist={artist} index={index} />
            ))}
          </div>
        )}

        {/* No Artists Fallback */}
        {!loading && featuredArtists.length === 0 && (
          <div className="text-center py-12">
            <Quote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Featured Artists Coming Soon
            </h3>
            <p className="text-muted-foreground">
              We're curating amazing artists for you. Check back soon!
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/artists" className="no-underline">
              <span>Explore All Artists</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}