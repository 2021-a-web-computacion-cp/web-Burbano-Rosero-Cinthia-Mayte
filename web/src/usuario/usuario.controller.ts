import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put, Query, Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';

import validate = WebAssembly.validate;
import get = Reflect.get;
import { Prisma } from '@prisma/client';

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
  constructor(
    // Inyeccion dependencias
    private usuarioService: UsuarioService,
  ) {}
  @Get('inicio')
  inicio(
    @Res()response
  ){
    response.render('inicio');
  }

  @Get('lista-usuarios')
  async listaUsuarios(@Res()response
                ,@Query() parametrosConsulta
  ){
    try {
      //validar parametros de consulta con un dto
      const respuesta = await this.usuarioService.buscarMuchos({

        skip: parametrosConsulta.skip? +parametrosConsulta.skip:undefined,
            take: parametrosConsulta.take? +parametrosConsulta.take:undefined,
          busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda:undefined,
      });
      console.log(respuesta)
      response.render('usuario/lista',{
        datos:{
          usuarios:respuesta,
        },
      });
    }catch (error) {
      throw new InternalServerErrorException('Error del servidor')

    }

  }

  @Get('vista-crear')
  vistaCrear(@Res() response){
    response.render("usuario/crear.ejs");
  }

  @Get(':idUsuario')
  obtenerUno(@Param() parametrosRuta) {
    return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
  }

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
  /*
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

 /* @Post()
  async crearUno(@Body() bodyParams) {
    const usuarioCrearDto = new UsuarioCrearDto();
    usuarioCrearDto.nombre = bodyParams.nombre;
    usuarioCrearDto.apellido = bodyParams.apellido;
    usuarioCrearDto.fechaCreacion = bodyParams.fechaCreacion;
    try{
      const errores = validate(usuarioCrearDto);
      if(errores.length>0){
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envía bien los parámetros')
      }else{
        return this.usuarioService.crearUno(usuarioCrearDto);
      }
    }catch(error) {
      console.error({error: error, mensaje: 'Errores en crear usuario'});
      throw new InternalServerErrorException('Error en el servidor')
    }
  }

*/


}
