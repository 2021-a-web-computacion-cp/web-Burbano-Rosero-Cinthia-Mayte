import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
  constructor(
    // Inyeccion dependencias
    private usuarioService: UsuarioService,
  ) {}

  @Get(':idUsuario')
  obtenerUno(@Param() parametrosRuta) {
    return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
  }
/*
  @Put('/:idUsuario/:apellido/:nombre')
  actualizarUno(@Param() params) {
    const objWhere: Prisma.EPN_USUARIOWhereUniqueInput = {
      id: Number(params.idUsuario),
    };
    const objetoUsuarioUpdate: Prisma.EPN_USUARIOUpdateInput = {
      apellido: params.apellido,
      nombre: params.nombre,
    };

    const parametrosActualizar = {
      where: objWhere,
      data: objetoUsuarioUpdate,
    };
    return this.usuarioService.actualizarUno(parametrosActualizar);
  }

  @Post()
  crearUno(@Body() bodyParams) {
    const objUsuario: Prisma.EPN_USUARIOCreateInput = {
      apellido: bodyParams.apellido,
      nombre: bodyParams.nombre,
    };

    return this.usuarioService.crearUno(objUsuario);
  }
  @Delete(':idUsuario')
  eliminarUno(@Param() parametro) {
    const objUsuario: Prisma.EPN_USUARIOWhereUniqueInput = {
      id: Number(parametro.idUsuario),
    };
    this.usuarioService.eliminarUno(objUsuario) ;
    return "se elimino el usuario"
  }*/
}
