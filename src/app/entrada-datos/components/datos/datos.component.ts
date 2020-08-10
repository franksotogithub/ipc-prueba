import { Component, OnInit } from '@angular/core';
import { IdbService } from 'src/app/core/services/idb.service';
import {LoaderService} from './../../../core/services/loader.service';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  name_table ='mov_mercados_cab';
  constructor(private idbService:IdbService,private loaderService: LoaderService) { }
  message =null;
  messageError =null;
  ngOnInit() {
  }
  
  descargando(){
    this.message ='Datos descargados';
    this.messageError="Error al descargar datos";
    /*this.message =this.idbService.descargandoDatos();*/
    /*this.message=this.idbService.descargandoDatos();*/
    /*.then(m=>{
      console.log(m);
       
    });*/

    /*this.idbService.descargandoDatos( (messageResolve)=>{
      console.log('messageResolve>>>',messageResolve);
      this.message = messageResolve;
    },(messageReject)=>{
      console.log('messageReject>>>',messageReject);
      this.message = messageReject;
    });*/
    this.idbService.descargandoDatos();
  }
  
  cargando(){
    this.message ='Datos cargados';
    this.messageError="Error al cargar datos";
    this.idbService.cargandoDatos(this.name_table);
  }

  
  limpiarDatos()
  
  {
    
    this.message ='Tablas limpiadas';
    
    this.idbService.limpiandoDatos();
      this.loaderService.show();

      setTimeout(()=>{
        this.loaderService.hide();
        this.loaderService.showNotification();
      },2000);
  
    
  }
}
