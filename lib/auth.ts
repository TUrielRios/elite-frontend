import { login as apiLogin, getCurrentAdmin } from './api';

export interface AuthUser {
    id: string;
    username: string;
    email: string;
}

// Guardar token en localStorage
export const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

// Obtener token de localStorage
export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Eliminar token (logout)
export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};

// Verificar si hay token
export const isAuthenticated = (): boolean => {
    return !!getToken();
};

// Login y guardar token
export const login = async (username: string, password: string): Promise<{
    success: boolean;
    message?: string;
    user?: AuthUser;
}> => {
    const response = await apiLogin(username, password);

    if (response.success && response.data) {
        setToken(response.data.token);
        return {
            success: true,
            user: response.data.admin
        };
    }

    return {
        success: false,
        message: response.message || 'Error al iniciar sesión'
    };
};

// Logout
export const logout = (): void => {
    removeToken();
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
};

// Verificar autenticación con el servidor
export const verifyAuth = async (): Promise<{
    isValid: boolean;
    user?: AuthUser;
}> => {
    const token = getToken();

    if (!token) {
        return { isValid: false };
    }

    const response = await getCurrentAdmin();

    if (response.success && response.data) {
        return {
            isValid: true,
            user: response.data.admin
        };
    }

    // Token inválido, limpiar
    removeToken();
    return { isValid: false };
};
