'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { generateId, filterArtists } from '@/lib/utils'
import { DEFAULT_VALUES } from '@/lib/constants'

// Create Context
const AppContext = createContext()

// Action types for reducer
const ACTION_TYPES = {
  SET_ARTISTS: 'SET_ARTISTS',
  SET_FILTERED_ARTISTS: 'SET_FILTERED_ARTISTS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_LOCATIONS: 'SET_LOCATIONS',
  SET_BOOKING_REQUESTS: 'SET_BOOKING_REQUESTS',
  SET_FILTERS: 'SET_FILTERS',
  ADD_ARTIST: 'ADD_ARTIST',
  UPDATE_ARTIST: 'UPDATE_ARTIST',
  ADD_BOOKING_REQUEST: 'ADD_BOOKING_REQUEST',
  UPDATE_BOOKING_REQUEST: 'UPDATE_BOOKING_REQUEST',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
}

// Initial state
const initialState = {
  artists: [],
  filteredArtists: [],
  categories: [],
  locations: [],
  bookingRequests: [],
  filters: DEFAULT_VALUES.filters,
  loading: false,
  error: null
}

/**
 * App Reducer for state management
 * Handles all state updates through actions
 */
function appReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        filteredArtists: filterArtists(action.payload, state.filters)
      }

    case ACTION_TYPES.SET_FILTERED_ARTISTS:
      return {
        ...state,
        filteredArtists: action.payload
      }

    case ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }

    case ACTION_TYPES.SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      }

    case ACTION_TYPES.SET_BOOKING_REQUESTS:
      return {
        ...state,
        bookingRequests: action.payload
      }

    case ACTION_TYPES.SET_FILTERS:
      const newFilteredArtists = filterArtists(state.artists, action.payload)
      return {
        ...state,
        filters: action.payload,
        filteredArtists: newFilteredArtists
      }

    case ACTION_TYPES.ADD_ARTIST:
      const newArtist = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      const updatedArtists = [...state.artists, newArtist]
      return {
        ...state,
        artists: updatedArtists,
        filteredArtists: filterArtists(updatedArtists, state.filters)
      }

    case ACTION_TYPES.UPDATE_ARTIST:
      const updatedArtistsList = state.artists.map(artist =>
        artist.id === action.payload.id
          ? { ...artist, ...action.payload.updates, updatedAt: new Date().toISOString() }
          : artist
      )
      return {
        ...state,
        artists: updatedArtistsList,
        filteredArtists: filterArtists(updatedArtistsList, state.filters)
      }

    case ACTION_TYPES.ADD_BOOKING_REQUEST:
      const newBookingRequest = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      }
      return {
        ...state,
        bookingRequests: [...state.bookingRequests, newBookingRequest]
      }

    case ACTION_TYPES.UPDATE_BOOKING_REQUEST:
      const updatedRequests = state.bookingRequests.map(request =>
        request.id === action.payload.id
          ? { ...request, ...action.payload.updates }
          : request
      )
      return {
        ...state,
        bookingRequests: updatedRequests
      }

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

/**
 * AppProvider Component
 * Provides global state and actions to all child components
 */
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load initial data on mount
  useEffect(() => {
    // Only load data on client side
    if (typeof window !== 'undefined') {
      loadInitialData()
    }
  }, [])

  /**
   * Load initial data from JSON files
   * Simulates API calls for demonstration
   */
  const loadInitialData = async () => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true })

      // Load mock data (normally would be API calls)
      const artistsData = await import('@/data/artists.json')
      const categoriesData = await import('@/data/categories.json')
      const locationsData = await import('@/data/locations.json')

      dispatch({ type: ACTION_TYPES.SET_ARTISTS, payload: artistsData.default || [] })
      dispatch({ type: ACTION_TYPES.SET_CATEGORIES, payload: categoriesData.default || [] })
      dispatch({ type: ACTION_TYPES.SET_LOCATIONS, payload: locationsData.default || [] })

      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false })
    } catch (error) {
      console.error('Error loading initial data:', error)
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: 'Failed to load data' })
    }
  }

  // Action creators
  const actions = {
    setArtists: (artists) => {
      dispatch({ type: ACTION_TYPES.SET_ARTISTS, payload: artists })
    },

    setFilters: (filters) => {
      dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: filters })
    },

    addArtist: (artistData) => {
      dispatch({ type: ACTION_TYPES.ADD_ARTIST, payload: artistData })
    },

    updateArtist: (id, updates) => {
      dispatch({ type: ACTION_TYPES.UPDATE_ARTIST, payload: { id, updates } })
    },

    addBookingRequest: (requestData) => {
      dispatch({ type: ACTION_TYPES.ADD_BOOKING_REQUEST, payload: requestData })
    },

    updateBookingRequest: (id, updates) => {
      dispatch({ type: ACTION_TYPES.UPDATE_BOOKING_REQUEST, payload: { id, updates } })
    },

    clearError: () => {
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: null })
    }
  }

  // Context value
  const contextValue = {
    // State
    artists: state.artists,
    filteredArtists: state.filteredArtists,
    categories: state.categories,
    locations: state.locations,
    bookingRequests: state.bookingRequests,
    filters: state.filters,
    loading: state.loading,
    error: state.error,

    // Actions
    ...actions
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

/**
 * Custom hook to use App Context
 * Provides easy access to global state and actions
 */
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

/**
 * Custom hook for artists data
 * Provides filtered artists and related functions
 */
export function useArtists() {
  const { artists, filteredArtists, filters, setFilters, addArtist, updateArtist } = useApp()

  const searchArtists = (searchTerm) => {
    if (!searchTerm) return filteredArtists

    return filteredArtists.filter(artist =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
      artist.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getArtistById = (id) => {
    return artists.find(artist => artist.id === id)
  }

  const getArtistsByCategory = (category) => {
    return artists.filter(artist => artist.category.includes(category))
  }

  return {
    artists,
    filteredArtists,
    filters,
    setFilters,
    addArtist,
    updateArtist,
    searchArtists,
    getArtistById,
    getArtistsByCategory
  }
}

/**
 * Custom hook for booking requests
 * Provides booking-related functionality
 */
export function useBookings() {
  const { bookingRequests, addBookingRequest, updateBookingRequest } = useApp()

  const getBookingsByArtist = (artistId) => {
    return bookingRequests.filter(request => request.artistId === artistId)
  }

  const getBookingsByStatus = (status) => {
    return bookingRequests.filter(request => request.status === status)
  }

  const getPendingBookings = () => {
    return bookingRequests.filter(request => request.status === 'pending')
  }

  return {
    bookingRequests,
    addBookingRequest,
    updateBookingRequest,
    getBookingsByArtist,
    getBookingsByStatus,
    getPendingBookings
  }
}