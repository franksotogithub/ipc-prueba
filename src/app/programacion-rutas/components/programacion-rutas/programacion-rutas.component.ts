import { Component, OnInit } from '@angular/core';
import {ProgramacionRutaService} from '../../../core/services/programacion-ruta.service';
import {DirectorioService} from '../../../core/services/directorio.service';
import {RutaService} from '../../../core/services/ruta.service';
@Component({
  selector: 'app-programacion-rutas',
  templateUrl: './programacion-rutas.component.html',
  styleUrls: ['./programacion-rutas.component.scss']
})
export class ProgramacionRutasComponent implements OnInit {
  
  dataSource:Array<any>=[];
  ver:boolean;
  displayedColumns =['nro','circuito','nombre_circ', 'ciudad_nombre','descripcion','nro_informantes','fecha_inicio','nombre_encuest', 'estado','acciones'];
  constructor(
    private programacionRutasService: ProgramacionRutaService) 
    { 
      this.ver=true;
      this.programacionRutasService.getAllProgramacionRuta().subscribe((data:any)=>{
        console.log(data);
      if (data.results){

          this.dataSource=data.results;
          this.ver=false;
      }

    });

  }

  ngOnInit() {
  }

}
