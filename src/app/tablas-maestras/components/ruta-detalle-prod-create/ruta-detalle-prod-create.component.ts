import { Component, OnInit } from '@angular/core';
import { RutaDetalleProducto } from 'src/app/core/models/rutaDetalleProducto.model';
import { Producto } from 'src/app/core/models/producto.model';
import { ArticuloService} from './../../../core/services/articulo.service';
import { RutaDetalleProdService} from './../../../core/services/ruta-detalle-prod.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ArticuloComponent} from '../../../shared/components/articulo/articulo.component';


@Component({
  selector: 'app-ruta-detalle-prod-create',
  templateUrl: './ruta-detalle-prod-create.component.html',
  styleUrls: ['./ruta-detalle-prod-create.component.scss']
})
export class RutaDetalleProdCreateComponent implements OnInit {
  rutaDetalleProd:RutaDetalleProducto ={
    articulo:null,
    art_desc:null,
    ce:null,
    id:null,
    orden:null,
    precio:null,
    ruta_detalle:null
  };

  ces =[
    {id:"N" ,name:"Dato normal"},
    {id:"O" ,name:"Precio estacional "},
    {id:"S" ,name:" Supervisado en el mes 'n' "},
    {id:"T" ,name: "Temporal dato que se repite"}  

  ];
  constructor(
   
   private rutaDetalleProdService:RutaDetalleProdService,
   private router: Router, 
   public dialog: MatDialog,
   private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      let ruta_detalle = parseInt(params.id);
      this.rutaDetalleProd.ruta_detalle=ruta_detalle;
      

    });
    
  } 

  openDialogArticulos(): void {

    const dialogRef = this.dialog.open(ArticuloComponent, {
      width: '90%',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){ 
        console.log('result.articulo>>>',result.articulo);
        this.rutaDetalleProd.articulo=result.articulo.art_id;
        this.rutaDetalleProd.art_desc = result.articulo.articulo_desc;
       
      }

    });


  }

  
  guardarOrden(){
    this.rutaDetalleProdService.createRutaDetalleProducto(this.rutaDetalleProd).subscribe(res=>{
      console.log('res>>>',res);
      this.router.navigate(['../']);
    });
  }


}
