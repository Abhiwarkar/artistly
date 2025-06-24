'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ChevronDown, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * MultiSelectDropdown Component
 * Allows selection of multiple options with search functionality
 * Supports maximum selection limits and custom styling
 */
export default function MultiSelectDropdown({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options...",
  maxSelections = null,
  searchable = true,
  disabled = false,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle option selection
  const handleOptionSelect = (optionValue) => {
    const isSelected = value.includes(optionValue)
    let newValue

    if (isSelected) {
      // Remove from selection
      newValue = value.filter(v => v !== optionValue)
    } else {
      // Add to selection (check max limit)
      if (maxSelections && value.length >= maxSelections) {
        return // Don't add if at max limit
      }
      newValue = [...value, optionValue]
    }

    onChange(newValue)
  }

  // Remove selected option
  const removeOption = (optionValue) => {
    const newValue = value.filter(v => v !== optionValue)
    onChange(newValue)
  }

  // Clear all selections
  const clearAll = () => {
    onChange([])
  }

  // Get display label for selected option
  const getOptionLabel = (optionValue) => {
    const option = options.find(opt => opt.value === optionValue)
    return option ? option.label : optionValue
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full justify-between text-left font-normal min-h-[2.5rem] h-auto",
          !value.length && "text-muted-foreground"
        )}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {value.length === 0 ? (
            <span>{placeholder}</span>
          ) : (
            <>
              {value.slice(0, 2).map((optionValue) => (
                <Badge
                  key={optionValue}
                  variant="secondary"
                  className="text-xs"
                >
                  {getOptionLabel(optionValue)}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 hover:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeOption(optionValue)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {value.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{value.length - 2} more
                </Badge>
              )}
            </>
          )}
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "transform rotate-180"
        )} />
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          {/* Search Input */}
          {searchable && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                />
              </div>
            </div>
          )}

          {/* Header with selection count and clear button */}
          {value.length > 0 && (
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {value.length} selected
                {maxSelections && ` (max ${maxSelections})`}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {searchTerm ? 'No options found' : 'No options available'}
              </div>
            ) : (
              <div className="p-1">
                {filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value)
                  const isDisabled = !isSelected && maxSelections && value.length >= maxSelections

                  return (
                    <div
                      key={option.value}
                      className={cn(
                        "flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors",
                        isDisabled 
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                      onClick={() => !isDisabled && handleOptionSelect(option.value)}
                    >
                      <Checkbox
                        id={`option-${option.value}`}
                        checked={isSelected}
                        disabled={isDisabled}
                        onChange={() => !isDisabled && handleOptionSelect(option.value)}
                      />
                      <Label
                        htmlFor={`option-${option.value}`}
                        className={cn(
                          "flex-1 cursor-pointer text-sm",
                          isDisabled && "cursor-not-allowed"
                        )}
                      >
                        {option.label}
                        {option.description && (
                          <span className="block text-xs text-gray-500 dark:text-gray-400">
                            {option.description}
                          </span>
                        )}
                      </Label>
                      {isSelected && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeOption(option.value)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer with max selections warning */}
          {maxSelections && value.length >= maxSelections && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-yellow-50 dark:bg-yellow-900/20">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                Maximum {maxSelections} selections allowed
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}