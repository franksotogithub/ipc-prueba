


export interface Clasificacion{
  producto_id: number;
  producto_desc: string;
  rubro_id: number;
  rubro_desc: string;
  subclase_id: number;
  subclase_desc: string;
  clase_id: number;
  clase_desc: string;
  grupo_id: number;
  grupo_desc: string;
  division_id: number;
  division_desc: string;
}

export interface Articulo {

  id: number;
  producto: number;
  descripcion: string;
  estado: string;
  cod_division: number;
  cod_grupo: number;
  cod_clase: number;
  cod_subclase: number;
  cod_rubro: number;
  art_codant: string;
  canasta: string;
  fecha_reg: string;
  fecha_act: string;
  clasificacion: Clasificacion;
}
