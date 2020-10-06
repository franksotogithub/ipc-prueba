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
@Component({
  selector: 'app-comerciales',
  templateUrl: './comerciales.component.html',
  styleUrls: ['./comerciales.component.scss'],
})
export class ComercialesComponent implements OnInit {
  id: number;
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

  ces = [
    { id: 'N', name: 'Dato normal' },
    { id: 'T', name: 'Temporal dato que se repite' },
    { id: 'S', name: 'Supervisado en el mes' },
    { id: 'O', name: 'Precio estacional' },
    { id: 'F', name: 'Cerrado' },
  ];
  estados = new FormControl();

  listEstadoInformante = [
    { estado: Estado.FINALIZADO, label: 'Informante Finalizado' },
    { estado: Estado.PENDIENTE, label: 'Informante Pendiente' },
    { estado: Estado.TEMPORAL, label: 'Informante Con datos Temporal' },
    { estado: Estado.CERRADO, label: 'Informante Cerrado' },
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
      this.id = parseInt(params.id);
      this.getInformantesCasasComerciales();
    });

    this.breakpointObserver
      .observe(['(max-width: 770px)'])
      .subscribe((result) => {
        this.displayedColumns = result.matches
          ? ['orden', 'cod_mvariedad', 'variedad_nombre', 'accion']
          : [
              'orden',
              'cod_mvariedad',
              'variedad_nombre',
              'precio',
              'ce',
              'observacion',
            ];
      });
  }

  getInformantesCasasComerciales() {

    this.idbService
      .getAllData(TablesDB.DET_EJEC_CIRCUITO)
      .then((values: DetEjecucionCircuitoResquest[]) => {

        console.log('values>>>',values);
        this.informantes = values
          .filter((i) => {
            return i.tipo_encuesta === TipoEncuesta.CASAS_COMERCIALES;
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
          return e.orden == this.id;
        });

        [this.preview, this.next] = UtilHelper.getIdsNextPreview(
          this.informantes,
          this.informante.orden,
          'orden'
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

  changeMovMercadoCasasModel(m: MovMercadoCasasModel, precio?: boolean) {
    let today = new Date();

    m.fecha_registro = `${today.toISOString()}`;
    if (precio) {
      m.precio = UtilHelper.formatPrecio(m.precio);
      if (m.precio == null || m.precio === 'NaN') {
        m.precio = UtilHelper.formatPrecio(0);
      }
    } 
 
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
    
  }

  changeEstadoInformante() {
    this.avance = this.movMercadoCasasModelList.filter((e) => {
      return e.estado === Estado.FINALIZADO || e.estado === Estado.TEMPORAL;
    }).length;
    this.total = this.movMercadoCasasModelList.length;
    let cantTemp = this.movMercadoCasasModelList.filter((e) => {
      return e.estado === Estado.TEMPORAL;
    }).length;

    if (this.avance == this.total && cantTemp == 0) {
      this.informante.estado = Estado.FINALIZADO;
      this.cerrar = false;
      this.disabled = false;
    } else if (this.avance == this.total && cantTemp > 0) {
      this.informante.estado = Estado.TEMPORAL;
      this.cerrar = false;
      this.disabled = false;
    } else if (this.avance !== this.total || this.informante.estado == null) {
      this.informante.estado = Estado.PENDIENTE;
      this.cerrar = false;
      this.disabled = false;
    }

    this.cerrar = false;
    this.disabled = false;

    if (this.informante.estado == Estado.CERRADO) {
      this.cerrar = true;
      this.disabled = true;
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

    this.cerrar = false;
    this.disabled = false;

    if (this.informante.estado == Estado.CERRADO) {
      this.cerrar = true;
      this.disabled = true;
    }
    this.labelInformante = this.listEstadoInformante.find((e) => {
      return e.estado == this.informante.estado;
    }).label;
  }



  changeMovMercadoCasas(movMercadoCasas: MovMercadoCasasModel){
    this.idbService.updateItem(TablesDB.MOV_MERC_CASAS,movMercadoCasas,movMercadoCasas.id);
  }

  changeInformante(informante : DetEjecucionCircuitoModel) {
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

  cerrarInformante() {
    this.informante.estado = Estado.CERRADO;
    this.movMercadoCasasModelList.map((m) => {
      m.ce = 'F';
      m.precio = m.precio_anterior
        ? UtilHelper.formatPrecio(m.precio_anterior)
        : UtilHelper.formatPrecio(0);
      m.estado = Estado.CERRADO;
      this.changeMovMercadoCasas(m);
      /*this.idbService.movMercadoCasas.next(m);*/
    });
   this.changeInformante(this.informante);
   this.getEstadoInformante();
  }

  abrirInformante() {
    this.informante.estado = Estado.PENDIENTE;
    this.movMercadoCasasModelList.map((m) => {
      m.ce = null;
      m.precio = UtilHelper.formatPrecio(0);
      m.estado = Estado.PENDIENTE;
      this.changeMovMercadoCasas(m);
    });
    this.changeInformante(this.informante);
    this.getEstadoInformante();
  }

  confirmarCerrarInformante(event) {
    let title = '';
    let message = '';
    console.log('this.cerrar>>', this.cerrar);
    if (this.cerrar) {
      title = 'Cerrar Informante';
      message = 'Desea cerrar el informante?';
    } else {
      title = 'Abrir Informante';
      message = 'Desea abrir el informante?';
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: title, message: message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.confirm) {
          console.log('confirm', result.confirm);
          this.cerrar ? this.cerrarInformante() : this.abrirInformante();
        } else {
          console.log('confirm', result.confirm);
          this.cerrar = !this.cerrar;
        }
      }
    });
  }

  filterEstados(e) {
    const filters: Array<any> = e.value;

    this.dataSource.data = this.movMercadoCasasModelList.filter((m) => {
      return filters.some((f) => f === m.estado);
    });
  }
}
