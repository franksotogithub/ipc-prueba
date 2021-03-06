import {VariedadModel} from '../variedad/variedad.model';

export interface MovMercadoCasasRequest{
  id: number;
  det_ejecucion: number;
  orden:number;
  precio:string;
  precio_anterior:number;
  cc:string;
  ce: string;
  ce_anterior:string;
  peso_gr:number;
  peso_kl:number;
  fecha_registro:string;
  fecha_sube_dato:string;
  estado:string;
  var_nombre:string;
  cod_mvariedad:string;
  tipo_usuario:string;

  lote: string;
  anio: string;
  mes: string;
  nro_semana: number;
  valor: number;
  precio_compra: number;
  peso_gr_mercado: number;
  
  digitacion: string;
  /*variedad: VariedadModel;*/

  observacion: string;
  imgUrl:string;
  audioUrl:any;

  var_marca : string;
  var_modelo : string;
  var_capacidad :string;
  var_unidad: string;
  var_presentacion : string;
  var_origen: string;
  var_caracteristicas : string;
  var_otros_detalles: string; 
  articulo :string;
  cod_articulo :string;
  producto :string;
  cod_producto :string;
  
  
}