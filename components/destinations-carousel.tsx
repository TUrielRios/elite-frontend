"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const destinations = [
    {
        src: "/miami-1.jpg",
        alt: "Vista panorámica de Miami Beach con edificios modernos y playa",
        title: "Miami Beach",
    },
    {
        src: "/miami-2.png",
        alt: "Autopista de Miami con rascacielos al fondo",
        title: "Downtown Miami",
    },
    {
        src: "/miami-3.png",
        alt: "Ocean Drive en South Beach con palmeras",
        title: "South Beach",
    },
]

export function DestinationsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % destinations.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const goToNext = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => (prev + 1) % destinations.length)
    }

    const goToPrevious = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length)
    }

    const goToSlide = (index: number) => {
        setIsAutoPlaying(false)
        setCurrentIndex(index)
    }

    return (
        <section className="relative w-full overflow-hidden bg-background py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Descubre Miami & Orlando
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Los mejores destinos de Florida te esperan
                    </p>
                </div>

                <div className="relative mx-auto max-w-6xl">
                    {/* Carousel Container */}
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl">
                        {destinations.map((destination, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                                        ? "translate-x-0 opacity-100"
                                        : index < currentIndex
                                            ? "-translate-x-full opacity-0"
                                            : "translate-x-full opacity-0"
                                    }`}
                            >
                                <Image
                                    src={destination.src}
                                    alt={destination.alt}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <h3 className="text-2xl font-bold md:text-3xl">{destination.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
                        aria-label="Siguiente imagen"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>

                    {/* Indicators */}
                    <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
                        {destinations.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all ${index === currentIndex
                                        ? "w-8 bg-primary"
                                        : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                                    }`}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
