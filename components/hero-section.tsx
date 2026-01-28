"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

const destinations = [
  { src: "/miami-1.jpg", alt: "Paseo junto al agua en Miami con palmeras" },
  { src: "/miami-2.jpg", alt: "Hotel InterContinental en Miami" },
  { src: "/orlando-theme-park.jpg", alt: "Parque temático en Orlando" },
  { src: "/universal-studios.png", alt: "Universal Studios Orlando" },
  { src: "/disney-castle.png", alt: "Castillo de Disney en Orlando" },
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % destinations.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 md:pt-32">
      {/* Background Images Slider */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={destination.src}
              alt={destination.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Light Overlay for text readability */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto flex h-full flex-col px-4 pb-12">
        <div className="mx-auto flex flex-1 flex-col justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20">
              🚗 Servicio Premium en Miami
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              Vive Florida <br /> <span className="text-white-foreground">Viaja Premium</span>
            </h1>

            <p className="mb-8 text-pretty text-lg text-gray-200 md:text-xl">
              Entrega inmediata en aeropuerto. Sin filas. Sin sorpresas.
            </p>

            <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full bg-white hover:bg-primary/80 text-secondary font-bold shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all sm:w-auto"
                onClick={scrollToBooking}
              >
                Cotizar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="https://wa.me/19545580614" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-secondary hover:bg-secondary/80 text-white font-bold shadow-xl hover:shadow-secondary/50 hover:scale-105 transition-all">
                  WhatsApp
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 pb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white-foreground" />
                <span>Entrega en Aeropuerto</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white-foreground" />
                <span>Sin Cargos Ocultos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white-foreground" />
                <span>Flota Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}