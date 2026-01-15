import { LoginForm } from '@/components/admin/login-form';
import { Car } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">
            {/* Gradiente de fondo animado */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0520] to-black" />

            {/* Efectos de luz */}
            <div className="absolute top-0 -left-40 h-80 w-80 rounded-full bg-[#ffcddc] opacity-15 blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-[#1d77ef] opacity-10 blur-[120px] animate-pulse delay-700" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ffcddc] to-[#1d77ef] p-3 shadow-lg shadow-[#ffcddc]/30">
                        <Car className="h-8 w-8 text-black" />
                    </div>
                    <h1 className="mb-2 text-4xl font-bold">
                        <span className="bg-gradient-to-r from-white via-[#1d77ef] to-[#ffcddc] bg-clip-text text-transparent">
                            Elite Car Rental
                        </span>
                    </h1>
                    <p className="text-gray-400">Panel de Administración</p>
                </div>

                <LoginForm />

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-gray-500">
                    © 2026 Elite Car Rental. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
}
