import { VariedadModel } from '../variedad/variedad.model';
import { VariedadRequest } from '../variedad/variedad.request';
import { MovMercadoCasasRequest } from './mov_mercado_casas.request';


export class MovMercadoCasasModel implements MovMercadoCasasRequest{
  id: number;
  det_ejecucion: number;
  orden:number;
  precio:string;
  precio_anterior:number;
  cc: string;
  ce:string;
  ce_anterior:string;
  peso_gr:number;
  perso_kl:number;
  fecha_registro:string;
  fecha_sube_dato:string;
  estado:string;
  variedad_nombre:string;
  cod_mvariedad:string;
  tipo_usuario:string;

  lote: string;
  anio: string;
  mes: string;
  nro_semana: number;
  valor: number;
  precio_compra: number;
  peso_gr_mercado: number;
  /*variedad:VariedadModel;*/
  observacion: string;
  imgUrl:string;
  var_marca : string;
  var_modelo : string;
  var_capacidad :string;
  var_unidad: string;
  var_presentacion : string;
  var_origen: string;
  var_caracteristicas : string;
  var_otros_detalles: string; 
  audioUrl:any;
  articulo :string;
  cod_articulo :string;
  producto :string;
  cod_producto :string;
  digitacion: boolean;
  constructor(m?: MovMercadoCasasRequest)
  {
    this.id = m?m.id:null;
    this.det_ejecucion = m?m.det_ejecucion:null;
    this.orden = m?m.orden:null;
    this.precio = m?m.precio:null;
    this.precio_anterior = m?m.precio_anterior:null;
    this.cc =m?m.cc:null;
    this.ce = m?m.ce:null;
    this.fecha_registro=m?m.fecha_registro:null;
    this.fecha_sube_dato=m?m.fecha_sube_dato:null;
    this.estado=m?m.estado:null;
    this.variedad_nombre=m?m.variedad_nombre:null;
    this.cod_mvariedad=m?m.cod_mvariedad:null;
    this.tipo_usuario=m?m.tipo_usuario:null;
  
    this.lote=m?m.lote:null;
    this.anio=m?m.anio:null;
    this.mes=m?m.mes:null;
    this.nro_semana=m?m.nro_semana:null;
    this.valor=m?m.valor:null;
    this.precio_compra=m?m.precio_compra:null;
    this.peso_gr_mercado=m?m.peso_gr_mercado:null;
    this.peso_gr=m?m.peso_gr:null;
    /*this.variedad=m?new VariedadModel(m.variedad):null;*/
    this.observacion = m?m.observacion:null;
    this.imgUrl =m?m.imgUrl:null;
    this.audioUrl = m?m.audioUrl:null;
    this.var_marca = m?m.var_marca:null;
    this.var_modelo= m?m.var_modelo:null ;
    this.var_capacidad = m?m.var_capacidad:null;
    this.var_unidad = m?m.var_unidad:null
    this.var_presentacion = m?m.var_presentacion:null;
    this.var_origen = m?m.var_origen:null;
    this.var_caracteristicas = m?m.var_caracteristicas:null;
    this.var_otros_detalles = m?m.var_otros_detalles:null;
    this.articulo = m?m.articulo:null;
    this.cod_articulo = m?m.cod_articulo:null;
    this.producto  = m?m.producto:null;
    this.cod_producto = m?m.cod_producto:null;
    this.digitacion = m?m.digitacion:null;
  }

}