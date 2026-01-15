"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Car, User, Mail, Phone } from "lucide-react"

export function BookingForm() {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropoffDate: "",
    dropoffTime: "",
    carType: "",
    age: "",
    email: "",
    phone: "",
    name: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message = `Hola, me gustaría solicitar una cotización para un auto:
    
👤 Nombre: ${formData.name}
📧 Email: ${formData.email}
📱 Teléfono: ${formData.phone}
🎂 Edad: ${formData.age}

🚗 Tipo de Auto: ${formData.carType}
📍 Recogida: ${formData.pickupLocation}
📅 Fecha: ${formData.pickupDate}
⏰ Hora: ${formData.pickupTime}

🏁 Devolución: ${formData.dropoffLocation}
📅 Fecha: ${formData.dropoffDate}
⏰ Hora: ${formData.dropoffTime}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/19545580614?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="booking" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Reserva Tu Auto</h2>
            <p className="text-lg text-muted-foreground">
              Completa el formulario y recibe una cotización personalizada
            </p>
          </div>

          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-primary" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4 text-primary" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (786) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="age" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-primary" />
                    Edad del Conductor
                  </label>
                  <select
                    id="age"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="21-24">21-24 años</option>
                    <option value="25+">25+ años</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="pickupLocation" className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-primary" />
                    Lugar de Entrega
                  </label>
                  <select
                    id="pickupLocation"
                    name="pickupLocation"
                    required
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seleccionar ubicación</option>
                    <option value="mia">Miami International Airport</option>
                    <option value="fll">Ft. Lauderdale Airport</option>
                    <option value="office">Elite Office</option>
                    <option value="hotel">Hotel/Residencia</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="dropoffLocation" className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-primary" />
                    Lugar de Devolución
                  </label>
                  <select
                    id="dropoffLocation"
                    name="dropoffLocation"
                    required
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seleccionar ubicación</option>
                    <option value="mia">Miami International Airport</option>
                    <option value="fll">Ft. Lauderdale Airport</option>
                    <option value="office">Elite Office</option>
                    <option value="hotel">Hotel/Residencia</option>
                  </select>
                </div>
              </div>

              {/* Pickup Date & Time */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="pickupDate" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-primary" />
                    Fecha de Entrega
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    required
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pickupTime" className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-primary" />
                    Hora de Entrega
                  </label>
                  <input
                    type="time"
                    id="pickupTime"
                    name="pickupTime"
                    required
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Dropoff Date & Time */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="dropoffDate" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-primary" />
                    Fecha de Devolución
                  </label>
                  <input
                    type="date"
                    id="dropoffDate"
                    name="dropoffDate"
                    required
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="dropoffTime" className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-primary" />
                    Hora de Devolución
                  </label>
                  <input
                    type="time"
                    id="dropoffTime"
                    name="dropoffTime"
                    required
                    value={formData.dropoffTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Car Type */}
              <div className="space-y-2">
                <label htmlFor="carType" className="flex items-center gap-2 text-sm font-medium">
                  <Car className="h-4 w-4 text-primary" />
                  Tipo de Auto
                </label>
                <select
                  id="carType"
                  name="carType"
                  required
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seleccionar tipo de auto</option>
                  <option value="compact">Compacto</option>
                  <option value="midsize">Mediano</option>
                  <option value="fullsize">Grande</option>
                  <option value="suv-compact">SUV Compacta</option>
                  <option value="suv-midsize">SUV Mediana</option>
                  <option value="suv-large">SUV Grande</option>
                  <option value="minivan">Minivan</option>
                  <option value="luxury">SUV Lujo</option>
                </select>
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Obtener Cotización Gratuita
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
