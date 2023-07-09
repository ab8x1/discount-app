import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'
import { Inter } from 'next/font/google'
import WalletProvider from '@/components/WalletProvider'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Discount Finance',
  description: 'Discount App',

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
