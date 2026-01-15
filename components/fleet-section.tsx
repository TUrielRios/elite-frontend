"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Luggage, Briefcase, Loader2, AlertCircle } from "lucide-react"
import { fetchVehicles, getImageUrl, type Vehicle } from "@/lib/api"

export function FleetSection() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true)
      setError(null)

      const result = await fetchVehicles()

      if (result.success && result.data) {
        setVehicles(result.data)
      } else {
        setError(result.message || 'Error al cargar vehículos')
      }

      setLoading(false)
    }

    loadVehicles()
  }, [])

  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="fleet" className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Nuestros Vehículos</h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
            Vehículos modernos y bien mantenidos para cada necesidad
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Cargando vehículos...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4 max-w-md">
              <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
              <div>
                <p className="text-lg font-medium">Error al cargar vehículos</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <Button onClick={() => window.location.reload()}>Reintentar</Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && vehicles.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">No hay vehículos disponibles</p>
              <p className="text-sm text-muted-foreground">
                Pronto agregaremos vehículos a nuestra flota
              </p>
            </div>
          </div>
        )}

        {/* Vehicles Grid */}
        {!loading && !error && vehicles.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((car) => (
              <Card key={car.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={getImageUrl(car.image_url)}
                    alt={car.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">{car.name}</h3>

                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{car.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Luggage className="h-4 w-4" />
                      <span>{car.luggage}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{car.hand_luggage}</span>
                    </div>
                  </div>

                  {car.features && car.features.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {car.features.map((feature, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button variant="outline" className="w-full bg-transparent" onClick={scrollToBooking}>
                    Reservar Este Auto
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
