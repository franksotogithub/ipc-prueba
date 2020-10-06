import { Component, OnInit } from '@angular/core';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { LoaderService } from './../../../core/services/loader.service';
import { TablesDB } from 'src/app/shared/enum/tables-db.enum';
import { DatosSearch } from 'src/app/core/models/datos/datos.search';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material';
import { DescargarDatosDialogComponent } from '../descargar-datos-dialog/descargar-datos-dialog.component';

import { DetEjecucionCircuitoResquest } from 'src/app/core/models/det-ejecucion-circuito/det-ejecucion-circuito.request';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
})
export class DatosComponent implements OnInit {
  datosSearch: DatosSearch = new DatosSearch();

  constructor(
    private idbService: IdbService,
    private loaderService: LoaderService,
    private authenticationService: AuthService,
    public dialog: MatDialog,
  ) {}
  message = null;
  messageError = null;
  ngOnInit() {}

  descargando() {
    console.log('holassssss');
    const dialogRef = this.dialog.open(DescargarDatosDialogComponent,{   
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result){
        if (result.confirm)
        {    
          
          

          this.idbService
          .getAllData(TablesDB.DET_EJEC_CIRCUITO)
          .then((values: DetEjecucionCircuitoResquest[]) => {
        
           if (values.length>0){

            const dialogConfirm = this.dialog.open(ConfirmDialogComponent,{   
              width: '70%',
              data: { title: "Descargando", message: "Seguro que quiere descargar los datos?Existen datos anteriores y se borraran si procede." }
            });

            dialogConfirm.afterClosed().subscribe((result2) => {
              if (result2) {
                if (result2.confirm) {
               
                  this.desc(result);
                } else {
                 
                  
                }
              }
            });

          }
          else{
            this.desc(result);
          }

           
          });









             




        }
      }
    });



  }

  desc(result){
    console.log('this.authenticationService.currentUserValue>>>',this.authenticationService.currentUserValue);
    let currentUser = this.authenticationService.currentUserValue;

    this.datosSearch.user_id = this.authenticationService.currentUserValue.user_id;
    this.datosSearch.date_start = result.date_start;
    this.datosSearch.date_end = result.date_end;



    
    this.messageError = 'Error al descargar datos';
    this.idbService.descargandoDatos(this.datosSearch).then( (datos)=>{

      this.message = 'Datos descargados';
      
     
    });

  }

  cargando() {
    this.message = 'Datos cargados';
    this.messageError = 'Error al cargar datos';
    this.idbService.cargandoDatos(TablesDB.MOV_MERC_CASAS);
  }

  limpiarDatos() {
    this.message = 'Tablas limpiadas';

    this.idbService.limpiandoDatos();
    this.loaderService.show();

    setTimeout(() => {
      this.loaderService.hide();
      this.loaderService.showNotification();
    }, 2000);
  }
}
