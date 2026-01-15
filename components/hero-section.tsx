"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function HeroSection() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary/10 pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e9c2d3_1px,transparent_1px),linear-gradient(to_bottom,#e9c2d3_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-10" />

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            🚗 Servicio Premium en Miami
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Vive Miami. <span className="text-primary">Viaja Premium.</span>
          </h1>

          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            Entrega inmediata en aeropuerto. Sin filas. Sin sorpresas.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
              onClick={scrollToBooking}
            >
              Cotizar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="tel:+19545580614" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Llamar Ahora
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Entrega en Aeropuerto</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Sin Cargos Ocultos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Flota Premium</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
