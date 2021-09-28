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
const empleado_crear_dto_1 = require("./dto/empleado-crear.dto");
const class_validator_1 = require("class-validator");
const empleado_consultar_muchos_dto_1 = require("./dto/empleado-consultar-muchos.dto");
let EmpleadoController = class EmpleadoController {
    constructor(empleadoService) {
        this.empleadoService = empleadoService;
    }
    async listarEmpleado(response, parametrosConsulta) {
        const empleadoConsultarDto = new empleado_consultar_muchos_dto_1.EmpleadoConsultarMuchosDto();
        empleadoConsultarDto.skip = parametrosConsulta.skip;
        empleadoConsultarDto.take = parametrosConsulta.take;
        empleadoConsultarDto.busqueda = parametrosConsulta.busqueda;
        try {
            const errores = await (0, class_validator_1.validate)(empleadoConsultarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                const respuesta = await this.empleadoService.buscarMuchosEmpleados(empleadoConsultarDto);
                response.render('empleado/lista', {
                    datos: { empleado: respuesta, mensaje: parametrosConsulta.mensaje, },
                });
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en listar empleado' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('empleado/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async vistaEditar(response, parametrosRuta) {
        try {
            const empleadoAEditar = await this.empleadoService.buscarUnEmpleado(+parametrosRuta.idEmpleado);
            response.render('empleado/editar', {
                empleado: empleadoAEditar,
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error al editar');
        }
    }
    async editarEmpleadoFormulario(response, parametrosDeCuerpo) {
        console.log(parametrosDeCuerpo);
        const empleadoCrearDto = new empleado_crear_dto_1.EmpleadoCrearDto();
        empleadoCrearDto.nombre = parametrosDeCuerpo.nombre;
        empleadoCrearDto.apellido = parametrosDeCuerpo.apellido;
        empleadoCrearDto.edad = parseInt(parametrosDeCuerpo.edad);
        empleadoCrearDto.direccion = parametrosDeCuerpo.direccion;
        empleadoCrearDto.telefono = parametrosDeCuerpo.telefono;
        empleadoCrearDto.cargo = parametrosDeCuerpo.cargo;
        if (parametrosDeCuerpo.discapacidad == 'true') {
            empleadoCrearDto.discapacidad = true;
        }
        else {
            empleadoCrearDto.discapacidad = false;
        }
        empleadoCrearDto.sueldo = parametrosDeCuerpo.sueldo;
        console.log(empleadoCrearDto);
        try {
            const errores = await (0, class_validator_1.validate)(empleadoCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                await this.empleadoService.actualizarUnEmpleado({
                    id: +parametrosDeCuerpo.empleadoId,
                    data: empleadoCrearDto,
                });
                response.redirect('/empleado/lista-empleados');
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear empleado' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    async crearEmpleadoFormulario(response, parametrosDeCuerpo) {
        console.log(parametrosDeCuerpo);
        const empleadoCrearDto = new empleado_crear_dto_1.EmpleadoCrearDto();
        empleadoCrearDto.nombre = parametrosDeCuerpo.nombre;
        empleadoCrearDto.apellido = parametrosDeCuerpo.apellido;
        empleadoCrearDto.edad = parseInt(parametrosDeCuerpo.edad);
        empleadoCrearDto.direccion = parametrosDeCuerpo.direccion;
        empleadoCrearDto.telefono = parametrosDeCuerpo.telefono;
        empleadoCrearDto.cargo = parametrosDeCuerpo.cargo;
        if (parametrosDeCuerpo.discapacidad == 'true') {
            empleadoCrearDto.discapacidad = true;
        }
        else {
            empleadoCrearDto.discapacidad = false;
        }
        empleadoCrearDto.sueldo = parametrosDeCuerpo.sueldo;
        try {
            const errores = await (0, class_validator_1.validate)(empleadoCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                const respuestaEmpleado = await this.empleadoService.crearUnEmpleado(empleadoCrearDto);
                response.redirect('/empleado/vista-crear' +
                    '?mensaje=Se creo el empleado ' +
                    parametrosDeCuerpo.nombre);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear empleado' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    async eliminarEmpleado(response, parametrosRuta) {
        try {
            await this.empleadoService.eliminarUEmpleadoo(+parametrosRuta.idEmpleado);
            response.redirect('/empleado/lista-empleados' +
                '?mensaje= Se eliminó el empleado' +
                parametrosRuta.nombre);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error al eliminar');
        }
    }
};
__decorate([
    (0, common_1.Get)('lista-empleados'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "listarEmpleado", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmpleadoController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Get)('vista-editar/:idEmpleado'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "vistaEditar", null);
__decorate([
    (0, common_1.Post)('editar-empleado-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "editarEmpleadoFormulario", null);
__decorate([
    (0, common_1.Post)('crear-empleado-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "crearEmpleadoFormulario", null);
__decorate([
    (0, common_1.Post)('eliminar-empleado/:idEmpleado'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "eliminarEmpleado", null);
EmpleadoController = __decorate([
    (0, common_1.Controller)('empleado'),
    __metadata("design:paramtypes", [empleado_service_1.EmpleadoService])
], EmpleadoController);
exports.EmpleadoController = EmpleadoController;
//# sourceMappingURL=empleado.controller.js.map