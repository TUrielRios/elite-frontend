'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, X } from 'lucide-react';
import { createVehicle, updateVehicle, type Vehicle } from '@/lib/api';
import Image from 'next/image';

const vehicleSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    passengers: z.number().min(1).max(20),
    luggage: z.number().min(0).max(20),
    hand_luggage: z.number().min(0).max(20),
    features: z.string().optional()
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
    vehicle?: Vehicle | null;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function VehicleForm({ vehicle, open, onClose, onSuccess }: VehicleFormProps) {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(vehicle?.image_url || null);

    const isEditing = !!vehicle;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<VehicleFormValues>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            name: vehicle?.name || '',
            passengers: vehicle?.passengers || 4,
            luggage: vehicle?.luggage || 2,
            hand_luggage: vehicle?.hand_luggage || 2,
            features: vehicle?.features?.join(', ') || ''
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const onSubmit = async (data: VehicleFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            // Crear FormData
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('passengers', data.passengers.toString());
            formData.append('luggage', data.luggage.toString());
            formData.append('hand_luggage', data.hand_luggage.toString());

            // Procesar features
            if (data.features) {
                const featuresArray = data.features.split(',').map(f => f.trim()).filter(f => f);
                formData.append('features', JSON.stringify(featuresArray));
            } else {
                formData.append('features', JSON.stringify([]));
            }

            // Agregar imagen si hay
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const result = isEditing
                ? await updateVehicle(vehicle.id, formData)
                : await createVehicle(formData);

            if (result.success) {
                reset();
                setImageFile(null);
                setImagePreview(null);
                onSuccess();
                onClose();
            } else {
                setError(result.message || 'Error al guardar vehículo');
            }
        } catch (err) {
            setError('Error de conexión. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        reset();
        setError(null);
        setImageFile(null);
        setImagePreview(vehicle?.image_url || null);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Modifica los datos del vehículo' : 'Completa la información del nuevo vehículo'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Imagen */}
                    <div className="space-y-2">
                        <Label>Imagen del Vehículo</Label>
                        {imagePreview ? (
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                <Image
                                    src={imagePreview.startsWith('http') ? imagePreview : imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute right-2 top-2"
                                    onClick={removeImage}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/20 hover:bg-secondary/30">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-semibold">Click para subir</span> o arrastra aquí
                                        </p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (MAX. 5MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={isLoading}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Nombre */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Vehículo *</Label>
                        <Input
                            id="name"
                            placeholder="Ej: Auto Compacto"
                            disabled={isLoading}
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Grid de capacidades */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="passengers">Pasajeros *</Label>
                            <Input
                                id="passengers"
                                type="number"
                                min="1"
                                max="20"
                                disabled={isLoading}
                                {...register('passengers', { valueAsNumber: true })}
                            />
                            {errors.passengers && (
                                <p className="text-sm text-destructive">{errors.passengers.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="luggage">Equipaje *</Label>
                            <Input
                                id="luggage"
                                type="number"
                                min="0"
                                max="20"
                                disabled={isLoading}
                                {...register('luggage', { valueAsNumber: true })}
                            />
                            {errors.luggage && (
                                <p className="text-sm text-destructive">{errors.luggage.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hand_luggage">Equipaje de Mano *</Label>
                            <Input
                                id="hand_luggage"
                                type="number"
                                min="0"
                                max="20"
                                disabled={isLoading}
                                {...register('hand_luggage', { valueAsNumber: true })}
                            />
                            {errors.hand_luggage && (
                                <p className="text-sm text-destructive">{errors.hand_luggage.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Características */}
                    <div className="space-y-2">
                        <Label htmlFor="features">Características (separadas por comas)</Label>
                        <Textarea
                            id="features"
                            placeholder="Ej: Económico, Fácil de estacionar, Bajo consumo"
                            disabled={isLoading}
                            {...register('features')}
                            rows={3}
                        />
                        <p className="text-xs text-muted-foreground">
                            Ingresa las características separadas por comas
                        </p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                isEditing ? 'Actualizar Vehículo' : 'Crear Vehículo'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
