"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
        ? "border-b border-white/5 bg-black/50 backdrop-blur-md"
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
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Flota
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Contacto
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a href="https://wa.me/19545580614" target="_blank" rel="noopener noreferrer" className="hidden md:flex">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Phone className="h-4 w-4" />
                +1 (954) 558-0614
              </Button>
            </a>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => scrollToSection("booking")}
            >
              Reservar Ahora
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-4 py-4 md:hidden bg-black/90 backdrop-blur-xl absolute top-16 left-0 right-0 border-b border-white/10 px-4">
            <button
              onClick={() => scrollToSection("fleet")}
              className="text-left text-sm font-medium text-foreground/80"
            >
              Flota
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-left text-sm font-medium text-foreground/80"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-left text-sm font-medium text-foreground/80"
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-sm font-medium text-foreground/80"
            >
              Contacto
            </button>
            <a href="https://wa.me/19545580614" target="_blank" rel="noopener noreferrer" className="pt-2">
              <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
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
