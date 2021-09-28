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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let EmpleadoService = class EmpleadoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    buscarMuchosEmpleados(parametrosBusqueda) {
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
    buscarUnEmpleado(id) {
        return this.prisma.empleado.findUnique({
            where: {
                id: id,
            },
        });
    }
    crearUnEmpleado(empleados) {
        return this.prisma.empleado.create({
            data: empleados,
        });
    }
    eliminarUEmpleadoo(id) {
        return this.prisma.empleado.delete({
            where: { id: id },
        });
    }
    actualizarUnEmpleado(parametrosActualizar) {
        return this.prisma.empleado.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }
};
EmpleadoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmpleadoService);
exports.EmpleadoService = EmpleadoService;
//# sourceMappingURL=empleado.service.js.map