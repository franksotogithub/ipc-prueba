import { Ruta } from './ruta.model';
import { Informante } from './informante.model';
import { Investigador } from './investigador.model';
export interface ProgramacionRuta {
  id: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  ruta: Ruta;
  investigador: Investigador;
  cant_informantes: number;
  informantes: Array<Informante>;
}
