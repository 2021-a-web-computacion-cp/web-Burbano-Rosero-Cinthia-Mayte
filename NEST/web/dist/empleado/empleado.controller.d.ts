import { EmpleadoService } from './empleado.service';
export declare class EmpleadoController {
    private empleadoService;
    constructor(empleadoService: EmpleadoService);
    listaEmpleados(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    inicio(response: any): void;
    crearEmpleadoFormualrio(response: any, parametrosCuerpo: any): Promise<void>;
    actualizarEmpleado(response: any, parametrosCuerpo: any, parametrosRuta: any): Promise<void>;
    obtenerUno(parametrosRuta: any): Promise<void>;
    eliminarEmpleado(response: any, parametrosRuta: any): Promise<void>;
}
