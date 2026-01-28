import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HQBookingWidget } from "@/components/hq-booking-widget"
import { ServicesSection } from "@/components/services-section"
import { FleetSection } from "@/components/fleet-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { MapSection } from "@/components/map-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HQBookingWidget />
        <ServicesSection />
        <FleetSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
        <MapSection />
      </main>
      <Footer />
    </div>
  )
}
