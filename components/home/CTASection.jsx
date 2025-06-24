import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, UserPlus, ArrowRight, Sparkles } from 'lucide-react'

/**
 * CTASection Component
 * Call-to-action section encouraging users to explore or join platform
 */
export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full" />
        <div className="absolute bottom-20 left-32 w-12 h-12 border border-white/20 rounded-full" />
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-white/20 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
            <Sparkles className="h-8 w-8" />
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Create
              <span className="block text-yellow-300">
                Unforgettable Events?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
              Join thousands of event planners and artists who trust Artistly.com 
              to connect, collaborate, and create magical moments together.
            </p>
          </div>

          {/* Two-Column CTA - Fixed button text visibility */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* For Event Planners */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-white/20">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">For Event Planners</h3>
                <p className="text-sm text-gray-200">
                  Discover and book verified artists for your next event
                </p>
              </div>
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-white text-primary hover:bg-gray-100 min-h-[48px]"
              >
                <Link href="/artists" className="flex items-center justify-center space-x-2 no-underline">
                  <Search className="h-5 w-5 flex-shrink-0" />
                  <span className="font-semibold">Find Artists</span>
                  <ArrowRight className="h-5 w-5 flex-shrink-0" />
                </Link>
              </Button>
            </div>

            {/* For Artists */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-white/20">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">For Artists</h3>
                <p className="text-sm text-gray-200">
                  Join our platform and get discovered by event organizers
                </p>
              </div>
              {/* Simple button without complex styling */}
              <div className="w-full">
                <Link 
                  href="/onboard"
                  className="w-full min-h-[48px] border-2 border-white bg-transparent text-white font-semibold rounded-lg flex items-center justify-center space-x-2 hover:bg-white hover:text-blue-600 transition-all duration-200"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '12px 24px'
                  }}
                >
                  <UserPlus size={20} color="white" />
                  <span style={{ color: 'white', fontWeight: '600' }}>Join Now</span>
                  <ArrowRight size={20} color="white" />
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-200 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0" />
              <span className="whitespace-nowrap">100% Verified Artists</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0" />
              <span className="whitespace-nowrap">Secure Payment Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0" />
              <span className="whitespace-nowrap">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}