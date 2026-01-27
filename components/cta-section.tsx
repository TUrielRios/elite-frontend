"use client"

import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export function CTASection() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          ¿Listo Para Tu Aventura en Miami?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-primary-foreground/90">
          Reserva ahora y disfruta de un servicio premium desde el momento en que aterrices. Sin filas, sin esperas, sin
          complicaciones.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={scrollToBooking}>
            Obtener Cotización Gratis
          </Button>
          <a href="https://wa.me/19545580614" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Phone className="mr-2 h-5 w-5" />
              +1 (786) 305-6464
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
