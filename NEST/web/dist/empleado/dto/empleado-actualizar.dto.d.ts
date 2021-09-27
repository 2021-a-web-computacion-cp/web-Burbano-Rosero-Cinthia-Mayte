import { Decimal } from '@prisma/client/runtime';
export declare class EmpleadoActualizarDto {
    nombre: string;
    apellido: string;
    edad: number;
    direccion: string;
    telefono: string;
    discapacidad: boolean;
    cargo: string;
    fechaIngreso: string;
    sueldo: Decimal;
}
