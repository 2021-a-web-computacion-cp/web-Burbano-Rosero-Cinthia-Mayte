import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    inicio(response: any): void;
    listaUsuarios(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any): void;
    obtenerUno(parametrosRuta: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    actualizarUno(params: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
