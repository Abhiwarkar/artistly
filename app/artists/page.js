'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Star, 
  MapPin, 
  Calendar, 
  Globe,
  Instagram,
  Youtube,
  Heart,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react'

// Import JSON data directly
import artistsData from '@/data/artists.json'

export default function ArtistsPage() {
  const [artists, setArtists] = useState([])
  const [filteredArtists, setFilteredArtists] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])

  // Load artists data on mount
  useEffect(() => {
    console.log('Loading artists:', artistsData.length)
    setArtists(artistsData)
    setFilteredArtists(artistsData)
  }, [])

  // Filter artists based on search and filters
  useEffect(() => {
    let filtered = artists

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(artist =>
        artist.category.some(cat => selectedCategories.includes(cat))
      )
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(artist =>
        selectedLocations.some(loc => artist.location.includes(loc))
      )
    }

    setFilteredArtists(filtered)
  }, [artists, searchTerm, selectedCategories, selectedLocations])

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Handle location filter
  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedLocations([])
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Artists</h1>
              <p className="text-gray-600 mt-1">Discover talented performers for your events</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          
          {/* Compact Filters Sidebar */}
          <div className="w-60 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                  Clear
                </Button>
              </div>
              
              {/* Categories */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Category</h4>
                  <div className="space-y-1.5">
                    {['Singers', 'Dancers', 'Speakers', 'DJs', 'Bands', 'Comedians'].map((category) => {
                      const count = artists.filter(a => a.category.includes(category)).length
                      return (
                        <label key={category} className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700 flex-1">{category}</span>
                          <span className="text-xs text-gray-500">{count}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Location */}
                <div className="border-t pt-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Location</h4>
                  <div className="space-y-1.5">
                    {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'].map((location) => (
                      <label key={location} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(location)}
                          onChange={() => handleLocationChange(location)}
                          className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Artists Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-medium">{filteredArtists.length}</span> of <span className="font-medium">{artists.length}</span> artists
              </p>
            </div>

            {/* Artists Grid - 3 Cards Per Row */}
            <div className={`grid gap-5 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} viewMode={viewMode} />
              ))}
            </div>

            {/* No Results */}
            {filteredArtists.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Artists Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Artist Card Component
function ArtistCard({ artist, viewMode }) {
  const [isLiked, setIsLiked] = useState(false)

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <img
              src={artist.profileImage}
              alt={artist.name}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base truncate">{artist.name}</h3>
                  <p className="text-gray-600 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{artist.location}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-full text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {artist.rating}
                  </div>
                  <Badge variant={artist.available ? 'default' : 'secondary'} className="text-xs">
                    {artist.available ? 'Available' : 'Busy'}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {artist.category[0]}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">{artist.bio}</p>
              
              <div className="flex items-center justify-between mt-3">
                <p className="font-semibold text-sm">{artist.feeRange}</p>
                <Button size="sm" className="text-xs px-3 py-1">Ask for Quote</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={artist.profileImage}
            alt={artist.name}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={artist.available ? 'default' : 'secondary'} className="text-xs">
              {artist.available ? 'Available' : 'Busy'}
            </Badge>
          </div>
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1 bg-black/70 text-white px-1.5 py-0.5 rounded-full text-xs">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {artist.rating}
            </div>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-gray-900 text-base truncate">{artist.name}</h3>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{artist.location}</span>
            </p>
          </div>

          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {artist.category[0]}
            </Badge>
          </div>

          <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{artist.bio}</p>

          <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {artist.experience}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {artist.eventsCompleted} events
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-gray-900 text-sm">{artist.feeRange}</p>
            <div className="flex items-center gap-1">
              {artist.socialMedia?.instagram && (
                <Button variant="ghost" size="sm" className="p-1.5">
                  <Instagram className="w-3.5 h-3.5" />
                </Button>
              )}
              {artist.socialMedia?.youtube && (
                <Button variant="ghost" size="sm" className="p-1.5">
                  <Youtube className="w-3.5 h-3.5" />
                </Button>
              )}
              {artist.socialMedia?.website && (
                <Button variant="ghost" size="sm" className="p-1.5">
                  <Globe className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>

          <Button className="w-full text-sm py-2">Ask for Quote</Button>
        </div>
      </CardContent>
    </Card>
  )
}