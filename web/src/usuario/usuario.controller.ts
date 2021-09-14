import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put, Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import validate = WebAssembly.validate;
import get = Reflect.get;

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
  constructor(
    // Inyeccion dependencias
    private usuarioService: UsuarioService,
  ) {}
  @Get('lista-usuarios')
  listaUsuarios(
    @Res()response
  ){
    response.render('inicio')
  }
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

  @Post()
  async crearuno(@Body() paramétrosCuerpo) {
    const usuarioCrearDto = new UsuarioCrearDto();
    usuarioCrearDto.nombre = paramétrosCuerpo.nombre;
    usuarioCrearDto.apellido = paramétrosCuerpo.apellido;
    usuarioCrearDto.fechaCreacion = paramétrosCuerpo.fechaCreacion;

    try {
      const errores = await validate(usuarioCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien parámetros');
      } else {
        return this.usuarioService.crearUno(usuarioCrearDto);
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'No envia bien los parámetros' });
      throw new InternalServerErrorException('Error servidor');
    }
  }




}
