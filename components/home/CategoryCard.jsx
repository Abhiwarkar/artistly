'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  Users, 
  MessageSquare, 
  Music, 
  Music4, 
  Smile,
  ArrowRight 
} from 'lucide-react'
import { useApp } from '@/context/AppContext'

// Icon mapping for categories
const iconMap = {
  Mic,
  Users,
  MessageSquare,
  Music,
  Music4,
  Smile
}

/**
 * CategoryCardItem Component
 * Individual category card with icon, description, and artist count
 */
function CategoryCardItem({ category, artistCount }) {
  const Icon = iconMap[category.icon] || Music
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 card-hover border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-8 w-8" />
          </div>
          
          {/* Category Name */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {category.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {category.description}
          </p>
          
          {/* Artist Count Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-xs">
              {artistCount} Artists Available
            </Badge>
          </div>
          
          {/* View Artists Button - Fixed text visibility */}
          <Button 
            asChild 
            variant="outline" 
            className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
          >
            <Link href={`/artists?category=${category.id}`} className="flex items-center justify-center space-x-2 no-underline">
              <span className="font-medium">Explore {category.name}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * CategoryCard Component (Main)
 * Displays all artist categories in a responsive grid
 * Shows artist count for each category
 */
export default function CategoryCard() {
  const { categories, artists, loading } = useApp()

  // Calculate artist count per category
  const getCategoryArtistCount = (categoryId) => {
    if (!artists || artists.length === 0) return 0
    return artists.filter(artist => 
      artist.category && artist.category.includes(categoryId)
    ).length
  }

  // Default categories if data not loaded
  const defaultCategories = [
    {
      id: 'singers',
      name: 'Singers',
      description: 'Professional vocalists for all genres and events',
      icon: 'Mic',
      totalArtists: 125
    },
    {
      id: 'dancers',
      name: 'Dancers',
      description: 'Choreographers and performers for various dance styles',
      icon: 'Users',
      totalArtists: 89
    },
    {
      id: 'speakers',
      name: 'Speakers',
      description: 'Motivational speakers and keynote presenters',
      icon: 'MessageSquare',
      totalArtists: 67
    },
    {
      id: 'djs',
      name: 'DJs',
      description: 'Music DJs and audio professionals',
      icon: 'Music',
      totalArtists: 78
    },
    {
      id: 'bands',
      name: 'Bands',
      description: 'Musical bands and groups for live performances',
      icon: 'Music4',
      totalArtists: 45
    },
    {
      id: 'comedians',
      name: 'Comedians',
      description: 'Stand-up comedians and entertainment performers',
      icon: 'Smile',
      totalArtists: 32
    }
  ]

  const displayCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Discover Talented Artists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our diverse categories of verified professional artists 
            ready to make your events unforgettable.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded mx-auto w-24"></div>
                    <div className="h-4 bg-gray-300 rounded mx-auto w-32"></div>
                    <div className="h-4 bg-gray-300 rounded mx-auto w-20"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Category Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayCategories.map((category) => (
              <CategoryCardItem 
                key={category.id}
                category={category}
                artistCount={getCategoryArtistCount(category.id) || category.totalArtists || 0}
              />
            ))}
          </div>
        )}

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="px-8">
            <Link href="/artists" className="flex items-center space-x-2 no-underline">
              <span>View All Artists</span>
              <ArrowRight className="h-5 w-5 flex-shrink-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}