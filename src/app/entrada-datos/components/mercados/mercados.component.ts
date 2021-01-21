import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { ProgramacionRuta } from './../../../core/models/programacionRuta.model';
import { DetEjecucionCircuitoModel } from 'src/app/core/models/det-ejecucion-circuito/det-ejecucion-circuito.model';
import { MovMercadoCasasModel } from 'src/app/core/models/mov_mercado_casas/mov-mercado-casas.model';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { TipoEncuesta } from 'src/app/shared/enum/tipo-encuesta.enum';
import { UtilHelper } from 'src/app/util/util.helper';
import { DetEjecucionCircuitoResquest } from 'src/app/core/models/det-ejecucion-circuito/det-ejecucion-circuito.request';
import { MovMercadoCasasRequest } from 'src/app/core/models/mov_mercado_casas/mov_mercado_casas.request';
import { TablesDB } from 'src/app/shared/enum/tables-db.enum';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { LatLong } from 'src/app/core/models/generic/lat-long';
import { Estado } from 'src/app/shared/enum/estado.enum';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

import { FormControl } from '@angular/forms';
import { Informante } from 'src/app/core/models/informante.model';
import { Utils } from 'src/app/shared/class/utils';

@Component({
  selector: 'app-mercados',
  templateUrl: './mercados.component.html',
  styleUrls: ['./mercados.component.scss']
})
export class MercadosComponent implements OnInit {
  id: any;
  informante: DetEjecucionCircuitoModel;
  isChecked: boolean = false;
  next: number;
  preview: number;
  dataSource: MatTableDataSource<MovMercadoCasasModel>;

  ESTADO = Estado;
  isDetalle = false;
  movMercadoCasasModelList: MovMercadoCasasModel[];
  informantes: DetEjecucionCircuitoModel[];
  codComerciales = '00';
  total: number = 0;
  avance: number = 0;
  cerrar: boolean = false;
  disabled = false;
  displayedColumns = [
    'orden',
    'art_id',
    'art_desc',
    'precio',
    'ce',
    'observacion',
    'id',
  ];


  /*
  
  
  El mercado se encuentra saturado del producto, la oferta supera ampliamente a la demanda
El producto se encuentra con facilidad y en la cantidad requeridas
Cuando el producto se encuentra con dificultad y en cantidad limitada
Cuando el producto no se encuentra en el mercado
  */

  ces = [
    { id: '1', name: 'El mercado se encuentra saturado del producto, la oferta supera ampliamente a la demanda' },
    { id: '2', name: 'El producto se encuentra con facilidad y en la cantidad requeridas' },
    { id: '3', name: 'Cuando el producto se encuentra con dificultad y en cantidad limitada' },
    { id: '4', name: 'Cuando el producto no se encuentra en el mercado' },
   
  ];
  ccs =[
    {
    id:0,name :'Nominal'
  },
  {
    id:1,name :'Compra'
  }

]
  estados = new FormControl();

  listEstadoInformante = [
    { estado: Estado.FINALIZADO, label: 'Mercado Finalizado' },
    { estado: Estado.PENDIENTE, label: 'Mercado Pendiente' },

    { estado: Estado.CERRADO, label: 'Mercado Cerrado' },
  ];
  labelInformante = '';

