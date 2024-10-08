import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { Metadata } from 'next'
import Providers from '@/components/Providers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discount Finance',
  description: 'Discount App',
  twitter: {
    card: "summary_large_image",
    site: "Buy crypto at discount & earn fixed returns Beta waitlist ➡️ discount.finance Powered by @APWineFinance",
    images: "https://beta.discount.finance/social-card.jpg"
  },
  openGraph: {
    images: {
      url: "https://beta.discount.finance/social-card.jpg",
      width: 2400,
      height: 1350,
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
      {
        process.env.NODE_ENV === "production" &&
        <Script src="https://cdn.usefathom.com/script.js" data-site="OWVXJDLR" defer/>
      }
    </html>
  )
}
