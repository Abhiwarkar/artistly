'use client'

import { useApp } from '@/context/AppContext'
import { Users, Calendar, MapPin, Star } from 'lucide-react'

/**
 * StatsSection Component
 * Displays platform statistics and achievements
 */
export default function StatsSection() {
  const { artists, bookingRequests } = useApp()

  const stats = [
    {
      icon: Users,
      value: `${artists.length || 500}+`,
      label: 'Verified Artists',
      description: 'Professional performers'
    },
    {
      icon: Calendar,
      value: `${bookingRequests.length || 1000}+`,
      label: 'Events Completed',
      description: 'Successful bookings'
    },
    {
      icon: MapPin,
      value: '50+',
      label: 'Cities Covered',
      description: 'Across India'
    },
    {
      icon: Star,
      value: '4.8★',
      label: 'Average Rating',
      description: 'Customer satisfaction'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}