# 🎭 Artistly.com - Premier Artist Booking Platform


> A modern, responsive web application for connecting event planners with talented performers across India. Built with Next.js, React, and Tailwind CSS.

## 🌟 **Live Demo**

🔗 **[View Live Demo]https://artistly-1amk.vercel.app/** _(Deploy to get this link)_

---


## 🎯 **Project Overview**

Artistly.com is a comprehensive artist booking platform designed to bridge the gap between event planners and talented performers. The platform allows event organizers to discover, filter, and book artists while providing performers with a professional dashboard to manage their profiles and bookings.

### **Key Objectives**
- 🎪 **Connect Talent with Opportunity** - Bridge event planners and artists
- 🔍 **Smart Discovery** - Advanced filtering and search capabilities
- 📱 **Mobile-First Design** - Responsive across all devices
- ⚡ **Performance Optimized** - Fast loading and smooth interactions
- 🎨 **Professional UI** - Modern, clean, and intuitive interface

---

## ✨ **Features**

### 🏠 **Homepage**
- **Hero Section** with compelling value proposition
- **Category Cards** showcasing artist types (Singers, Dancers, DJs, Speakers, Bands, Comedians)
- **Featured Artists** with ratings and testimonials
- **Call-to-Action** sections for both event planners and artists

### 🔍 **Artist Discovery**
- **Grid/List View Toggle** for flexible browsing
- **Advanced Filtering** by category, location, price range, and availability
- **Real-time Search** across artist names, bios, and specialties
- **Artist Cards** with comprehensive details and quick actions

### 📝 **Artist Onboarding**
- **Multi-step Form** with progress tracking
- **Form Validation** using React Hook Form + Yup
- **Multi-select Categories** and languages
- **Professional Profile** creation with bio, experience, and portfolio
- **Social Media Integration** for Instagram, YouTube, and websites

### 📊 **Management Dashboard**
- **Artist Table** with sorting and pagination
- **Bulk Operations** for efficient management
- **Status Management** and booking tracking
- **Analytics Overview** with key metrics

### 🎨 **UI/UX Excellence**
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Dark Mode Support** - System preference detection
- **Loading States** - Smooth skeleton loading animations
- **Error Handling** - Graceful error boundaries and fallbacks
- **Accessibility** - WCAG compliant with proper ARIA labels

---

## 🛠️ **Tech Stack**

