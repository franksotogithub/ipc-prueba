


export interface VariedadRequest{

  id: number;
  nombre: string;
  anio_base: string;
  codigo_14: string;
  cod_m_variedad: string;
  estado: string;
  clasificacion:ClasificacionVariedadRequest;

}

export interface ClasificacionVariedadRequest{
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

}