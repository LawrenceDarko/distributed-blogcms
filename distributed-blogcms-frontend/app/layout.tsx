import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './Components/Navigations/navbar'
import { GeneralContextProvider } from './hooks/GeneralContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CMS Blog',
  description: 'This is a distibuted CMS blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GeneralContextProvider>
    <html lang="en">
      <body className={`${inter.className} bg-[#DCDCDC]`}>
        {children}
      </body>
    </html>
    </GeneralContextProvider>
  )
}
