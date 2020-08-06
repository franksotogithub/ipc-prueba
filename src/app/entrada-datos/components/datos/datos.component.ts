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
  message ='Cargando datos';
  ngOnInit() {
  }
  
  descargando(){
    this.message ='Datos descargados';
    this.idbService.descargandoDatos();
  }
  
  cargando(){
    this.message ='Datos cargados';
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
