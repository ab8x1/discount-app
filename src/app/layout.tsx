import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'
import { Inter } from 'next/font/google'
import WalletProvider from '@/components/WalletProvider'
import Navbar from '@/components/Navbar'
import { Metadata } from 'next'

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
}) { console.log('RootLayout');
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <WalletProvider>
            <Navbar/>
            {children}
          </WalletProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
