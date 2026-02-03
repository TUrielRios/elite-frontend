import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { URLCleaner } from "@/components/url-cleaner"
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
    shortcut: "/elite-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* Google Translate initialization script */}
        <Script
          src="/google-translate-init.js"
          strategy="beforeInteractive"
        />
        {/* Google Translate main script */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide default Google Translate UI */
            .goog-te-banner-frame.skiptranslate,
            .goog-te-gadget-icon {
              display: none !important;
            }
            
            body {
              top: 0 !important;
            }
            
            /* Style Google Translate toolbar if it appears */
            .goog-te-banner-frame {
              display: none !important;
            }
            
            /* Prevent Google Translate from breaking layout */
            .skiptranslate iframe {
              display: none !important;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <URLCleaner />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
