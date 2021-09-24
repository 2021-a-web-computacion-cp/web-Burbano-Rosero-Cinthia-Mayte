import {Module} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {EmpleadoService} from "./empleado.service";
import {EmpleadoController} from "./empleado.controller";

@Module ({
    imports: [
    // modulos importados
],
    providers: [
    // declaramos servicio
    EmpleadoService,
    PrismaService,
],
    exports: [
    // exportamos servicio
        EmpleadoService,
],
    controllers: [
    // declaramos controladores
        EmpleadoController,
],
})
export class EmpleadoModule {}

