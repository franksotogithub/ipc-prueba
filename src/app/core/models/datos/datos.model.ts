import {DetEjecucionCircuitoResquest} from '../det-ejecucion-circuito/det-ejecucion-circuito.request'
import {MovMercadoCasasRequest} from '../mov_mercado_casas/mov_mercado_casas.request';
import { DatosResquest } from './datos.request';

export class DatosModel implements DatosResquest {
  det_ejecucion_circuito:DetEjecucionCircuitoResquest[]
  mov_mercado_casas:MovMercadoCasasRequest[];

  constructor(datos?:DatosResquest){
    this.det_ejecucion_circuito= datos?datos.det_ejecucion_circuito:[];
    this.mov_mercado_casas = datos?datos.mov_mercado_casas:[];

  }
}