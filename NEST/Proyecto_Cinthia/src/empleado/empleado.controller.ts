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
import { EmpleadoCrearDto } from './dto/empleado-crear.dto';
import { validate } from 'class-validator';
import { EmpleadoConsultarMuchosDto } from './dto/empleado-consultar-muchos.dto';

@Controller('empleado')
export class EmpleadoController {
  constructor(private empleadoService: EmpleadoService) {}

  @Get('lista-empleados')
  async listarEmpleado(@Res() response, @Query() parametrosConsulta) {
    const empleadoConsultarDto = new EmpleadoConsultarMuchosDto();
    empleadoConsultarDto.skip = parametrosConsulta.skip;
    empleadoConsultarDto.take = parametrosConsulta.take;
    empleadoConsultarDto.busqueda = parametrosConsulta.busqueda;
    try {
      const errores = await validate(empleadoConsultarDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        const respuesta = await this.empleadoService.buscarMuchosEmpleados(
          empleadoConsultarDto,
        );
        response.render('empleado/lista', {
          datos: { empleado: respuesta, mensaje: parametrosConsulta.mensaje },
        });
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en listar empleado' });
      throw new InternalServerErrorException('Error servidor');
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

  @Get('vista-editar/:idEmpleado')
  async vistaEditar(@Res() response, @Param() parametrosRuta) {
    try {
      const empleadoAEditar = await this.empleadoService.buscarUnEmpleado(
        +parametrosRuta.idEmpleado,
      );
      response.render('empleado/editar', {
        empleado: empleadoAEditar,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al editar');
    }
  }

  @Post('editar-empleado-formulario')
  async editarEmpleadoFormulario(@Res() response, @Body() parametrosDeCuerpo) {
    console.log(parametrosDeCuerpo);
    const empleadoCrearDto = new EmpleadoCrearDto();
    empleadoCrearDto.nombre = parametrosDeCuerpo.nombre;
    empleadoCrearDto.apellido = parametrosDeCuerpo.apellido;
    empleadoCrearDto.edad = parseInt(parametrosDeCuerpo.edad);
    empleadoCrearDto.direccion = parametrosDeCuerpo.direccion;
    empleadoCrearDto.telefono = parametrosDeCuerpo.telefono;
    empleadoCrearDto.cargo = parametrosDeCuerpo.cargo;
    if (parametrosDeCuerpo.discapacidad == 'true') {
      empleadoCrearDto.discapacidad = true;
    } else {
      empleadoCrearDto.discapacidad = false;
    }
    empleadoCrearDto.sueldo = parametrosDeCuerpo.sueldo;
    console.log(empleadoCrearDto);
    try {
      const errores = await validate(empleadoCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        await this.empleadoService.actualizarUnEmpleado({
          id: +parametrosDeCuerpo.empleadoId,
          data: empleadoCrearDto,
        });
        response.redirect('/empleado/lista-empleados');
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear empleado' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Post('crear-empleado-formulario')
  async crearBandaFormulario(@Res() response, @Body() parametrosDeCuerpo) {
    console.log(parametrosDeCuerpo);
    const empleadoCrearDto = new EmpleadoCrearDto();
    empleadoCrearDto.nombre = parametrosDeCuerpo.nombre;
    empleadoCrearDto.apellido = parametrosDeCuerpo.apellido;
    empleadoCrearDto.edad = parseInt(parametrosDeCuerpo.edad);
    empleadoCrearDto.direccion = parametrosDeCuerpo.direccion;
    empleadoCrearDto.telefono = parametrosDeCuerpo.telefono;
    empleadoCrearDto.cargo = parametrosDeCuerpo.cargo;
    if (parametrosDeCuerpo.discapacidad == 'true') {
      empleadoCrearDto.discapacidad = true;
    } else {
      empleadoCrearDto.discapacidad = false;
    }
    empleadoCrearDto.sueldo = parametrosDeCuerpo.sueldo;
    try {
      const errores = await validate(empleadoCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        const respuestaEmpleado = await this.empleadoService.crearUnEmpleado(
          empleadoCrearDto,
        );
        response.redirect(
          '/empleado/vista-crear' +
            '?mensaje=Se creo el empleado ' +
            parametrosDeCuerpo.nombre,
        );
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear empleado' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Post('eliminar-empleado/:idEmpleado')
  async eliminarEmpleado(@Res() response, @Param() parametrosRuta) {
    try {
      await this.empleadoService.eliminarUEmpleadoo(+parametrosRuta.idEmpleado);
      response.redirect(
        '/empleado/lista-empleados' +
          '?mensaje= Se eliminó el empleado' +
          parametrosRuta.nombre,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar');
    }
  }
}
