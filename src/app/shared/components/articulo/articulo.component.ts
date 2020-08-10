import { Component, OnInit,Inject } from '@angular/core';
import { Producto } from 'src/app/core/models/producto.model';
import { ArticuloService} from './../../../core/services/articulo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {
  articulo:Producto;
  
  columns: any[] = [

    {data: 'division_desc', label: 'Division'},
    {data: 'grupo_desc', label: 'Grupo'},
    {data: 'clase_desc', label: 'Clase'},
    {data: 'subclase_desc', label: 'Subclase'},
    {data: 'rubro_desc', label: 'Rubro'},
    {data: 'producto_desc', label: 'Producto'},
    {data: 'art_desc', label: 'Articulo'},
   
  ];

  displayedColumns: string[] ;

  dataSource;

  constructor(
    private articuloService: ProductoService,    
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any

    ) {

    this.displayedColumns= this.columns.map(x => {
      return x.data;
    });

    this.articuloService.getAllProductos().subscribe((datos:Array<Producto>)=>{
        this.dataSource=datos;
    });    
   }

   
  ngOnInit() {
  }
  
  selectArticulo(articulo:Producto,event){
    this.articulo=articulo;
    /*(articulo)?this.dialogRef.close({ articulo:articulo}):false;*/
  }

  
 closeDialog(selectArticulo: boolean){
      (selectArticulo)?this.dialogRef.close({ articulo:this.articulo}):this.dialogRef.close();      
  }

}
