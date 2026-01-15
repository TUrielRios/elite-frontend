const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Tipos de respuesta
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface Vehicle {
    id: string;
    name: string;
    image_url: string | null;
    passengers: number;
    luggage: number;
    hand_luggage: number;
    features: string[];
    created_at: string;
    updated_at: string;
}

export interface Admin {
    id: string;
    username: string;
    email: string;
}

// Helper para manejar errores
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || 'Error en la solicitud',
                error: data.error
            };
        }

        return data;
    }

    if (!response.ok) {
        return {
            success: false,
            message: 'Error en la solicitud'
        };
    }

    return { success: true };
};

// Obtener token de localStorage
const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Headers con autenticación
const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    };
};

// ========== AUTH ==========

export const login = async (username: string, password: string): Promise<ApiResponse<{ token: string; admin: Admin }>> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        return await handleResponse(response);
    } catch (error) {
        return {
            success: false,
            message: 'Error de conexión con el servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

export const getCurrentAdmin = async (): Promise<ApiResponse<{ admin: Admin }>> => {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        return {
            success: false,
            message: 'Error de conexión con el servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

// ========== VEHICLES ==========

export const fetchVehicles = async (): Promise<ApiResponse<Vehicle[]>> => {
    try {
        const response = await fetch(`${API_URL}/vehicles`);
        return await handleResponse(response);
    } catch (error) {
        return {
            success: false,
            message: 'Error al obtener vehículos',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

export const fetchVehicleById = async (id: string): Promise<ApiResponse<Vehicle>> => {
    try {
        const response = await fetch(`${API_URL}/vehicles/${id}`);
        return await handleResponse(response);
    } catch (error) {
        return {
            success: false,
            message: 'Error al obtener vehículo',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

export const createVehicle = async (formData: FormData): Promise<ApiResponse<Vehicle>> => {
    try {
        const token = getToken();
        const response = await fetch(`${API_URL}/vehicles`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
                // No incluir Content-Type para FormData
            },
            body: formData
        });

        return await handleResponse(response);
    } catch (error) {
        return {
            success: false,
            message: 'Error al crear vehículo',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

export const updateVehicle = async (id: string, formData: FormData): Promise<ApiResponse<Vehicle>> => {
    try {
        const token = getToken();
        const response = await fetch(`${API_URL}/vehicles/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: formData
        });

        return await handleResponse(response);
    } catch (error) {
        return {
            success: false,
            message: 'Error al actualizar vehículo',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

export const deleteVehicle = async (id: string): Promise<ApiResponse<void>> => {
    try {
        const response = await fetch(`${API_URL}/vehicles/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        return {
            success: false,
            message: 'Error al eliminar vehículo',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

// Helper para construir la URL de una imagen
export const getImageUrl = (imageUrl: string | null): string => {
    if (!imageUrl) return '/placeholder.svg';
    if (imageUrl.startsWith('http')) return imageUrl;
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}${imageUrl}`;
};

