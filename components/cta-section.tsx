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
    <section className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-secondary md:text-4xl">
          ¿Listo Para Tu Aventura en Florida?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground">
          Reserva ahora y disfruta de un servicio premium desde el momento en que aterrices. Sin filas, sin esperas, sin
          complicaciones.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="w-full bg-primary border-black hover:bg-white/90 text-secondary font-bold shadow-xl hover:scale-105 transition-all sm:w-auto"
            onClick={scrollToBooking}
          >
            Obtener Cotización Gratis
          </Button>
          <a href="https://wa.me/19545580614" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/80 text-white font-bold shadow-xl hover:scale-105 transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              +1 (954) 558-0614
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}