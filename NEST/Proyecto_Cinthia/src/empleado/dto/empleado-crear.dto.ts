import {
  IsBoolean, IsDate, IsDecimal, IsEmpty,
  IsInt,
  IsNotEmpty, IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Decimal } from '@prisma/client/runtime';

export class EmpleadoCrearDto {
  @IsNotEmpty() // requerido
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  nombre: string;

  @IsNotEmpty() // requerido
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  apellido: string;

  @IsNotEmpty() // requerido
  @IsNumber()
  edad: number;

  @IsNotEmpty() // requerido
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  direccion: string;

  @IsNotEmpty() // requerido
  @IsString()
  @MinLength(7)
  @MaxLength(10)
  telefono: string;

  @IsNotEmpty() // requerido
  @IsBoolean()
  discapacidad: boolean;

  @IsNotEmpty() // requerido
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  cargo: string;


  @IsNotEmpty() // requerido
  @IsDecimal()
  sueldo: Decimal;
}
