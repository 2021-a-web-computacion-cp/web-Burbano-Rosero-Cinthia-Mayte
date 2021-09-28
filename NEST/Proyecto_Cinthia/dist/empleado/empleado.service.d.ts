import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
export declare class EmpleadoService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchosEmpleados(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Empleado[]>;
    buscarUnEmpleado(id: number): Prisma.Prisma__EmpleadoClient<import(".prisma/client").Empleado>;
    crearUnEmpleado(empleados: Prisma.EmpleadoCreateInput): Prisma.Prisma__EmpleadoClient<import(".prisma/client").Empleado>;
    eliminarUEmpleadoo(id: number): Prisma.Prisma__EmpleadoClient<import(".prisma/client").Empleado>;
    actualizarUnEmpleado(parametrosActualizar: {
        id: number;
        data: Prisma.EmpleadoUpdateInput;
    }): Prisma.Prisma__EmpleadoClient<import(".prisma/client").Empleado>;
}
