import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AppProvider } from '@/context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Artistly.com - Premier Artist Booking Platform',
  description: 'Connect with talented performers, singers, dancers, speakers, and DJs for your events. Professional artist booking made simple.',
  keywords: 'artist booking, event planning, performers, singers, dancers, speakers, DJs, entertainment',
  authors: [{ name: 'Artistly Team' }],
  creator: 'Artistly.com',
  publisher: 'Artistly.com',
  robots: 'index, follow',
  openGraph: {
    title: 'Artistly.com - Premier Artist Booking Platform',
    description: 'Connect with talented performers for your events',
    url: 'https://artistly.com',
    siteName: 'Artistly.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artistly.com - Premier Artist Booking Platform',
    description: 'Connect with talented performers for your events',
    creator: '@artistly',
  },
}

/**
 * Root Layout Component
 * Provides global layout structure with header, main content, and footer
 * Includes AppProvider for global state management
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional meta tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AppProvider>
          {/* Header Navigation */}
          <Header />
          
          {/* Main Content Area */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </AppProvider>
        
        {/* Analytics Script Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Analytics tracking code can be added here
              console.log('Artistly.com - Artist Booking Platform Loaded');
            `,
          }}
        />
      </body>
    </html>
  )
}