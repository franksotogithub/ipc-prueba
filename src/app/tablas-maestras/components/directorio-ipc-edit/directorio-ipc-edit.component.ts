import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {DirectorioService} from './../../../core/services/directorio.service';
import { DirectorioIPC } from 'src/app/core/models/directorio.model';
import { RutaDetalleProducto } from 'src/app/core/models/rutaDetalleProducto.model';
@Component({
  selector: 'app-directorio-ipc-edit',
  templateUrl: './directorio-ipc-edit.component.html',
  styleUrls: ['./directorio-ipc-edit.component.scss']
})
export class DirectorioIpcEditComponent implements OnInit {
  id: number;
  directorio:DirectorioIPC;
  dataSource: Array<RutaDetalleProducto>;  
  displayedColumns =['orden','art_id','art_desc','accion'];
  constructor(    
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private directorioService:DirectorioService,
  
    ) { 

      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = parseInt(params.id);
        
        this.directorioService.getDirectorioIPC(this.id).subscribe((directorio:DirectorioIPC)=>{
          this.directorio=directorio;
          this.dataSource = this.directorio.productos;
        });


      });

    }

  ngOnInit() {
  }

  guardarDirectorio(){
    this.directorioService.updateDirectorioIPC(this.id,this.directorio).subscribe(res=>{
      console.log('res>>>',res);
    })
  }


}
