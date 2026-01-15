'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, User, ArrowRight } from 'lucide-react';
import { login } from '@/lib/auth';

const loginSchema = z.object({
    username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await login(data.username, data.password);

            if (result.success) {
                // Redirigir al panel de admin
                router.push('/admin');
            } else {
                setError(result.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error de conexión. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-8 shadow-2xl backdrop-blur-xl">
            {/* Glow effect */}
            <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#ffcddc] opacity-20 blur-[80px]" />

            <div className="relative space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Bienvenido</h2>
                    <p className="text-gray-400">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {error && (
                        <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                            <AlertDescription className="text-red-200">{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-300">Usuario</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                            <Input
                                id="username"
                                type="text"
                                placeholder="admin"
                                disabled={isLoading}
                                {...register('username')}
                                className="h-12 border-white/10 bg-white/5 pl-11 text-white placeholder:text-gray-500 focus:border-[#ffcddc] focus:ring-[#ffcddc]/20 transition-all"
                            />
                        </div>
                        {errors.username && (
                            <p className="text-sm text-red-400">{errors.username.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300">Contraseña</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                disabled={isLoading}
                                {...register('password')}
                                className="h-12 border-white/10 bg-white/5 pl-11 text-white placeholder:text-gray-500 focus:border-[#ffcddc] focus:ring-[#ffcddc]/20 transition-all"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-400">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="group relative h-12 w-full overflow-hidden bg-gradient-to-r from-[#ffcddc] to-[#1d77ef] text-black font-semibold hover:shadow-lg hover:shadow-[#ffcddc]/50 transition-all duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Iniciando sesión...
                            </>
                        ) : (
                            <>
                                <span>Iniciar Sesión</span>
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1d77ef] to-[#ffcddc] opacity-0 transition-opacity group-hover:opacity-100" />
                    </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-[#0a0a0a] px-2 text-gray-500">Acceso seguro con JWT</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
