"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    country: "",
    rating: 5,
    text: "Es un servicio muy cómodo. Me hacen sentir como parte de la familia. Todo fue súper rápido y profesional.",
  },
  {
    name: "Carlos Rodríguez",
    country: "",
    rating: 5,
    text: "Todo lo que dicen lo cumplen. Sin cargos ocultos, sin sorpresas. Totalmente recomendado.",
  },
  {
    name: "Sofía Martínez",
    country: "",
    rating: 5,
    text: "Te esperan en la puerta con tu carro del año. El servicio es impecable y muy conveniente.",
  },
  {
    name: "Juan Pérez",
    country: "",
    rating: 5,
    text: "Son súper de confianza. Puedes llegar a cualquier hora y siempre van a estar ahí para ayudarte.",
  },
  {
    name: "Ana Silva",
    country: "",
    rating: 5,
    text: "Fue una atención ejemplar. Te acompañan en todo momento durante el proceso.",
  },
  {
    name: "Roberto López",
    country: "",
    rating: 5,
    text: "Viajar así es muchísimo más cómodo. Te ahorras mucho tiempo después de un largo viaje.",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-secondary">Lo Que Dicen Nuestros Clientes</h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
            Miles de clientes satisfechos confían en Elite Rent A Car
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-primary">
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="mb-4 text-pretty italic text-secondary">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-secondary">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.country}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
