import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class management
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a unique ID for new records
 * Simple UUID v4 implementation for client-side use
 */
export function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Format currency amount for display
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: INR)
 */
export function formatCurrency(amount, currency = 'INR') {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return formatter.format(amount)
}

/**
 * Parse fee range string to get min and max values
 * @param {string} feeRange - Fee range string like "₹10,000 - ₹25,000"
 */
export function parseFeeRange(feeRange) {
  const matches = feeRange.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/)
  if (matches) {
    const min = parseInt(matches[1].replace(/,/g, ''))
    const max = parseInt(matches[2].replace(/,/g, ''))
    return { min, max }
  }
  return { min: 0, max: 0 }
}

/**
 * Filter artists based on current filter criteria
 * @param {Array} artists - Array of all artists
 * @param {Object} filters - Current filter settings
 */
export function filterArtists(artists, filters) {
  return artists.filter(artist => {
    // Filter by category
    if (filters.category && filters.category.length > 0) {
      const hasMatchingCategory = artist.category.some(cat => 
        filters.category.includes(cat)
      )
      if (!hasMatchingCategory) return false
    }

    // Filter by location
    if (filters.location && filters.location.length > 0) {
      if (!filters.location.includes(artist.location)) return false
    }

    // Filter by fee range
    if (filters.feeRange && filters.feeRange.length > 0) {
      const { min, max } = parseFeeRange(artist.feeRange)
      const matchesFeeRange = filters.feeRange.some(range => {
        const { min: filterMin, max: filterMax } = parseFeeRange(range)
        return (min >= filterMin && max <= filterMax) || 
               (min <= filterMax && max >= filterMin)
      })
      if (!matchesFeeRange) return false
    }

    // Filter by availability
    if (filters.availability && filters.availability !== 'all') {
      if (artist.availability !== filters.availability) return false
    }

    // Filter by rating
    if (filters.rating && filters.rating > 0) {
      if (!artist.rating || artist.rating < filters.rating) return false
    }

    return true
  })
}

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Format date for display
 * @param {string|Date} date - Date string or Date object
 * @param {string} format - Format type ('short', 'medium', 'long')
 */
export function formatDate(date, format = 'medium') {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const options = {
    short: { day: 'numeric', month: 'short', year: 'numeric' },
    medium: { day: 'numeric', month: 'long', year: 'numeric' },
    long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  }[format]

  return new Intl.DateTimeFormat('en-IN', options).format(dateObj)
}

/**
 * Validate email format
 * @param {string} email - Email string to validate
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[+]?[91]?[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/[\s-]/g, ''))
}

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 */
export function capitalizeWords(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 */
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generate slug from string
 *      @param {string} str - String to convert to slug
 */
export function generateSlug(str) {
  return str
    .toLowerCase()
      .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calculate average rating from reviews
 * @param {Array} ratings - Array of rating numbers
 */
export function calculateAverageRating(ratings) {
  if (ratings.length === 0) return 0
  const sum = ratings.reduce((acc, rating) => acc + rating, 0)
  return Math.round((sum / ratings.length) * 10) / 10
}

/**
 * Get random items from array
 * @param {Array} array - Source array
 * @param {number} count - Number of items to get
 */
export function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}