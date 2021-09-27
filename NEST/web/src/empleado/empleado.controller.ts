import { Controller } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';

@Controller('empleado')
export class EmpleadoController {
  constructor(
    // Inyeccion dependencias
    private empleadoService: EmpleadoService,
  ) {}
}
