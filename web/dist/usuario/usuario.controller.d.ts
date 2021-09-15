import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    listaUsuarios(response: any): void;
    obtenerUno(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearuno(paramétrosCuerpo: any): Promise<void>;
}
