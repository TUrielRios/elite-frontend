'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function URLCleaner() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Verificar si existe el parámetro ssid
        if (searchParams.has('ssid')) {
            // Crear nuevos parámetros sin ssid
            const params = new URLSearchParams(searchParams.toString());
            params.delete('ssid');

            // Construir la nueva URL
            const newUrl = params.toString()
                ? `${pathname}?${params.toString()}`
                : pathname;

            // Reemplazar la URL sin recargar la página
            window.history.replaceState({}, '', newUrl);
        }
    }, [searchParams, pathname, router]);

    return null;
}
