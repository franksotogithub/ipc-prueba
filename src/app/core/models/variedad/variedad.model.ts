import { ClasificacionVariedadRequest, VariedadRequest } from './variedad.request';





export class ClasificacionVariedadModel implements ClasificacionVariedadRequest{
  articulo_id: number;
  articulo_desc: string;
  articulo_codigo: string;
  producto_id: number;
  producto_desc: string;
  producto_codigo: string;
  rubro_id: number;
  rubro_desc: string;
  rubro_codigo: string;
  subclase_id: number;
  subclase_desc: string;
  subclase_codigo: string;
  clase_id: number;
  clase_desc: string;
  clase_codigo: string;
  grupo_id: number;
  grupo_desc: string;
  grupo_codigo: string;
  division_id: number;
  division_desc: string;
  division_codigo: string;

  constructor(clasificacion?: ClasificacionVariedadRequest){
    this.articulo_id = clasificacion?clasificacion.articulo_id:null;
    this.articulo_desc = clasificacion?clasificacion.articulo_desc:null;
    this.articulo_codigo = clasificacion?clasificacion.articulo_codigo:null;
    this.producto_id = clasificacion?clasificacion.producto_id:null;
    this.producto_desc = clasificacion?clasificacion.producto_desc:null;
    this.producto_codigo =clasificacion?clasificacion.producto_codigo:null;
    this.rubro_id = clasificacion?clasificacion.rubro_id:null;
    this.rubro_desc = clasificacion?clasificacion.rubro_desc:null;
    this.rubro_codigo = clasificacion?clasificacion.rubro_codigo:null;
    this.subclase_id = clasificacion?clasificacion.subclase_id:null;
    this.subclase_desc = clasificacion?clasificacion.subclase_desc:null;
    this.subclase_codigo = clasificacion?clasificacion.subclase_codigo:null;
    this.clase_id = clasificacion?clasificacion.clase_id:null;    
    this.clase_desc = clasificacion?clasificacion.clase_desc:null;
    this.clase_codigo = clasificacion?clasificacion.clase_codigo:null;
    this.grupo_codigo = clasificacion?clasificacion.grupo_codigo:null;
    this.grupo_desc = clasificacion?clasificacion.grupo_desc:null;
    this.grupo_id = clasificacion?clasificacion.grupo_id:null;
    this.division_id = clasificacion?clasificacion.division_id:null;
    this.division_desc = clasificacion?clasificacion.division_desc:null;
    this.division_codigo = clasificacion?clasificacion.division_codigo:null;

  }

}

export class VariedadModel implements VariedadRequest{

  id: number;
  nombre: string;
  anio_base: string;
  codigo_14: string;
  cod_m_variedad: string;
  estado: string;
  clasificacion:ClasificacionVariedadModel;

  constructor(v?:VariedadRequest){
    this.id = v?v.id:null;
    this.nombre = v?v.nombre:null;
    this.anio_base = v?v.anio_base:null;
    this.codigo_14 = v?v.codigo_14:null;
    this.cod_m_variedad = v?v.cod_m_variedad:null;
    this.estado = v?v.estado:null;
    this.clasificacion = v?new ClasificacionVariedadModel(v.clasificacion):null;

    
  }

}