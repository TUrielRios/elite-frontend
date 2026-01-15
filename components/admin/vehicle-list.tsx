'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Pencil, Trash2, Users, Luggage, Briefcase, Loader2 } from 'lucide-react';
import { deleteVehicle, getImageUrl, type Vehicle } from '@/lib/api';
import Image from 'next/image';

interface VehicleListProps {
    vehicles: Vehicle[];
    loading: boolean;
    onEdit: (vehicle: Vehicle) => void;
    onRefresh: () => void;
}

export function VehicleList({ vehicles, loading, onEdit, onRefresh }: VehicleListProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteClick = (vehicle: Vehicle) => {
        setVehicleToDelete(vehicle);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!vehicleToDelete) return;

        setDeleting(true);
        setError(null);

        try {
            const result = await deleteVehicle(vehicleToDelete.id);

            if (result.success) {
                setDeleteDialogOpen(false);
                setVehicleToDelete(null);
                onRefresh();
            } else {
                setError(result.message || 'Error al eliminar vehículo');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center space-y-2">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Cargando vehículos...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (vehicles.length === 0) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center space-y-2">
                        <p className="text-lg font-medium">No hay vehículos</p>
                        <p className="text-sm text-muted-foreground">
                            Agrega tu primer vehículo haciendo click en el botón de arriba
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Vehículos Registrados</CardTitle>
                    <CardDescription>Total: {vehicles.length} vehículo{vehicles.length !== 1 ? 's' : ''}</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-20">Imagen</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead className="text-center">Capacidad</TableHead>
                                    <TableHead>Características</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vehicles.map((vehicle) => (
                                    <TableRow key={vehicle.id}>
                                        <TableCell>
                                            <div className="relative h-16 w-20 overflow-hidden rounded-md bg-muted">
                                                <Image
                                                    src={getImageUrl(vehicle.image_url)}
                                                    alt={vehicle.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{vehicle.name}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-3 justify-center text-sm">
                                                <div className="flex items-center gap-1" title="Pasajeros">
                                                    <Users className="h-4 w-4" />
                                                    <span>{vehicle.passengers}</span>
                                                </div>
                                                <div className="flex items-center gap-1" title="Equipaje">
                                                    <Luggage className="h-4 w-4" />
                                                    <span>{vehicle.luggage}</span>
                                                </div>
                                                <div className="flex items-center gap-1" title="Equipaje de mano">
                                                    <Briefcase className="h-4 w-4" />
                                                    <span>{vehicle.hand_luggage}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {vehicle.features?.slice(0, 3).map((feature, idx) => (
                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                        {feature}
                                                    </Badge>
                                                ))}
                                                {vehicle.features && vehicle.features.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{vehicle.features.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => onEdit(vehicle)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => handleDeleteClick(vehicle)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Dialog de confirmación de eliminación */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará permanentemente el vehículo "
                            {vehicleToDelete?.name}" de la base de datos.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={deleting}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Eliminando...
                                </>
                            ) : (
                                'Eliminar'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
