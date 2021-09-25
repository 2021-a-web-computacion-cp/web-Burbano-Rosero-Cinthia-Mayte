import { PrismaService } from '../prisma.service';
export declare class EmpleadoService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchosEmpleados(parametrosBusqueda: any): any;
    buscarUno(id: any): any;
}
