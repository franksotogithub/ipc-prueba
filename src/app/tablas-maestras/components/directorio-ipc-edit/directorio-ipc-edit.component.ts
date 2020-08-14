import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {DirectorioService} from './../../../core/services/directorio.service';
import { DirectorioIPC } from 'src/app/core/models/directorio.model';
import { ArticuloDirectorio} from './../../../core/models/articuloDirectorio.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DeleteMessageComponent} from './../../../shared/components/delete-message/delete-message.component';
import { ArticuloDirectorioService } from 'src/app/core/services/articulo-directorio.service';

@Component({
  selector: 'app-directorio-ipc-edit',
  templateUrl: './directorio-ipc-edit.component.html',
  styleUrls: ['./directorio-ipc-edit.component.scss']
})
export class DirectorioIpcEditComponent implements OnInit {
  id: number;
  directorio:DirectorioIPC;
  dataSource: Array<ArticuloDirectorio>;  
  /*displayedColumns =['orden','art_id','art_desc','accion'];*/
  columns=[
    
    {label:'ORDEN',data:'orden_articulo'},
    {label:'PRODUCTO/ARTICULO',data:'articulo_desc'},
    {label:'ACCION',data:'accion'},
  ]
  
  displayedColumns =[];
  constructor(    
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private directorioService:DirectorioService,
    private articuloDirectorioService: ArticuloDirectorioService,
    public dialog: MatDialog
    ) { 
      this.displayedColumns = this.columns.map((c)=>{return c.data});

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

  eliminarArticulo(id:number){
    let title = "Eliminar Articulo";
    let message = "¿Desea eliminar el articulo?";

    const dialogRef = this.dialog.open(DeleteMessageComponent, {
      width: '250px',
      data: {title: title, message: message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let opc = result.opc;
      (opc)?this.articuloDirectorioService.delete(id).subscribe((res)=>{
        console.log('res',res);
      }):false;

    });

    /*dialogRef.afterClosed().subscribe(result => {
      
      
    });*/

    /*
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });
    
    */
  }

  /*data: {name: this.name, animal: this.animal}*/

}
