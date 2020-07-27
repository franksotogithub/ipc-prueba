export interface Producto {
  /*orden:number;
  codigo:string;
  producto:string;
  marca:string;
  cap:string;
  presentacion:string;
  id:number;
  precio:number;
  ce:string;
  observacion:string;
  idInformante:number;
  imgUrl:string*/
   orden:number;
  art_id: number;
  art_desc: string;
  art_codant: string;
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
  precio: number;
  observacion:string;
  ce: string;
  id: number;
  informante_id:number;
  imgUrl:string;
}
