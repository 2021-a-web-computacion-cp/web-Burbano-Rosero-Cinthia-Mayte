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
exports.EmpleadoActualizarDto = void 0;
const class_validator_1 = require("class-validator");
const runtime_1 = require("@prisma/client/runtime");
class EmpleadoActualizarDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(10),
    __metadata("design:type", String)
], EmpleadoActualizarDto.prototype, "nombre", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(10),
    __metadata("design:type", String)
], EmpleadoActualizarDto.prototype, "apellido", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(3),
    __metadata("design:type", Number)
], EmpleadoActualizarDto.prototype, "edad", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(10),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], EmpleadoActualizarDto.prototype, "direccion", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(7),
    class_validator_1.MaxLength(10),
    __metadata("design:type", String)
], EmpleadoActualizarDto.prototype, "telefono", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], EmpleadoActualizarDto.prototype, "discapacidad", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(16),
    class_validator_1.MaxLength(30),
    __metadata("design:type", String)
], EmpleadoActualizarDto.prototype, "cargo", void 0);
__decorate([
    class_validator_1.IsEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", String)
], EmpleadoActualizarDto.prototype, "fechaIngreso", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDecimal(),
    class_validator_1.MinLength(10),
    class_validator_1.MaxLength(50),
    __metadata("design:type", runtime_1.Decimal)
], EmpleadoActualizarDto.prototype, "sueldo", void 0);
exports.EmpleadoActualizarDto = EmpleadoActualizarDto;
//# sourceMappingURL=empleado-actualizar.dto.js.map