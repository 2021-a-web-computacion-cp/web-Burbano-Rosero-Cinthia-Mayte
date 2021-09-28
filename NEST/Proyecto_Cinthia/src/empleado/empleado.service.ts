import { Injectable } from '@nestjs/common';
// @ts-ignore
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpleadoService {
  constructor(private prisma: PrismaService) {}

  buscarMuchosEmpleados(parametrosBusqueda: {
    skip?: number; // registros que te saltes 0 10 20
    take?: number; // registros tomas 10 10 10
    busqueda?: string; // Adr
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
        OR: [
          { nombre: { contains: parametrosBusqueda.busqueda } },
          { apellido: { contains: parametrosBusqueda.busqueda } },
          ],
      }
      : {};
    return this.prisma.empleado.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  buscarUnEmpleado(id: number) {
    return this.prisma.empleado.findUnique({
      where: {
        id: id,
      },
    });
  }
  crearUnEmpleado(empleados: Prisma.EmpleadoCreateInput) {
    return this.prisma.empleado.create({
      data: empleados,
    });
  }
  eliminarUEmpleadoo(id: number) {
    return this.prisma.empleado.delete({
      where: { id: id },
    });
  }
  actualizarUnEmpleado(parametrosActualizar:{
    id: number;
    data: Prisma.EmpleadoUpdateInput;
  }) {
    return this.prisma.empleado.update({
      data: parametrosActualizar.data,
      where: {
        id: parametrosActualizar.id,
      },
    });
  }
}
