/**
 * Application-wide constants for Artistly.com
 * Centralized configuration for consistent data across components
 */

// Unsplash Images Configuration
export const UNSPLASH_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop&crop=center',
  artistPlaceholder: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop&crop=center',
  categories: {
    singers: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    dancers: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
    djs: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    speakers: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
    bands: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
    comedians: 'https://images.unsplash.com/photo-1582479163908-5d18c93acfcf?w=400&h=300&fit=crop'
  }
};

// Artist categories with icons and descriptions
export const ARTIST_CATEGORIES = [
  {
    id: 'singers',
    name: 'Singers',
    description: 'Professional vocalists for all genres and events',
    icon: 'Mic',
    totalArtists: 124
  },
  {
    id: 'dancers',
    name: 'Dancers',
    description: 'Choreographers and performers for various dance styles',
    icon: 'Users',
    totalArtists: 98
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
    totalArtists: 89
  },
  {
    id: 'bands',
    name: 'Bands',
    description: 'Musical bands and orchestras',
    icon: 'Music4',
    totalArtists: 45
  },
  {
    id: 'comedians',
    name: 'Comedians',
    description: 'Stand-up comedians and entertainers',
    icon: 'Smile',
    totalArtists: 34
  }
];

// Fee ranges for filtering and selection
export const FEE_RANGES = [
  {
    value: '0-10000',
    label: '₹0 - ₹10,000',
    min: 0,
    max: 10000
  },
  {
    value: '10000-25000',
    label: '₹10,000 - ₹25,000',
    min: 10000,
    max: 25000
  },
  {
    value: '25000-50000',
    label: '₹25,000 - ₹50,000',
    min: 25000,
    max: 50000
  },
  {
    value: '50000-100000',
    label: '₹50,000 - ₹1,00,000',
    min: 50000,
    max: 100000
  },
  {
    value: '100000-250000',
    label: '₹1,00,000 - ₹2,50,000',
    min: 100000,
    max: 250000
  },
  {
    value: '250000+',
    label: '₹2,50,000+',
    min: 250000,
    max: 1000000
  }
];

// Supported languages
export const LANGUAGES = [
  { code: 'hi', name: 'Hindi' },
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ur', name: 'Urdu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'as', name: 'Assamese' },
  { code: 'or', name: 'Odia' }
];

// Major Indian cities for location filtering
export const LOCATIONS = [
  {
    id: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    displayName: 'Mumbai, Maharashtra'
  },
  {
    id: 'delhi',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    displayName: 'Delhi, India'
  },
  {
    id: 'bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    displayName: 'Bangalore, Karnataka'
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    displayName: 'Hyderabad, Telangana'
  },
  {
    id: 'chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    displayName: 'Chennai, Tamil Nadu'
  },
  {
    id: 'kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    displayName: 'Kolkata, West Bengal'
  },
  {
    id: 'pune',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    displayName: 'Pune, Maharashtra'
  },
  {
    id: 'ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    displayName: 'Ahmedabad, Gujarat'
  },
  {
    id: 'jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    displayName: 'Jaipur, Rajasthan'
  },
  {
    id: 'surat',
    city: 'Surat',
    state: 'Gujarat',
    country: 'India',
    displayName: 'Surat, Gujarat'
  }
];

