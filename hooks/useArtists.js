'use client'

import { useState, useEffect } from 'react'

/**
 * useLocalStorage Hook
 * Provides a simple interface for storing and retrieving data from localStorage
 * Handles JSON serialization/deserialization and provides type safety
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Save state
      setStoredValue(valueToStore)
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Remove from localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}

/**
 * useSessionStorage Hook
 * Similar to useLocalStorage but uses sessionStorage instead
 * Data persists only for the session (until browser tab is closed)
 */
export function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}

/**
 * useStorageState Hook
 * Generic hook that can work with any storage mechanism
 */
export function useStorageState(key, initialValue, storage = 'localStorage') {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const storageObject = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage
      const item = storageObject.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading ${storage} key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        const storageObject = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage
        storageObject.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting ${storage} key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        const storageObject = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage
        storageObject.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing ${storage} key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}

/**
 * Storage utility functions
 * Standalone functions for one-off storage operations
 */
export const storage = {
  // Get item from localStorage
  get: (key, defaultValue = null) => {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error getting localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  // Set item in localStorage
  set: (key, value) => {
    if (typeof window === 'undefined') return false
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
      return false
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    if (typeof window === 'undefined') return false
    
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
      return false
    }
  },

  // Clear all localStorage
  clear: () => {
    if (typeof window === 'undefined') return false
    
    try {
      window.localStorage.clear()
      return true
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
      return false
    }
  },

  // Get all keys from localStorage
  keys: () => {
    if (typeof window === 'undefined') return []
    
    try {
      return Object.keys(window.localStorage)
    } catch (error) {
      console.warn('Error getting localStorage keys:', error)
      return []
    }
  }
}

/**
 * Hook for managing user preferences
 * Commonly used settings with predefined keys
 */
export function useUserPreferences() {
  const [theme, setTheme] = useLocalStorage('user-theme', 'light')
  const [language, setLanguage] = useLocalStorage('user-language', 'en')
  const [notifications, setNotifications] = useLocalStorage('user-notifications', true)
  const [autoSave, setAutoSave] = useLocalStorage('user-autosave', true)

  const resetPreferences = () => {
    setTheme('light')
    setLanguage('en')
    setNotifications(true)
    setAutoSave(true)
  }

  return {
    preferences: {
      theme,
      language,
      notifications,
      autoSave
    },
    setTheme,
    setLanguage,
    setNotifications,
    setAutoSave,
    resetPreferences
  }
}

/**
 * Hook for managing recently viewed items
 */
export function useRecentlyViewed(maxItems = 10) {
  const [recentItems, setRecentItems] = useLocalStorage('recently-viewed', [])

  const addRecentItem = (item) => {
    setRecentItems(prev => {
      const filtered = prev.filter(existing => existing.id !== item.id)
      const updated = [item, ...filtered].slice(0, maxItems)
      return updated
    })
  }

  const removeRecentItem = (itemId) => {
    setRecentItems(prev => prev.filter(item => item.id !== itemId))
  }

  const clearRecentItems = () => {
    setRecentItems([])
  }

  return {
    recentItems,
    addRecentItem,
    removeRecentItem,
    clearRecentItems
  }
}