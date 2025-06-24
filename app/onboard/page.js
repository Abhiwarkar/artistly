'use client'

import { useState } from 'react'
import OnboardingForm from '@/components/forms/OnboardingForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Star, 
  Users, 
  Calendar, 
  TrendingUp,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

/**
 * Artist Onboarding Page
 * Multi-step form for artists to join the platform
 * Includes benefits overview and success stories
 */
export default function OnboardPage() {
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Benefits data
  const benefits = [
    {
      icon: Users,
      title: 'Get Discovered',
      description: 'Connect with event planners and organizers looking for talent like yours'
    },
    {
      icon: Calendar,
      title: 'Manage Bookings',
      description: 'Easy-to-use dashboard to handle all your event bookings and schedules'
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Career',
      description: 'Access to premium events and opportunities to expand your audience'
    },
    {
      icon: Star,
      title: 'Build Reputation',
      description: 'Collect reviews and ratings to establish your professional credibility'
    }
  ]

  // Success stories
  const successStories = [
    {
      name: 'Priya Sharma',
      category: 'Singer',
      achievement: '200+ Events Booked',
      quote: 'Artistly.com transformed my career. I went from local gigs to performing at premium weddings across India.',
      rating: 4.9
    },
    {
      name: 'DJ Arjun',
      category: 'DJ',
      achievement: '₹50L+ Earned',
      quote: 'The platform connected me with high-budget events I never thought possible. Amazing experience!',
      rating: 4.8
    },
    {
      name: 'Kavya Dance Troupe',
      category: 'Dancers',
      achievement: '150+ Performances',
      quote: 'Professional clients, timely payments, and amazing events. Highly recommend to all artists.',
      rating: 4.9
    }
  ]

  // If form is being shown
  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              {/* Fixed Button - Simple white with black text */}
              <div 
                onClick={() => setShowForm(false)}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid black'
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Join as Artist
                </h1>
                <p className="text-muted-foreground">
                  Complete your profile to start receiving bookings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="container mx-auto px-4 py-8">
          <OnboardingForm />
        </div>
      </div>
    )
  }

  // Landing page view
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-white/20 text-white border-white/30">
              Join 500+ Professional Artists
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Turn Your Talent Into
              <span className="block text-yellow-300">Income</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              Join India's premier artist booking platform and get discovered by event 
              planners looking for talented performers like you.
            </p>
            
            {/* Blue buttons with white text like in image */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <button 
                onClick={() => setShowForm(true)}
                style={{ 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  padding: '16px 32px', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '12px',
                  minWidth: '250px'
                }}
              >
                Join Now - It's Free
              </button>
              <button 
                onClick={() => window.location.href = '/artists'}
                style={{ 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  padding: '16px 32px', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '12px',
                  minWidth: '250px'
                }}
              >
                Browse Artists
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-200 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>100% Free to Join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Verified Clients Only</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why Artists Choose Artistly.com
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of artists who have transformed their careers with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              See how artists like you are thriving on our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {story.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {story.category}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {story.rating}
                    </Badge>
                  </div>
                  
                  <Badge className="bg-green-100 text-green-800">
                    {story.achievement}
                  </Badge>
                  
                  <blockquote className="text-sm text-muted-foreground italic">
                    "{story.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-100">
              Join hundreds of artists who are already earning from their passion. 
              It takes less than 5 minutes to get started.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              style={{ 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                padding: '12px 32px', 
                fontSize: '18px', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                border: 'none',
                borderRadius: '12px'
              }}
            >
              Create Your Artist Profile
            </button>
            <p className="text-sm text-gray-200">
              No setup fees • No monthly charges • Only pay when you get booked
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}