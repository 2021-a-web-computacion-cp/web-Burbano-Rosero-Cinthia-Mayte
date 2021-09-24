import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpleadoService {
  constructor(
    // Inyectar dependencias
    private prisma: PrismaService,
  ) {}
  buscarMuchosEmpleados(parametrosBusqueda) {
    const or = parametrosBusqueda.busqueda
        ? {
          OR: [
            { nombre: { contains: parametrosBusqueda.busqueda } },
            { apellido: { contains: parametrosBusqueda.busqueda } },
            { edad: { contains: parseInt(parametrosBusqueda.busqueda) } },
          ],
        } : {};
    return this.prisma..findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }
  buscarUno(id) {
    return this.prisma.pelicula.findUnique({
      where: { id: id, },
    });
  }


}
