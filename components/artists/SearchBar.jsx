'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { debounce } from '@/lib/utils'

/**
 * SearchBar Component
 * Provides search functionality with debounced input
 * Includes clear button and search suggestions
 */
export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search artists...",
  showSuggestions = false 
}) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestionsList, setShowSuggestionsList] = useState(false)

  // Debounced search to avoid excessive API calls
  const debouncedSearch = debounce((term) => {
    onSearchChange(term)
  }, 300)

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    debouncedSearch(value)

    // Show/hide suggestions
    if (showSuggestions && value.trim().length > 2) {
      // Generate mock suggestions based on input
      const mockSuggestions = generateSuggestions(value)
      setSuggestions(mockSuggestions)
      setShowSuggestionsList(true)
    } else {
      setShowSuggestionsList(false)
    }
  }

  // Clear search
  const clearSearch = () => {
    setLocalSearchTerm('')
    onSearchChange('')
    setShowSuggestionsList(false)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setLocalSearchTerm(suggestion)
    onSearchChange(suggestion)
    setShowSuggestionsList(false)
  }

  // Generate mock suggestions (in real app, this would come from API)
  const generateSuggestions = (term) => {
    const categories = ['singers', 'dancers', 'speakers', 'djs', 'bands', 'comedians']
    const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune']
    const artistTypes = ['Bollywood singer', 'Classical dancer', 'Motivational speaker', 'Wedding DJ']
    
    const allSuggestions = [...categories, ...locations, ...artistTypes]
    
    return allSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, 5)
  }

  // Sync with parent component
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '')
  }, [searchTerm])

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={localSearchTerm}
          onChange={handleInputChange}
          className="pl-10 pr-10 h-12 text-base"
          onFocus={() => {
            if (showSuggestions && localSearchTerm.trim().length > 2) {
              setShowSuggestionsList(true)
            }
          }}
          onBlur={() => {
            // Delay hiding suggestions to allow click events
            setTimeout(() => setShowSuggestionsList(false), 150)
          }}
        />
        
        {/* Clear Button */}
        {localSearchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && showSuggestionsList && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-3 w-3 text-muted-foreground" />
                  <span className="capitalize">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Tips */}
      {localSearchTerm.length === 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          <span>💡 Try searching for: </span>
          <button 
            onClick={() => handleSuggestionClick('bollywood singer')}
            className="text-primary hover:underline mx-1"
          >
            "bollywood singer"
          </button>
          <button 
            onClick={() => handleSuggestionClick('mumbai')}
            className="text-primary hover:underline mx-1"
          >
            "mumbai"
          </button>
          <button 
            onClick={() => handleSuggestionClick('wedding dj')}
            className="text-primary hover:underline mx-1"
          >
            "wedding dj"
          </button>
        </div>
      )}
    </div>
  )
}