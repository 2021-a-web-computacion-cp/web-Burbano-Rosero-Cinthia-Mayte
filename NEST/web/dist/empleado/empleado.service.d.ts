import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class EmpleadoService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchosEmpleados(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").EPN_USUARIO[]>;
    buscarUnEmpleado(id: number): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
