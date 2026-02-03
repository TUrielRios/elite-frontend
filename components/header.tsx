"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GoogleTranslateSelector } from "@/components/google-translate-selector"
import { Menu, X, Phone } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "border-b border-border bg-white shadow-md"
        : "border-b border-transparent bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/elite-logo.png"
              alt="Elite Rent A Car Miami"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
            <button
              onClick={() => scrollToSection("fleet")}
              className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-gray-800" : "text-white"
                }`}
            >
              Flota
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-gray-800" : "text-white"
                }`}
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-gray-800" : "text-white"
                }`}
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-gray-800" : "text-white"
                }`}
            >
              Contacto
            </button>
          </nav>

          {/* CTA Buttons + Language Selector */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <GoogleTranslateSelector isScrolled={isScrolled} />

            <a href="https://wa.me/19545580614" target="_blank" rel="noopener noreferrer" className="hidden md:flex">
              <Button size="sm" className="gap-2 bg-secondary text-white hover:bg-secondary/80">
                <Phone className="h-4 w-4" />
                +1 (954) 558-0614
              </Button>
            </a>
            <Button
              size="sm"
              className="bg-primary text-secondary hover:bg-primary/90"
              onClick={() => scrollToSection("booking")}
            >
              Reservar Ahora
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${isScrolled ? "text-gray-900" : "text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-4 py-4 md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 border-b border-border px-4">
            <button
              onClick={() => scrollToSection("fleet")}
              className="text-left text-sm font-medium text-gray-900"
            >
              Flota
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-left text-sm font-medium text-gray-900"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-left text-sm font-medium text-gray-900"
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-sm font-medium text-gray-900"
            >
              Contacto
            </button>
            <a href="https://wa.me/19545580614" target="_blank" rel="noopener noreferrer" className="pt-2">
              <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent border-gray-300 text-gray-900">
                <Phone className="h-4 w-4" />
                +1 (954) 558-0614
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}