import { Component, OnInit } from '@angular/core';
import { ArticuloDirectorio } from 'src/app/core/models/articuloDirectorio.model';
import { ArticuloDirectorioService} from './../../../core/services/articulo-directorio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ArticuloComponent} from '../../../shared/components/articulo/articulo.component';
import { Articulo } from 'src/app/core/models/articulo.model';

@Component({
  selector: 'app-articulo-directorio-edit',
  templateUrl: './articulo-directorio-edit.component.html',
  styleUrls: ['./articulo-directorio-edit.component.scss']
})
export class ArticuloDirectorioEditComponent implements OnInit {

  articuloDirectorio:ArticuloDirectorio ={
    articulo:null,
    articulo_desc:null,
    id:null,
    informante: null,
    orden_articulo:null,
    estado:'1',
    fecha_actualizacion:null,
    fecha_registro:null,
    fecha_baja:null,
    observacion:null,
    usuario_baja:null

    
  };

  ces =[
    {id:"N" ,name:"Dato normal"},
    {id:"O" ,name:"Precio estacional "},
    {id:"S" ,name:" Supervisado en el mes 'n' "},
    {id:"T" ,name: "Temporal dato que se repite"}  

  ];
  constructor(

   private router: Router, 
   public dialog: MatDialog,
   private activatedRoute: ActivatedRoute, 
   private articuloDirectorioService: ArticuloDirectorioService

  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

     let informante = parseInt(params.id);
     let idArticulo=parseInt(params.idArticulo);

     this.articuloDirectorioService.get(idArticulo).subscribe((res:ArticuloDirectorio)=>{
      this.articuloDirectorio = res;
     });
     
    });
    
  } 

  openDialogArticulos(): void {

    const dialogRef = this.dialog.open(ArticuloComponent, {
      width: '90%',      
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result){ 
        let articulo:Articulo = result.articulo;
        this.articuloDirectorio.articulo=articulo.id
        this.articuloDirectorio.articulo_desc = articulo.descripcion;
        
      }

    });

  }

  
  guardarOrden(){
    this.articuloDirectorioService.create(this.articuloDirectorio).subscribe(res=>{
        
      this.router.navigate(['../']);

    });
  }

}
