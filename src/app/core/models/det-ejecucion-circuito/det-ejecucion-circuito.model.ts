import { DetEjecucionCircuitoResquest } from './det-ejecucion-circuito.request';

export class DetEjecucionCircuitoModel implements DetEjecucionCircuitoResquest {
  circuito_cod: string;
  circuito_descripcion: string;
  circuito_nombre: string;
  estado: string;
  fecha_fin: string;
  fecha_inicio: string;
  id: number;
  informante_ciudad: string;
  informante_cod: string;
  informante_direccion: string;
  informante_giro: string;
  informante_nombre: string;
  informante_razon_social: string;
  investigador: string;
  investigador_nombre: string;
  latitud: string;
  longitud: string;
  observacion: string;
  orden: number;
  tipo_encuesta: string;

  constructor(det?: DetEjecucionCircuitoResquest) {
    this.circuito_cod=det?det.circuito_cod:null;
    this.circuito_descripcion=det?det.circuito_descripcion:null;
    this.circuito_nombre=det?det.circuito_nombre:null;
    this.estado=det?det.estado:null;
    this.fecha_fin=det?det.fecha_fin:null;
    this.fecha_inicio=det?det.fecha_inicio:null;
    this.id=det?det.id:null;
    this.informante_ciudad=det?det.informante_ciudad:null;
    this.informante_cod=det?det.informante_cod:null;
    this.informante_direccion=det?det.informante_direccion:null;
    this.informante_giro=det?det.informante_giro:null;
    this.informante_nombre=det?det.informante_nombre:null;
    this.informante_razon_social=det?det.informante_razon_social:null;
    this.investigador=det?det.investigador:null;
    this.investigador_nombre=det?det.investigador_nombre:null;
    this.latitud=det?det.latitud:null;
    this.longitud=det?det.longitud:null;
    this.observacion=det?det.observacion:null;
    this.orden=det?det.orden:null;
    this.tipo_encuesta=det?det.tipo_encuesta:null;
  }
}
