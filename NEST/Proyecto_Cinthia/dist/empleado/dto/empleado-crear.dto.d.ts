import { Decimal } from '@prisma/client/runtime';
export declare class EmpleadoCrearDto {
    nombre: string;
    apellido: string;
    edad: number;
    direccion: string;
    telefono: string;
    discapacidad: boolean;
    cargo: string;
    sueldo: Decimal;
}