// Artist specialties by category
export const SPECIALTIES = [
  // Singers
  { id: 'bollywood', name: 'Bollywood Songs', category: 'singers' },
  { id: 'classical', name: 'Classical Music', category: 'singers' },
  { id: 'sufi', name: 'Sufi Music', category: 'singers' },
  { id: 'folk', name: 'Folk Songs', category: 'singers' },
  { id: 'ghazal', name: 'Ghazal', category: 'singers' },
  { id: 'devotional', name: 'Devotional Songs', category: 'singers' },
  
  // Dancers
  { id: 'bharatanatyam', name: 'Bharatanatyam', category: 'dancers' },
  { id: 'kathak', name: 'Kathak', category: 'dancers' },
  { id: 'bollywood-dance', name: 'Bollywood Dance', category: 'dancers' },
  { id: 'contemporary', name: 'Contemporary Dance', category: 'dancers' },
  { id: 'hip-hop', name: 'Hip Hop', category: 'dancers' },
  { id: 'folk-dance', name: 'Folk Dance', category: 'dancers' },
  
  // Speakers
  { id: 'motivational', name: 'Motivational Speaking', category: 'speakers' },
  { id: 'corporate', name: 'Corporate Training', category: 'speakers' },
  { id: 'educational', name: 'Educational Talks', category: 'speakers' },
  { id: 'keynote', name: 'Keynote Speaking', category: 'speakers' },
  { id: 'workshop', name: 'Workshop Facilitation', category: 'speakers' },
  
  // DJs
  { id: 'wedding-dj', name: 'Wedding DJ', category: 'djs' },
  { id: 'party-dj', name: 'Party DJ', category: 'djs' },
  { id: 'corporate-dj', name: 'Corporate Events', category: 'djs' },
  { id: 'club-dj', name: 'Club DJ', category: 'djs' },
  { id: 'live-mixing', name: 'Live Mixing', category: 'djs' },
  
  // Bands
  { id: 'rock-band', name: 'Rock Band', category: 'bands' },
  { id: 'acoustic', name: 'Acoustic Performance', category: 'bands' },
  { id: 'fusion', name: 'Fusion Music', category: 'bands' },
  { id: 'orchestra', name: 'Orchestra', category: 'bands' },
  
  // Comedians
  { id: 'standup', name: 'Stand-up Comedy', category: 'comedians' },
  { id: 'improv', name: 'Improvisational Comedy', category: 'comedians' },
  { id: 'roast', name: 'Roast Comedy', category: 'comedians' },
  { id: 'clean-comedy', name: 'Clean Comedy', category: 'comedians' }
];

// Availability status options
export const AVAILABILITY_STATUS = [
  { value: 'all', label: 'All Artists' },
  { value: 'available', label: 'Available' },
  { value: 'busy', label: 'Busy' },
  { value: 'unavailable', label: 'Unavailable' }
];

// Rating options for filtering
export const RATING_OPTIONS = [
  { value: 0, label: 'All Ratings' },
  { value: 3, label: '3+ Stars' },
  { value: 4, label: '4+ Stars' },
  { value: 4.5, label: '4.5+ Stars' }
];

// Event types for booking requests
export const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Anniversary',
  'Concert',
  'Festival',
  'Private Party',
  'Conference',
  'Product Launch',
  'Cultural Event',
  'Religious Event',
  'School/College Event',
  'Charity Event',
  'Other'
];

// Booking status options
export const BOOKING_STATUS = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'accepted', label: 'Accepted', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
  { value: 'completed', label: 'Completed', color: 'blue' }
];

// Form validation rules
export const VALIDATION_RULES = {
  name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 50, message: 'Name must be less than 50 characters' }
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    }
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[+]?[91]?[6-9]\d{9}$/,
      message: 'Please enter a valid Indian phone number'
    }
  },
  bio: {
    required: 'Bio is required',
    minLength: { value: 50, message: 'Bio must be at least 50 characters' },
    maxLength: { value: 500, message: 'Bio must be less than 500 characters' }
  }
};

// Navigation menu items
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/', icon: 'Home' },
  { name: 'Find Artists', href: '/artists', icon: 'Search' },
  { name: 'Join as Artist', href: '/onboard', icon: 'UserPlus' },
  { name: 'Dashboard', href: '/dashboard', icon: 'BarChart3' }
];

// Social media platforms
export const SOCIAL_PLATFORMS = [
  { name: 'Instagram', key: 'instagram', icon: 'Instagram', placeholder: 'https://instagram.com/username' },
  { name: 'YouTube', key: 'youtube', icon: 'Youtube', placeholder: 'https://youtube.com/channel' },
  { name: 'Website', key: 'website', icon: 'Globe', placeholder: 'https://yourwebsite.com' }
];

// Default values for forms
export const DEFAULT_VALUES = {
  onboarding: {
    name: '',
    bio: '',
    category: [],
    languages: [],
    feeRange: '',
    location: '',
    contactEmail: '',
    phoneNumber: '',
    experience: 1,
    specialties: [],
    socialMedia: {
      instagram: '',
      youtube: '',
      website: ''
    }
  },
  filters: {
    category: [],
    location: [],
    feeRange: [],
    availability: 'all',
    rating: 0
  }
};