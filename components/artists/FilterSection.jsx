'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useApp } from '@/context/AppContext'
import { ARTIST_CATEGORIES, FEE_RANGES, LOCATIONS, AVAILABILITY_STATUS, RATING_OPTIONS } from '@/lib/constants'
import { X, Filter, Star } from 'lucide-react'

/**
 * FilterSection Component
 * Provides comprehensive filtering options for artists
 * Includes category, location, fee range, availability, and rating filters
 */
export default function FilterSection({ filters, onFiltersChange }) {
  const { categories, locations } = useApp()

  // Use constants as fallback if data not loaded
  const displayCategories = categories.length > 0 ? categories : ARTIST_CATEGORIES
  const displayLocations = locations.length > 0 ? locations : LOCATIONS

  // Handle category filter change
  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...filters.category, categoryId]
      : filters.category.filter(id => id !== categoryId)
    
    onFiltersChange({
      ...filters,
      category: newCategories
    })
  }

  // Handle location filter change
  const handleLocationChange = (locationName, checked) => {
    const newLocations = checked
      ? [...filters.location, locationName]
      : filters.location.filter(name => name !== locationName)
    
    onFiltersChange({
      ...filters,
      location: newLocations
    })
  }

  // Handle fee range filter change
  const handleFeeRangeChange = (feeRange, checked) => {
    const newFeeRanges = checked
      ? [...filters.feeRange, feeRange]
      : filters.feeRange.filter(range => range !== feeRange)
    
    onFiltersChange({
      ...filters,
      feeRange: newFeeRanges
    })
  }

  // Handle availability change
  const handleAvailabilityChange = (availability) => {
    onFiltersChange({
      ...filters,
      availability
    })
  }

  // Handle rating change
  const handleRatingChange = (rating) => {
    onFiltersChange({
      ...filters,
      rating: parseFloat(rating) || 0
    })
  }

  // Clear specific filter type
  const clearFilter = (filterType) => {
    onFiltersChange({
      ...filters,
      [filterType]: filterType === 'availability' ? 'all' : 
                   filterType === 'rating' ? 0 : []
    })
  }

  // Count active filters
  const activeFiltersCount = 
    filters.category.length + 
    filters.location.length + 
    filters.feeRange.length + 
    (filters.availability !== 'all' ? 1 : 0) + 
    (filters.rating > 0 ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onFiltersChange({
                  category: [],
                  location: [],
                  feeRange: [],
                  availability: 'all',
                  rating: 0
                })}
              >
                Clear All
              </Button>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Category</CardTitle>
            {filters.category.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => clearFilter('category')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {displayCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.category.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
              />
              <Label 
                htmlFor={`category-${category.id}`}
                className="flex-1 cursor-pointer text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize">{category.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {category.totalArtists || 0}
                  </span>
                </div>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Location</CardTitle>
            {filters.location.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => clearFilter('location')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {displayLocations.slice(0, 8).map((location) => (
            <div key={location.id} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location.id}`}
                checked={filters.location.includes(location.displayName)}
                onCheckedChange={(checked) => handleLocationChange(location.displayName, checked)}
              />
              <Label 
                htmlFor={`location-${location.id}`}
                className="flex-1 cursor-pointer text-sm"
              >
                {location.displayName}
              </Label>
            </div>
          ))}
          {displayLocations.length > 8 && (
            <Button variant="ghost" size="sm" className="w-full text-xs">
              Show More Locations
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Fee Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Fee Range</CardTitle>
            {filters.feeRange.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => clearFilter('feeRange')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {FEE_RANGES.map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <Checkbox
                id={`fee-${range.value}`}
                checked={filters.feeRange.includes(range.label)}
                onCheckedChange={(checked) => handleFeeRangeChange(range.label, checked)}
              />
              <Label 
                htmlFor={`fee-${range.value}`}
                className="flex-1 cursor-pointer text-sm"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.availability} onValueChange={handleAvailabilityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Minimum Rating</CardTitle>
            {filters.rating > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => clearFilter('rating')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Select 
            value={filters.rating.toString()} 
            onValueChange={handleRatingChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select minimum rating" />
            </SelectTrigger>
            <SelectContent>
              {RATING_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  <div className="flex items-center gap-1">
                    {option.value > 0 && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Applied Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Applied Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filters.category.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0"
                    onClick={() => handleCategoryChange(category, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {filters.location.map((location) => (
                <Badge key={location} variant="secondary" className="text-xs">
                  {location.split(',')[0]}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0"
                    onClick={() => handleLocationChange(location, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {filters.feeRange.map((range) => (
                <Badge key={range} variant="secondary" className="text-xs">
                  {range}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0"
                    onClick={() => handleFeeRangeChange(range, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {filters.availability !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  {filters.availability}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0"
                    onClick={() => handleAvailabilityChange('all')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {filters.rating}+ Stars
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0"
                    onClick={() => handleRatingChange('0')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}