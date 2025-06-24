'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Globe,
  Instagram,
  Youtube,
  Heart,
  Share2
} from 'lucide-react'
import { useBookings } from '@/context/AppContext'
import { truncateText } from '@/lib/utils'
import { UNSPLASH_IMAGES } from '@/lib/constants'

/**
 * ArtistCard Component
 * Displays artist information in card format
 * Supports both grid and list view modes
 */
export default function ArtistCard({ artist, viewMode = 'grid', highlighted = false }) {
  const [isLiked, setIsLiked] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const { addBookingRequest } = useBookings()

  // Handle quote request
  const handleQuoteRequest = () => {
    setShowQuoteModal(true)
  }

  // Handle social media links
  const handleSocialClick = (platform, url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  // Handle share artist
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${artist.name} - Professional ${artist.category.join(', ')}`,
        text: `Check out ${artist.name}, a talented ${artist.category.join(', ')} from ${artist.location}`,
        url: window.location.href + `?artist=${artist.id}`
      })
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href + `?artist=${artist.id}`)
      alert('Artist link copied to clipboard!')
    }
  }

  // Grid view card
  if (viewMode === 'grid') {
    return (
      <Card 
        id={`artist-${artist.id}`}
        className={`group hover:shadow-lg transition-all duration-300 card-hover ${
          highlighted ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
      >
        <CardContent className="p-0">
          {/* Artist Image */}
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center overflow-hidden">
              {artist.profileImage ? (
                <img 
                  src={artist.profileImage} 
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={UNSPLASH_IMAGES.artistPlaceholder}
                  alt="Default artist"
                  className="w-full h-full object-cover opacity-70"
                />
              )}
            </div>
            
            {/* Overlay actions */}
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Rating badge */}
            <Badge className="absolute top-2 left-2 bg-white text-gray-900">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {artist.rating || 4.5}
            </Badge>

            {/* Availability indicator */}
            <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
              artist.availability === 'available' 
                ? 'bg-green-100 text-green-800' 
                : artist.availability === 'busy'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {artist.availability === 'available' ? 'Available' : 
               artist.availability === 'busy' ? 'Busy' : 'Unavailable'}
            </div>
          </div>

          {/* Artist Info */}
          <div className="p-4 space-y-3">
            {/* Name and Location */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {artist.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {artist.location}
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {artist.category.slice(0, 3).map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs capitalize">
                  {cat}
                </Badge>
              ))}
              {artist.category.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{artist.category.length - 3} more
                </Badge>
              )}
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground">
              {truncateText(artist.bio, 100)}
            </p>

            {/* Experience and Bookings */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {artist.experience}+ years
              </div>
              <div>
                {artist.totalBookings || 0} events
              </div>
            </div>

            {/* Fee Range */}
            <div className="text-lg font-semibold text-primary">
              {artist.feeRange}
            </div>

            {/* Social Links */}
            {artist.socialMedia && (
              <div className="flex items-center gap-2">
                {artist.socialMedia.instagram && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleSocialClick('instagram', artist.socialMedia.instagram)}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                )}
                {artist.socialMedia.youtube && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleSocialClick('youtube', artist.socialMedia.youtube)}
                  >
                    <Youtube className="h-4 w-4" />
                  </Button>
                )}
                {artist.socialMedia.website && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleSocialClick('website', artist.socialMedia.website)}
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                className="flex-1"
                onClick={handleQuoteRequest}
                disabled={artist.availability === 'unavailable'}
              >
                Ask for Quote
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // List view card
  return (
    <Card 
      id={`artist-${artist.id}`}
      className={`group hover:shadow-md transition-all duration-300 ${
        highlighted ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Artist Image */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center overflow-hidden">
              {artist.profileImage ? (
                <img 
                  src={artist.profileImage} 
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={UNSPLASH_IMAGES.artistPlaceholder}
                  alt="Default artist"
                  className="w-full h-full object-cover opacity-70"
                />
              )}
            </div>
            <Badge className="absolute -top-1 -right-1 text-xs px-1">
              <Star className="h-2 w-2 fill-yellow-400 text-yellow-400 mr-1" />
              {artist.rating || 4.5}
            </Badge>
          </div>

          {/* Artist Info */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {artist.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {artist.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-primary">
                  {artist.feeRange}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  artist.availability === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {artist.availability}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {artist.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs capitalize">
                  {cat}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {truncateText(artist.bio, 150)}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{artist.experience}+ years experience</span>
                <span>{artist.totalBookings || 0} events completed</span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleQuoteRequest}
                  disabled={artist.availability === 'unavailable'}
                >
                  Ask for Quote
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}