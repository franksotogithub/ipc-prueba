import {DetEjecucionCircuitoResquest} from '../det-ejecucion-circuito/det-ejecucion-circuito.request'
import {MovMercadoCasasRequest} from '../mov_mercado_casas/mov_mercado_casas.request';

export interface DatosResquest{
  det_ejecucion_circuito:DetEjecucionCircuitoResquest[]
  mov_mercado_casas:MovMercadoCasasRequest[];
}