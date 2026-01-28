'use client';

export function MapSection() {
    const address = "3990 NW 26th Street, Miami, FL 33142";
    // Google Maps embed URL para la ubicación específica
    const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.234567890123!2d-80.25345678901234!3d25.801234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6f1234567890%3A0x1234567890abcdef!2s3990%20NW%2026th%20St%2C%20Miami%2C%20FL%2033142!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus";

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                        Encuéntranos
                    </h2>
                    <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
                        Visítanos en nuestra oficina en Miami
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
                        <iframe
                            src={googleMapsUrl}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Elite Rent A Car Location"
                            className="w-full"
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <p className="mb-2 text-lg font-semibold text-secondary">{address}</p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent transition-colors hover:text-accent/80"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Abrir en Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
