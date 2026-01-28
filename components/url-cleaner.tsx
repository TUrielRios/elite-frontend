'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function URLCleanerContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const cleanURL = () => {
            const currentUrl = new URL(window.location.href);

            // Verificar si existe el parámetro ssid
            if (currentUrl.searchParams.has('ssid')) {
                // Eliminar el parámetro ssid
                currentUrl.searchParams.delete('ssid');

                // Construir la nueva URL
                const newUrl = currentUrl.pathname +
                    (currentUrl.searchParams.toString() ? '?' + currentUrl.searchParams.toString() : '');

                // Reemplazar la URL sin recargar la página
                window.history.replaceState({}, '', newUrl);
            }
        };

        // Limpiar inmediatamente
        cleanURL();

        // Observar cambios en la URL (para scripts externos que la modifiquen)
        const observer = new MutationObserver(cleanURL);
        observer.observe(document, { subtree: true, childList: true });

        // También escuchar eventos de cambio de URL
        const handlePopState = () => cleanURL();
        window.addEventListener('popstate', handlePopState);

        // Intervalo para verificar periódicamente (por si el script externo cambia la URL)
        const interval = setInterval(cleanURL, 500);

        return () => {
            observer.disconnect();
            window.removeEventListener('popstate', handlePopState);
            clearInterval(interval);
        };
    }, [searchParams, pathname]);

    return null;
}

export function URLCleaner() {
    return (
        <Suspense fallback={null}>
            <URLCleanerContent />
        </Suspense>
    );
}