  estadosList: string[] = this.listEstadoInformante.map((e) => {
    return e.estado;
  });
  filterValue: Array<any>;
  constructor(
    private idbService: IdbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,

    public dialog: MatDialog
  ) {
    this.filterValue = [...this.ces];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id =params.id;
      this.getInformantesCasasComerciales();
    });

    this.breakpointObserver
      .observe(['(max-width: 770px)'])
      .subscribe((result) => {
        this.displayedColumns = result.matches
          ? ['orden', 
          //'cod_articulo',  
          'producto','articulo', 'accion']
          : [
              'orden',
              //'cod_articulo',
              'producto',
              'articulo',
              'digitacion',
              'precio_compra',
              'peso_gr_mercado',
              'ce',
              'cc',
              'peso_gr',
              'precio',
              'observacion',
            ];
      });
  }

  getInformantesCasasComerciales() {

    this.idbService
      .getAllData(TablesDB.DET_EJEC_CIRCUITO)
      .then((values: DetEjecucionCircuitoResquest[]) => {

        this.informantes = values
          .filter((i) => {
            return i.tipo_encuesta === TipoEncuesta.MERCADOS;
          })
          .map((e) => {
            return new DetEjecucionCircuitoModel(e);
          })
          .sort((a, b) => {
            if (a.orden > b.orden) {
              return 1;
            }
            if (a.orden < b.orden) {
              return -1;
            }

            return 0;
          });

        this.informante = this.informantes.find((e) => {
          return e.informante_cod === this.id;
        });

        [this.preview, this.next] = UtilHelper.getIdsNextPreview(
          this.informantes,
          this.informante.informante_cod,
          'informante_cod'
        );

        this.getMovMercadoCasas();
      });
  }

  getMovMercadoCasas() {
    this.idbService
      .getAllData(TablesDB.MOV_MERC_CASAS)
      .then((values: MovMercadoCasasRequest[]) => {
        this.movMercadoCasasModelList = values
          .filter((p) => {
            return p.det_ejecucion == this.informante.id;
          })
          .map((p,index) => {
            let m = new MovMercadoCasasModel(p); 
            m.orden = index+1;
            this.changeMovMercadoCasas(m);
            
            return m;

            
          })
          .sort((a, b) => {
            if (a.orden > b.orden) {
              return 1;
            }
            if (a.orden < b.orden) {
              return -1;
            }

            return 0;
          });

        this.dataSource = new MatTableDataSource(this.movMercadoCasasModelList);
        this.getEstadoInformante();
      });
  }

  calcularPrecio(m){

    if( UtilHelper.validarDato(m.precio_compra)){
      m.precio_compra  =UtilHelper.formatPrecio(m.precio_compra)
    }

  if( UtilHelper.validarDato(m.peso_gr)){
      m.peso_kl  = UtilHelper.formatPrecio(m.peso_gr/1000.0,3,3);
    }

    if(
    UtilHelper.validarDato(m.precio_compra) &&
    UtilHelper.validarDato(m.peso_gr_mercado) &&
    UtilHelper.validarDato(m.peso_gr)){
      m.precio = UtilHelper.formatPrecio(m.precio_compra*m.peso_gr_mercado/m.peso_gr);

    }

    else{
      m.precio ='';
    }

    /*if(m.precio_compra || m.peso_gr_mercado || m.peso_gr){

    }

    else {}
    m.precio_compra
    m.precio = m.precio_compra
    
    'precio_compra',
    'peso_gr_mercado',*/
  }

  changeMovMercadoCasasModel(m: MovMercadoCasasModel, precio?: boolean) {
    let today = new Date();

/*

if(m.digitacion ){
      if(UtilHelper.validarDato(m.precio_compra)){
      m.precio_compra  =UtilHelper.formatPrecio(m.precio_compra);
    }
      m.peso_gr_mercado = 1000;
      m.peso_gr = 1000;

      this.calcularPrecio(m);

    }

*/

    if(UtilHelper.validarDato(m.digitacion)){

      console.log(' UtilHelper.validarDato(m.digitacion) m>>>',m);
      m.digitacion=UtilHelper.formatPrecio(m.digitacion);

      /*m.precio_compra = UtilHelper.formatPrecio(m.digitacion); */
      m.precio_compra = parseFloat(m.digitacion);
      m.peso_gr_mercado = 1000;
      m.peso_gr = 1000;
    
      
      this.calcularPrecio(m);
    }
    else{
      this.calcularPrecio(m);
      m.fecha_registro = `${today.toISOString()}`;
      if (precio) {
        m.precio = UtilHelper.formatPrecio(m.precio);
     
      } 
  
     

    }

    if (
      UtilHelper.validarDato(m.precio) && 
      UtilHelper.validarDato(m.ce) 
    ) {
      m.estado =  Estado.FINALIZADO;
    } else {
      m.estado = Estado.PENDIENTE;
    }

    this.changeEstadoInformante();
    this.changeMovMercadoCasas(m);

    /*
    if (m.ce == 'T') {
      m.estado = Estado.TEMPORAL;
      m.precio = m.precio_anterior
      ? UtilHelper.formatPrecio(m.precio_anterior)
      : UtilHelper.formatPrecio(0);
    } 
    else if(m.ce=='F'){
      m.estado = Estado.CERRADO;
      m.precio = m.precio_anterior
      ? UtilHelper.formatPrecio(m.precio_anterior)
      : UtilHelper.formatPrecio(0);
    }
    else {
      if (
        m.precio !== null &&
        m.precio !== 'NaN' &&
        parseFloat(m.precio) !== 0.0 &&
        m.ce !== null
      ) {
        m.estado = m.ce == 'T' ? m.estado : Estado.FINALIZADO;
      } else {
        m.estado = Estado.PENDIENTE;
      }
    }

    this.getCurrentLocation();
    this.changeEstadoInformante();
    this.changeMovMercadoCasas(m);
    */

  }

  changeEstadoInformante() {
    this.avance = this.movMercadoCasasModelList.filter((e) => {
      return e.estado === Estado.FINALIZADO ;
    }).length;
    this.total = this.movMercadoCasasModelList.length;

    let cantTemp = this.movMercadoCasasModelList.filter((e) => {
      return e.estado === Estado.TEMPORAL;
    }).length;

    if (this.avance == this.total && cantTemp == 0) {
      this.informante.estado = Estado.FINALIZADO;
    
    
    } else if (this.avance !== this.total || this.informante.estado == null) {
      this.informante.estado = Estado.PENDIENTE;
   
    }

   

    this.labelInformante = this.listEstadoInformante.find((e) => {
      return e.estado == this.informante.estado;
    }).label;

    this.changeInformante(this.informante);

  }

  getEstadoInformante() {
    this.avance = this.movMercadoCasasModelList.filter((e) => {
      return e.estado === Estado.FINALIZADO || e.estado === Estado.TEMPORAL;
    }).length;
    this.total = this.movMercadoCasasModelList.length;

   
    this.labelInformante = this.listEstadoInformante.find((e) => {
      return e.estado == this.informante.estado;
    }).label;
  }



  changeMovMercadoCasas(movMercadoCasas: MovMercadoCasasModel){
    this.idbService.updateItem(TablesDB.MOV_MERC_CASAS,movMercadoCasas,movMercadoCasas.id);
  }

  changeInformante(informante : DetEjecucionCircuitoModel) {
    console.log('informante',informante);
    this.idbService.updateItem(TablesDB.DET_EJEC_CIRCUITO,informante,informante.id);
  }

  async getCurrentLocation() {
    if (
      this.informante.latitud == null ||
      this.informante.latitud == '0' ||
      this.informante.longitud == null ||
      this.informante.longitud == '0'
    ) {
      let coords = await UtilHelper.getPosition();

      this.informante.latitud = coords['latitude'];
      this.informante.longitud = coords['longitude'];
    }
  }

  ceSearch(event: any) {
    let value = event.target.value;
    const filterValue = value.toLowerCase();
    if (value !== '')
      this.filterValue = this.ces.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    else this.filterValue = [...this.ces];
  }

  displayCE(ce: any): string {
    return ce ? ce.name : ce;
  }
  focusCE() {
    this.filterValue = [...this.ces];
  }


  ceSelected(m: MovMercadoCasasModel, event$) {
    if (m.ce != event$.option.value.id) {
      m.ce = event$.option.value.id;

      /*this.idbService.movMercadoCasas.next(m);*/
      /*this.changeMovMercadoCasas(m);*/
    }
  }

  

  filterEstados(e) {
    const filters: Array<any> = e.value;

    this.dataSource.data = this.movMercadoCasasModelList.filter((m) => {
      return filters.some((f) => f === m.estado);
    });
  }
  
  digitacion(m){
    
    /*console.log('e>>>',e);*/
    
    /*if(m.digitacion ){
      if(UtilHelper.validarDato(m.precio_compra)){
      m.precio_compra  =UtilHelper.formatPrecio(m.precio_compra);
    }
      m.peso_gr_mercado = 1000;
      m.peso_gr = 1000;

      this.calcularPrecio(m);

    }*/
    
/*


    if( UtilHelper.validarDato(m.precio_compra)){
      m.precio_compra  =UtilHelper.formatPrecio(m.precio_compra)
    }

  if( UtilHelper.validarDato(m.peso_gr)){
      m.peso_kl  = UtilHelper.formatPrecio(m.peso_gr/1000.0,3,3);
    }

    if(
    UtilHelper.validarDato(m.precio_compra) &&
    UtilHelper.validarDato(m.peso_gr_mercado) &&
    UtilHelper.validarDato(m.peso_gr)){
      m.precio = UtilHelper.formatPrecio(m.precio_compra*m.peso_gr_mercado/m.peso_gr);

    }

    else{
      m.precio ='';
    }



*/
  }
}

