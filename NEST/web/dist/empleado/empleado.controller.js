"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoController = void 0;
const common_1 = require("@nestjs/common");
const empleado_service_1 = require("./empleado.service");
const class_validator_1 = require("class-validator");
const json_1 = require("ts-jest/dist/utils/json");
const empleado_crear_dto_1 = require("./dto/empleado-crear.dto");
const empleado_actualizar_dto_1 = require("./dto/empleado-actualizar.dto");
const express_1 = require("express");
let EmpleadoController = class EmpleadoController {
    constructor(empleadoService) {
        this.empleadoService = empleadoService;
    }
    async listaEmpleados(response, parametrosConsulta) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('empleado/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    inicio(response) {
        response.render('inicio');
    }
    async crearEmpleadoFormualrio(response, parametrosCuerpo) {
        const empleadoCrearDto = new empleado_crear_dto_1.EmpleadoCrearDto();
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
            const errores = await class_validator_1.validate(empleadoCrearDto);
            if (errores.length > 0) {
                console.log(JSON, json_1.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros: ');
            }
            else {
                await this.empleadoService.crearUnEmpleado(empleadoCrearDto);
                response.redirect('/empleado/vista-crear' +
                    '?mensaje= Se creo el empleado' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando empleado');
        }
    }
    async actualizarEmpleado(response, parametrosCuerpo, parametrosRuta) {
        const empleadoActualizarDto = new empleado_actualizar_dto_1.EmpleadoActualizarDto();
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
            const errores = await class_validator_1.validate(empleadoActualizarDto);
            response.redirect('/empleado/actualizar-empleado/' + parametrosRuta.idEmpleado);
            if (errores.length > 0) {
                response.redirect('/empleado/actualizar-empleado/' + parametrosRuta.idEmpleado);
                console.log(JSON, json_1.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros: ');
            }
            else {
                await this.empleadoService.actualizarUnEmpleado({
                    id: +parametrosRuta.idEmpleado,
                    data: empleadoActualizarDto,
                });
                response.redirect('/empleado/lista-empleado' +
                    '?mensaje= Se actualizo el empleado ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            response.redirect('/empleado/actualizar-empleado/' + parametrosRuta.idMovie);
            throw new common_1.InternalServerErrorException('Error actualizando empleado');
        }
    }
    async obtenerUno(parametrosRuta) {
        try {
            const respuesta = await this.empleadoService.buscarUnEmpleado(+parametrosRuta.idEmpleado);
            console.log("-----------------------------");
            console.log(respuesta);
            express_1.response.render('empleado/actualizar', {
                datos: {
                    empleados: respuesta,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async eliminarEmpleado(response, parametrosRuta) {
        try {
            await this.empleadoService.eliminarUEmpleadoo(+parametrosRuta.idEmpleado);
            response.redirect('/empleado/lista-empleados' + '?mensaje=Se elimino el empleado');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
};
__decorate([
    common_1.Get('lista-empleados'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "listaEmpleados", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmpleadoController.prototype, "vistaCrear", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmpleadoController.prototype, "inicio", null);
__decorate([
    common_1.Post('crear-empleado-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "crearEmpleadoFormualrio", null);
__decorate([
    common_1.Post('actualizar-empleado-formulario/:idEmpleado'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "actualizarEmpleado", null);
__decorate([
    common_1.Get('idEmpleado'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post('eliminar-empleado/idEmpleado'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "eliminarEmpleado", null);
EmpleadoController = __decorate([
    common_1.Controller('empleado'),
    __metadata("design:paramtypes", [empleado_service_1.EmpleadoService])
], EmpleadoController);
exports.EmpleadoController = EmpleadoController;
//# sourceMappingURL=empleado.controller.js.map