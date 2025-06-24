'use client'

import { useState } from 'react'
import ArtistCard from './ArtistCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Search, AlertCircle } from 'lucide-react'

/**
 * ArtistGrid Component
 * Displays artists in grid or list format with pagination
 * Handles loading states and empty states
 */
export default function ArtistGrid({ artists, viewMode = 'grid', loading = false }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [highlightedArtist, setHighlightedArtist] = useState(null)
  const itemsPerPage = 12

  // Calculate pagination
  const totalPages = Math.ceil(artists.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentArtists = artists.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardContent className={viewMode === 'grid' ? 'p-0' : 'p-4'}>
            {viewMode === 'grid' ? (
              <div className="space-y-4">
                <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                  </div>
                  <div className="h-16 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded w-24"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="flex gap-2">
                    <div className="h-5 bg-gray-300 rounded w-12"></div>
                    <div className="h-5 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  // Empty state
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No Artists Found
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        We couldn't find any artists matching your criteria. 
        Try adjusting your filters or search terms.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline">
          Clear Filters
        </Button>
        <Button>
          Browse All Artists
        </Button>
      </div>
    </div>
  )

  // Error state
  const ErrorState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-muted-foreground mb-6">
        We're having trouble loading the artists. Please try again.
      </p>
      <Button onClick={() => window.location.reload()}>
        Try Again
      </Button>
    </div>
  )

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
      const pages = []
      const maxVisiblePages = 5
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 2) {
          pages.push(1)
          pages.push('...')
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(totalPages)
        }
      }
      
      return pages
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={index} className="px-2">...</span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => handlePageChange(page)}
              className="w-10"
            >
              {page}
            </Button>
          )
        ))}
        
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    )
  }

  // Show loading state
  if (loading) {
    return <LoadingSkeleton />
  }

  // Show empty state
  if (!loading && artists.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            Showing {startIndex + 1}-{Math.min(endIndex, artists.length)} of {artists.length} artists
          </span>
        </div>
        
        {totalPages > 1 && (
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {/* Artists Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {currentArtists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            viewMode={viewMode}
            highlighted={highlightedArtist === artist.id}
          />
        ))}
      </div>

      {/* Load More / Pagination */}
      <Pagination />

      {/* Back to top button */}
      {currentPage > 1 && (
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </Button>
        </div>
      )}
    </div>
  )
}