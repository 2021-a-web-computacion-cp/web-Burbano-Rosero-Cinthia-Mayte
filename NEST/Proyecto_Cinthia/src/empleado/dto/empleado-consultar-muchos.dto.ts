import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class EmpleadoConsultarMuchosDto {
  @IsInt()
  @IsOptional()
  skip: number;

  @IsInt()
  @IsOptional()
  take: number;

  @MaxLength(10)
  @IsString()
  @IsOptional()
  busqueda: string;
}
