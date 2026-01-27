import { Card } from "@/components/ui/card"
import { Plane, MapPin, Shield, Smartphone, Clock, Award } from "lucide-react"

const services = [
  {
    icon: Plane,
    title: "Entrega en Aeropuerto",
    description: "Tu auto te espera en el terminal de llegada. Inicia tus vacaciones sin estrés.",
  },
  {
    icon: MapPin,
    title: "Devolución Flexible",
    description: "¿Vas tarde? Recibimos tu auto en la puerta del terminal de salida.",
  },
  {
    icon: Shield,
    title: "Sin Cargos Ocultos",
    description: "Transparencia total. Solo pagas lo cotizado, sin sorpresas desagradables.",
  },
  {
    icon: Smartphone,
    title: "Apple CarPlay & Android Auto",
    description: "Todos nuestros vehículos incluyen Apple CarPlay y Android Auto para tu comodidad.",
  },
  {
    icon: Clock,
    title: "Servicio 24/7",
    description: "Disponibles cuando nos necesites, cualquier día a cualquier hora.",
  },
  {
    icon: Award,
    title: "Atención Premium",
    description: "Servicio personalizado que te acompaña durante todo el proceso.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">¿Por Qué Elegir Elite?</h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
            Ofrecemos un servicio premium diseñado para tu comodidad y tranquilidad
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="p-6 transition-all hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="text-pretty text-muted-foreground">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