### **Frontend Framework**
- **[Next.js 14.2.4](https://nextjs.org/)** - React framework with App Router
- **[React 18.3.1](https://reactjs.org/)** - UI library with hooks and context

### **Styling & UI**
- **[Tailwind CSS 3.4.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components

### **Form Management**
- **[React Hook Form 7.52.1](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Yup 1.4.0](https://github.com/jquense/yup)** - Schema validation library
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolver

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing

---

## 📱 **Pages & Functionality**

### 1. **Homepage** (`/`)
```javascript
Components Used:
├── HeroSection.jsx          // Main banner with CTAs
├── CategoryCard.jsx         // Artist category showcase
├── FeaturedArtists.jsx      // Top-rated performers
└── CTASection.jsx           // Call-to-action for sign-ups
```

### 2. **Artist Listing** (`/artists`)
```javascript
Features:
├── Advanced Filtering       // Category, location, price, availability
├── Real-time Search        // Name, bio, specialty search
├── Grid/List Toggle        // Flexible view modes
├── Pagination             // Efficient data loading
└── Artist Cards           // Detailed artist information
```

### 3. **Artist Onboarding** (`/onboard`)
```javascript
Form Sections:
├── Personal Information    // Name, bio, contact details
├── Professional Details   // Categories, languages, experience
├── Portfolio & Media      // Images, social media links
└── Pricing & Availability // Fee ranges, location
```

### 4. **Dashboard** (`/dashboard`)
```javascript
Management Features:
├── Artist Table           // Sortable, filterable data table
├── Bulk Operations       // Multi-select actions
├── Status Management     // Availability tracking
└── Analytics Overview    // Performance metrics
```

---

## 🚀 **Quick Start**

### **Prerequisites**
```bash
Node.js 18.0.0+ 
npm 9.0.0+ or yarn 1.22.0+
Git
```

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Abhiwarkar/artistly
cd artistly-booking-platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
```
http://localhost:3000
```

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 📁 **Project Structure**

```
artistly-booking-platform/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 (routes)/           # Page routes
│   │   ├── page.js            # Homepage
│   │   ├── artists/           # Artist listing
│   │   ├── onboard/           # Artist onboarding
│   │   └── dashboard/         # Management dashboard
│   ├── layout.js              # Root layout
│   └── globals.css            # Global styles
├── 📁 components/             # Reusable UI components
│   ├── 📁 ui/                 # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   └── ...
│   ├── 📁 layout/             # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Navigation.jsx
│   ├── 📁 forms/              # Form components
│   │   ├── OnboardingForm.jsx
│   │   └── MultiSelectDropdown.jsx
│   ├── 📁 artists/            # Artist-related components
│   │   ├── ArtistCard.jsx
│   │   ├── ArtistGrid.jsx
│   │   └── ArtistTable.jsx
│   └── 📁 home/               # Homepage components
│       ├── HeroSection.jsx
│       ├── CategoryCard.jsx
│       └── FeaturedArtists.jsx
├── 📁 context/                # React Context
│   └── AppContext.jsx         # Global state management
├── 📁 data/                   # Mock data
│   ├── artists.json           # Artist profiles
│   ├── categories.json        # Category definitions
│   └── locations.json         # Location data
├── 📁 lib/                    # Utility functions
│   ├── utils.js               # Helper utilities
│   ├── validations.js         # Form validation schemas
│   └── constants.js           # App constants
├── 📁 hooks/                  # Custom React hooks
│   └── useLocalStorage.js     # localStorage hook
├── 📁 public/                 # Static assets
│   ├── favicon.ico
│   └── images/
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🎨 **UI Components**

### **Design System**
- **Color Palette**: Modern gradient themes with accessibility compliance
- **Typography**: Inter font family for optimal readability
- **Spacing**: Consistent 8px grid system
- **Breakpoints**: Mobile-first responsive design

### **Component Library**
```javascript
// Example component usage
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

<Button variant="primary" size="lg">
  Find Artists
</Button>
```

### **Key Components**
- **ArtistCard** - Reusable artist profile display
- **FilterSection** - Advanced filtering interface
- **OnboardingForm** - Multi-step form with validation
- **DataTable** - Sortable, paginated table component

---

## 📊 **Data Management**

### **Mock Data Structure**

```javascript
// Artist Profile Schema
{
  "id": 1,
  "name": "Priya Sharma",
  "location": "Mumbai, Maharashtra",
  "category": ["Singers"],
  "rating": 4.8,
  "verified": true,
  "available": true,
  "profileImage": "https://images.unsplash.com/...",
  "bio": "Professional Bollywood playback singer...",
  "feeRange": "₹50,000 - ₹1,00,000",
  "experience": "8+ years",
  "eventsCompleted": 145,
  "socialMedia": {
    "instagram": "https://instagram.com/priyasharma",
    "youtube": "https://youtube.com/priyasharma"
  }
}
```

### **State Management**
- **Global Context** - AppContext for application-wide state
- **Local State** - useState for component-specific data
- **Form State** - React Hook Form for form management

---

## 🔧 **Development**

### **Code Quality**
- **ESLint Configuration** - Strict linting rules
- **Prettier Integration** - Consistent code formatting
- **Component Documentation** - JSDoc comments
- **Git Hooks** - Pre-commit quality checks

### **Performance Optimization**
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Dynamic imports for heavy components
- **Caching** - Strategic caching for static assets

### **Best Practices**
```javascript
// Component example with best practices
/**
 * ArtistCard Component
 * Displays artist information in a card format
 * @param {Object} artist - Artist data object
 * @param {string} viewMode - Display mode ('grid' | 'list')
 */
export default function ArtistCard({ artist, viewMode = 'grid' }) {
  // Component implementation
}
```

---

## 🚀 **Deployment**

### **Vercel Deployment** (Recommended)

1. **Connect Repository**
```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

3. **Automatic Deployments**
- Connect GitHub repository to Vercel
- Automatic deployments on push to main branch
- Preview deployments for pull requests

### **Environment Variables**
```bash
# .env.local (for local development)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.artistly.com
```

### **Build Optimization**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
```

---



**Built with ❤️ by abhishek Hiwarkar"
