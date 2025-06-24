import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  DollarSign,
  UserCheck,
  Clock,
  Award
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

/**
 * StatsCards Component
 * Displays key platform statistics in card format
 * Shows metrics like total artists, bookings, revenue, etc.
 */
export default function StatsCards({ stats, loading = false }) {
  // Stats configuration with icons and formatting
  const statsConfig = [
    {
      title: 'Total Artists',
      value: stats.totalArtists,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Registered on platform',
      trend: '+12% from last month'
    },
    {
      title: 'Active Artists',
      value: stats.activeArtists,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Currently available',
      trend: `${Math.round((stats.activeArtists / stats.totalArtists) * 100) || 0}% availability rate`
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'All time bookings',
      trend: '+23% from last month'
    },
    {
      title: 'Pending Requests',
      value: stats.pendingBookings,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Awaiting response',
      trend: 'Requires attention'
    },
    {
      title: 'Platform Revenue',
      value: formatCurrency(stats.revenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Total earnings',
      trend: '+18% from last month'
    },
    {
      title: 'Average Rating',
      value: `${stats.averageRating}★`,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Customer satisfaction',
      trend: 'Excellent quality'
    }
  ]

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon
        
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 ${stat.bgColor} rounded-full`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <p className={`text-xs font-medium ${
                    stat.trend.includes('+') ? 'text-green-600' : 
                    stat.trend.includes('attention') ? 'text-red-600' : 
                    'text-blue-600'
                  }`}>
                    {stat.trend}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}