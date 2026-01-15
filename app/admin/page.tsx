'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, LogOut, Car } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { VehicleForm } from '@/components/admin/vehicle-form';
import { VehicleList } from '@/components/admin/vehicle-list';
import { fetchVehicles, type Vehicle } from '@/lib/api';

export default function AdminPage() {
    const { user, loading: authLoading, logout } = useAuth();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    const loadVehicles = async () => {
        setLoadingVehicles(true);
        const result = await fetchVehicles();
        if (result.success && result.data) {
            setVehicles(result.data);
        }
        setLoadingVehicles(false);
    };

    useEffect(() => {
        if (!authLoading) {
            loadVehicles();
        }
    }, [authLoading]);

    const handleAddNew = () => {
        setSelectedVehicle(null);
        setFormOpen(true);
    };

    const handleEdit = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setFormOpen(true);
    };

    const handleFormSuccess = () => {
        loadVehicles();
    };

    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-pulse text-lg">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <Car className="h-6 w-6" />
                        <h1 className="text-xl font-bold">Elite Car Rental - Admin</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            Bienvenido, <span className="font-medium text-foreground">{user?.username}</span>
                        </span>
                        <Button variant="outline" size="sm" onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 space-y-4">
                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Vehículos</CardTitle>
                                <Car className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{vehicles.length}</div>
                                <p className="text-xs text-muted-foreground">Registrados en el sistema</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Estado</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">Operativo</div>
                                <p className="text-xs text-muted-foreground">Sistema funcionando correctamente</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Acciones Rápidas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={handleAddNew} className="w-full">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Agregar Vehículo
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Section Title */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Gestión de Vehículos</h2>
                            <p className="text-muted-foreground">
                                Administra los vehículos disponibles para renta
                            </p>
                        </div>
                        <Button onClick={handleAddNew}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Vehículo
                        </Button>
                    </div>
                </div>

                {/* Vehicle List */}
                <VehicleList
                    vehicles={vehicles}
                    loading={loadingVehicles}
                    onEdit={handleEdit}
                    onRefresh={loadVehicles}
                />
            </main>

            {/* Vehicle Form Dialog */}
            <VehicleForm
                vehicle={selectedVehicle}
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSuccess={handleFormSuccess}
            />
        </div>
    );
}
