import { Ciudad} from './ciudad.model';
import { Giro} from './giro.model';
import { RutaDetalleProducto} from './rutaDetalleProducto.model';

export interface DirectorioIPC {
  id_directorio_ipc: number;
  cod_info: string;
  cod_info_ipc: string;
  anio_base: string;
  dpto_codigo: string;
  prov_codigo: string;
  dist_codigo: string;
  dist_nombre: string;
  ubigeo: string;
  razon_social: string;
  nombre_comercial: string;
  ruc: string;
  via: string;
  direccion: string;
  nro: string;
  piso: string;
  mzna: string;
  lote: string;
  km: string;
  referencia: string;
  situacion: string;
  estado: string;
  ciudad: Ciudad;
  giro: Giro;
  productos: Array<RutaDetalleProducto>;
}

