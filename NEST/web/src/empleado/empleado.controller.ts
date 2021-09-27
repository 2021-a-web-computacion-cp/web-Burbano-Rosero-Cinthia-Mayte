import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { validate } from 'class-validator';
import { stringify } from 'ts-jest/dist/utils/json';
import { EmpleadoCrearDto } from './dto/empleado-crear.dto';
import { EmpleadoActualizarDto } from './dto/empleado-actualizar.dto';
import { response } from 'express';

@Controller('empleado')
export class EmpleadoController {
  constructor(
    // Inyeccion dependencias
    private empleadoService: EmpleadoService,
  ) {}

  @Get('lista-empleados')
  async listaEmpleados(@Res() response, @Query() parametrosConsulta) {
    try {
      const respuesta = await this.empleadoService.buscarMuchosEmpleados({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log(respuesta);
      response.render('empleado/lista', {
        datos: {
          empleados: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('empleado/crear', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }
  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }
  @Post('crear-empleado-formulario')
  async crearEmpleadoFormualrio(@Res() response, @Body() parametrosCuerpo) {
    const empleadoCrearDto = new EmpleadoCrearDto();
    empleadoCrearDto.nombre = parametrosCuerpo.nombre;
    empleadoCrearDto.apellido = parametrosCuerpo.apellido;
    empleadoCrearDto.edad = parseInt(parametrosCuerpo.edad);
    empleadoCrearDto.direccion = parametrosCuerpo.direccion;
    empleadoCrearDto.telefono = parametrosCuerpo.telefono;
    empleadoCrearDto.cargo = parametrosCuerpo.cargo;
    empleadoCrearDto.discapacidad = parametrosCuerpo.discapacidad;
    empleadoCrearDto.sueldo = parametrosCuerpo.sueldo;
    empleadoCrearDto.fechaIngreso = parametrosCuerpo.sueldo;

    try {
      const errores = await validate(empleadoCrearDto);
      if (errores.length > 0) {
        console.log(JSON, stringify(errores));
        throw new BadRequestException('No envia bien parametros: ');
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.empleadoService.crearUnEmpleado(empleadoCrearDto);
        response.redirect(
          '/empleado/vista-crear' +
            '?mensaje= Se creo el empleado' +
            parametrosCuerpo.nombre,
        );
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creando empleado');
    }
  }
  @Post('actualizar-empleado-formulario/:idEmpleado')
  async actualizarEmpleado(
    @Res() response,
    @Body() parametrosCuerpo,
    @Param() parametrosRuta,
  ) {
    const empleadoActualizarDto = new EmpleadoActualizarDto();
    empleadoActualizarDto.nombre = parametrosCuerpo.nombre;
    empleadoActualizarDto.apellido = parametrosCuerpo.apellido;
    empleadoActualizarDto.edad = parseInt(parametrosCuerpo.edad);
    empleadoActualizarDto.direccion = parametrosCuerpo.direccion;
    empleadoActualizarDto.telefono = parametrosCuerpo.telefono;
    empleadoActualizarDto.cargo = parametrosCuerpo.cargo;
    empleadoActualizarDto.discapacidad = parametrosCuerpo.discapacidad;
    empleadoActualizarDto.sueldo = parametrosCuerpo.sueldo;
    empleadoActualizarDto.fechaIngreso = parametrosCuerpo.sueldo;
    try {
      const errores = await validate(empleadoActualizarDto);
      response.redirect('/empleado/actualizar-empleado/' + parametrosRuta.idEmpleado);

      if (errores.length > 0) {
        response.redirect('/empleado/actualizar-empleado/' + parametrosRuta.idEmpleado);
        console.log(JSON, stringify(errores));
        throw new BadRequestException('No envia bien parametros: ');
      } else {
        await this.empleadoService.actualizarUnEmpleado({
          id: +parametrosRuta.idEmpleado,
          data: empleadoActualizarDto,
        });
        response.redirect(
          '/empleado/lista-empleado' +
            '?mensaje= Se actualizo el empleado ' +
            parametrosCuerpo.nombre,
        );
      }
    } catch (error) {
      response.redirect('/empleado/actualizar-empleado/' + parametrosRuta.idMovie);
      throw new InternalServerErrorException('Error actualizando empleado');
    }
  }
@Get('idEmpleado')
  async obtenerUno(@Param() parametrosRuta) {
    try {
      const respuesta = await this.empleadoService.buscarUnEmpleado(+parametrosRuta.idEmpleado);
      console.log("-----------------------------");
      console.log(respuesta);
      response.render('empleado/actualizar', {
        datos: {
          empleados: respuesta,
        },
      });
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
  }

@Post('eliminar-empleado/idEmpleado')
async eliminarEmpleado(@Res() response, @Param() parametrosRuta) {
  try {
    await this.empleadoService.eliminarUEmpleadoo(+parametrosRuta.idEmpleado);
    response.redirect('/empleado/lista-empleados' + '?mensaje=Se elimino el empleado');
  }
  catch (error) {
    console.error(error);
    throw new InternalServerErrorException('Error');
  }
}
}
