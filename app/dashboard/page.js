'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  BarChart3, 
  Users, 
  Eye,
  Edit,
  Check,
  X,
  MoreVertical
} from 'lucide-react'

// Import mock data
import artistsData from '@/data/artists.json'

/**
 * Manager Dashboard Page
 * Simple table showing list of artist submissions
 * As per assignment requirements: Name, Category, City, Fee, Action button
 */
export default function DashboardPage() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  // Load artist submissions on mount
  useEffect(() => {
    const loadArtists = async () => {
      setLoading(true)
      // Simulate loading from mock API/local state
      await new Promise(resolve => setTimeout(resolve, 500))
      setArtists(artistsData)
      setLoading(false)
    }
    loadArtists()
  }, [])

  // Action handlers
  const handleApprove = (artistId) => {
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, status: 'approved' }
        : artist
    ))
    alert('Artist approved successfully!')
  }

  const handleReject = (artistId) => {
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, status: 'rejected' }
        : artist
    ))
    alert('Artist submission rejected!')
  }

  const handleView = (artistId) => {
    alert(`Viewing details for Artist ID: ${artistId}`)
  }

  // Extract city from location
  const getCity = (location) => {
    return location.split(',')[0].trim()
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-300 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 animate-pulse"></div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="h-4 bg-gray-300 rounded flex-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Manage artist submissions and platform operations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Artists</p>
                  <p className="text-2xl font-bold text-gray-900">{artists.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Verified Artists</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {artists.filter(a => a.verified).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Eye className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available Now</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {artists.filter(a => a.available).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Artist Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Artist Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artists.map((artist) => (
                    <TableRow key={artist.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {artist.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{artist.name}</p>
                            <div className="flex items-center gap-2">
                              {artist.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                              <Badge 
                                variant={artist.available ? "default" : "outline"} 
                                className="text-xs"
                              >
                                {artist.available ? 'Available' : 'Busy'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {artist.category.slice(0, 2).map((cat, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                          {artist.category.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{artist.category.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <p className="text-sm text-gray-900">{getCity(artist.location)}</p>
                        <p className="text-xs text-gray-500">{artist.location.split(',')[1]?.trim()}</p>
                      </TableCell>
                      
                      <TableCell>
                        <p className="font-medium text-gray-900">{artist.feeRange}</p>
                        <p className="text-xs text-gray-500">{artist.experience} experience</p>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleView(artist.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          
                          {artist.status !== 'approved' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(artist.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          )}
                          
                          {artist.status !== 'rejected' && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleReject(artist.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Table Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-gray-600">
                Showing {artists.length} artist submissions
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}