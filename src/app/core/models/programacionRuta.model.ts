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
  nombre: string;
  descripcion :  string;
  circuito : string;
  ciudad: string;
  ciudad_nombre: string;
  
  informantes: Array<Informante>;
}
/*
"nombre": "Ruta 02",
"descripcion": "La Molina 6-9, Los Constructores",
"tipo": "1",
"circuito": 2136,
"ciudad": "16",
"ciudad_nombre": "LIMA METROPOLITANA",*/