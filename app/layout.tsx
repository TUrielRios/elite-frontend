import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: "Elite Rent A Car Miami | Premium Car Rental in Miami",
  description: "Elite car rental service in Miami. Airport pickup, no hidden fees, premium fleet. Book your car today!",

  keywords: ["car rental miami", "rent a car miami", "miami airport car rental", "elite car rental"],
  openGraph: {
    title: "Elite Rent A Car Miami",
    description: "Premium car rental service in Miami",
    type: "website",
  },
  icons: {
    icon: "/elite-logo.png",
    apple: "/elite-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
