import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): any;
    crearUno(usuario: Prisma.EPN_USUARIOCreateInput): any;
    actualizarUno(parametrosActualizar: {
        where: Prisma.EPN_USUARIOWhereUniqueInput;
        data: Prisma.EPN_USUARIOUpdateInput;
    }): any;
    eliminarUno(where: Prisma.EPN_USUARIOWhereUniqueInput): any;
}
