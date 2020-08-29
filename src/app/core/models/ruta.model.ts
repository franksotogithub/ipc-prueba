import { Ciudad} from './ciudad.model';
export interface Ruta {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: number;
  circuito: any;  //n-ar
  ciudad: Ciudad;
  ciudad_nombre: string;
  anio_base:string;
  estado: number;
  nro_informantes: number;
  fecha_inicio: string;
  url:string;

  detalles_cantidad:number;
  detalles:any;


}
