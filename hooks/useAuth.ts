'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAuth, logout, type AuthUser } from '@/lib/auth';

export function useAuth(redirectTo: string = '/login') {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const result = await verifyAuth();

            if (result.isValid && result.user) {
                setUser(result.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                router.push(redirectTo);
            }

            setLoading(false);
        };

        checkAuth();
    }, [router, redirectTo]);

    const handleLogout = () => {
        logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return {
        user,
        loading,
        isAuthenticated,
        logout: handleLogout
    };
}
