import { Plane, FileSignature, Car } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Plane,
    title: "Aterrizas",
    description: "Tu auto te estará esperando en el terminal de llegada para que empieces tu viaje de la mejor manera.",
  },
  {
    number: "02",
    icon: FileSignature,
    title: "Firmas",
    description: "Ya todo está listo. Encontrarás el contrato en tu correo con la tarifa cotizada, solo debes firmar.",
  },
  {
    number: "03",
    icon: Car,
    title: "Manejas",
    description: "¡Así de fácil! En minutos ya estarás manejando hacia tu destino sin complicaciones.",
  },
]

export function ProcessSection() {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-secondary">Rentar Con Elite Es Muy Fácil</h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
            Tres simples pasos para comenzar tu aventura
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative text-center">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white text-accent">
                  <Icon className="h-10 w-10" />
                </div>
                <div className="absolute left-1/2 top-10 -z-10 hidden h-px w-full -translate-x-1/2 bg-border md:block" />
                <div className="mb-2 text-4xl font-bold text-secondary">{step.number}</div>
                <h3 className="mb-3 text-2xl font-semibold text-secondary">{step.title}</h3>
                <p className="text-pretty text-secondary">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
