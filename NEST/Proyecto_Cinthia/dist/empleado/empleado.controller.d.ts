import { EmpleadoService } from './empleado.service';
export declare class EmpleadoController {
    private empleadoService;
    constructor(empleadoService: EmpleadoService);
    listarEmpleado(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    editarEmpleadoFormulario(response: any, parametrosDeCuerpo: any): Promise<void>;
    crearBandaFormulario(response: any, parametrosDeCuerpo: any): Promise<void>;
    eliminarEmpleado(response: any, parametrosRuta: any): Promise<void>;
}
