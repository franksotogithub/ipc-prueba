import { Component, OnInit } from '@angular/core';
import { IdbService } from 'src/app/core/services/idb.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  name_table ='mov_mercados_cab';
  constructor(private idbService:IdbService) { }
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

}
