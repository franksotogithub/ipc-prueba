import { Component, OnInit ,AfterViewInit,ViewChild, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramacionRuta } from './../../../core/models/programacionRuta.model';
import * as moment from 'moment';
import { DetEjecucionCircuitoResquest } from 'src/app/core/models/det-ejecucion-circuito/det-ejecucion-circuito.request';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';

import { tap } from 'rxjs/operators';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { TipoEncuesta } from 'src/app/shared/enum/tipo-encuesta.enum';
import { DetEjecucionCircuitoModel } from 'src/app/core/models/det-ejecucion-circuito/det-ejecucion-circuito.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import { Estado } from 'src/app/shared/enum/estado.enum';
import { TablesDB } from 'src/app/shared/enum/tables-db.enum';

@Component({
  selector: 'app-comerciales-list',
  templateUrl: './comerciales-list.component.html',
  styleUrls: ['./comerciales-list.component.scss'],
})
export class ComercialesListComponent implements OnInit
//,AfterViewInit 
{
  @ViewChild('table',{static:true}) table: MatTable<DetEjecucionCircuitoModel>;
  columns: any[];
  displayedColumns: string[];
  busqueda = '';
  /*dataSource: MatTableDataSource<DetEjecucionCircuitoModel>;*/
  dataSource: DetEjecucionCircuitoModel[];
  q = '';
  pageSize: number = 5;
  length: number =0;
  informantes: DetEjecucionCircuitoModel[];
  ESTADO = Estado;
  estados = new FormControl();
  estadosList: string[] = [ Estado.FINALIZADO, Estado.PENDIENTE, Estado.TEMPORAL, Estado.CERRADO];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loadingData =false;
  constructor(
    private idbService: IdbService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getInformantesCasasComerciales();
    this.settingsDataTable();
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
 }
  /*
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
*/
  settingsDataTable() {
    this.columns = [
      { data: 'orden', label: 'Nro' },
      { data: 'informante_cod', label: 'Codigo' },
      { data: 'circuito_cod', label: 'Circuito' },
      { data: 'investigador_nombre', label: 'Investigador' },
      { data: 'informante_nombre', label: 'Establecimiento' },
      { data: 'informante_direccion', label: 'Direccion' },
      { data: 'informante_giro', label: 'Giro' },      
      { data: 'id', label: 'Acciones' },      
    ];

    this.displayedColumns = this.columns.map((x) => {
      return x.data;
    });

    this.breakpointObserver
    .observe(['(max-width: 770px)'])
    .subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['orden', 'circuito_cod','investigador_nombre','informante_nombre','informante_giro','id']
        : ['orden', 'informante_cod','circuito_cod','investigador_nombre','informante_nombre', 'informante_direccion','informante_giro','id'];
    });
   
  }


  getInformantesCasasComerciales() {
    this.loadingData=true;
    this.idbService
    .getAllData(TablesDB.DET_EJEC_CIRCUITO)
    .then((values: DetEjecucionCircuitoResquest[]) => {
      console.log('this.informantes>>>',values);
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

        this.length=this.informantes.length;

        this.dataSource=this.informantes; 
        this.loadingData=false;
     
    });
  }



  dropTable(event:CdkDragDrop<DetEjecucionCircuitoModel[]>){
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.dataSource=this.dataSource.map((e,index)=> 
    
    {
      
      let i = (index+1);
      e.orden =i;
      /*this.idbService.detEjecCircuito.next(e);*/
      this.idbService.updateItem(TablesDB.DET_EJEC_CIRCUITO,e,e.id);
      return e;
    }
    
    );


  }

  
  filterEstados(e){
      
    let filters:Array<any>=e.value;

    this.dataSource=this.informantes.filter(m=>{return  filters.some( f=> f===m.estado) } )

  }

}
