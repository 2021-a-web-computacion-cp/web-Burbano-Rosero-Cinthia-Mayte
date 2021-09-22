import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(
    // Inyectar dependencias
    private prisma: PrismaService,
  ) {
  }

  buscarUno(id: number) {
    return this.prisma.ePN_USUARIO.findUnique({
      where: {
        id: id,
      },
    });
  }

  crearUno(usuario: Prisma.EPN_USUARIOCreateInput) {
    return this.prisma.ePN_USUARIO.create({
      data: usuario,
    });
  }

  actualizarUno(parametrosActualizar: {
    where: Prisma.EPN_USUARIOWhereUniqueInput;
    data: Prisma.EPN_USUARIOUpdateInput;
  }) {
    return this.prisma.ePN_USUARIO.update({
      data: parametrosActualizar.data,
      where: parametrosActualizar.where,
    });
  }

  buscarMuchos(
    parametrosBusqueda: {
      skip?: number;
      take?: number;
      busqueda?: string;
      //orderBy?: Prisma.EPN_UsuarioOrder;
    }
  ){
    const  or = parametrosBusqueda.busqueda? {
      OR: [
        {nombre:{contains: parametrosBusqueda.busqueda}},
        {apellido:{contains: parametrosBusqueda.busqueda}},
      ],
    }:{};
    this.prisma.ePN_USUARIO.findMany(
      {
        where: or,
        take:Number(parametrosBusqueda.take) || undefined,
        skip:Number(parametrosBusqueda.take) || undefined,
      }
    );
  }

  eliminarUno(id: number) {
    return this.prisma.ePN_USUARIO.delete({
      where: { id: id },
    });
  }
}
