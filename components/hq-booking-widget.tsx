"use client"

import { useEffect, useRef } from "react"

export function HQBookingWidget() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Check if script is already added to avoid duplicates
        if (containerRef.current.querySelector('script[src*="hqrentals"]')) return

        const script = document.createElement("script")
        script.src = "https://elite-miami.us4.hqrentals.app/public/car-rental/integrations/assets/integrator"
        script.async = true

        // Append script directly to the container div
        containerRef.current.appendChild(script)

        return () => {
            // Optional: Cleanup if needed, though usually external scripts manage their own DOM
            if (containerRef.current) {
                const scriptTag = containerRef.current.querySelector('script')
                if (scriptTag) scriptTag.remove()
            }
        }
    }, [])

    return (
        <section id="booking" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            Reserva Tu Auto
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Completa el formulario y obtén tu cotización al instante
                        </p>
                    </div>

                    {/* HQ Rental Software Integration */}
                    <div ref={containerRef} className="rounded-2xl bg-card p-6 shadow-lg md:p-8 min-h-[400px]">
                        <div
                            className="hq-rental-software-integration"
                            data-integrator_link="https://elite-miami.us4.hqrentals.app/public/car-rental/integrations"
                            data-brand="ihqgczrb-sunp-obkd-xjvv-f036jqvaccr8"
                            data-snippet="reservations"
                            data-skip_language=""
                            data-rate_type_uuid=""
                            data-referral=""
                            data-enable_auto_language_update=""
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
