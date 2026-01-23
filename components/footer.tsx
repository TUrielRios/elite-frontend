"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Image
              src="/logo.png"
              alt="Elite Rent A Car Miami"
              width={200}
              height={70}
              className="mb-4 h-14 w-auto"
            />
            <p className="mb-4 text-pretty text-sm text-muted-foreground">
              Elite Rent A Car Miami ofrece servicios premium de renta de autos en Miami. Más de 10 años de experiencia
              en la industria, brindando transparencia, rapidez y el mejor servicio al cliente.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("fleet")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="hover:text-primary"
                >
                  Nuestra Flota
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("services")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="hover:text-primary"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("testimonials")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="hover:text-primary"
                >
                  Testimonios
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("booking")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="hover:text-primary"
                >
                  Reservar
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold">Contacto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="https://wa.me/19545580614" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  +1 (954) 558-0614
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@eliterentmiami.com" className="hover:text-primary">
                  info@eliterentmiami.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Miami, FL 33142</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Elite Rent A Car Miami. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
