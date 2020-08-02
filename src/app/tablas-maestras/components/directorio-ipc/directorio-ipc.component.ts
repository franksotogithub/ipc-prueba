import { Component, OnInit } from '@angular/core';
import { DirectorioIPC} from './../../../core/models/directorio.model';
import {DirectorioService} from './../../../core/services/directorio.service';

@Component({
  selector: 'app-directorio-ipc',
  templateUrl: './directorio-ipc.component.html',
  styleUrls: ['./directorio-ipc.component.scss']
})
export class DirectorioIpcComponent implements OnInit {
  
  dataSource:Array<DirectorioIPC>=[];


  displayedColumns =['cod_info','dist_nombre','razon_social','direccion','estado','accion'];
  constructor(private directorioService: DirectorioService) { 
    this.directorioService.getAllDirectorioIPC().subscribe((data:any)=>{
      console.log('data.results>>>',data.results);
      if (data.results){
          this.dataSource=data.results;
      }


    });

  }


  ngOnInit() {
  }

}
