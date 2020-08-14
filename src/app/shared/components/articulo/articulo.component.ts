import { Component, OnInit,AfterViewInit,Inject ,ViewChild} from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArticuloService } from 'src/app/core/services/articulo.service';
import { Articulo, Clasificacion } from 'src/app/core/models/articulo.model';
import {MatPaginator} from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit,AfterViewInit {
  articulo:Articulo;
  selectedRowIndex=-1;
  columns: any[] = [

    {data: 'division_desc', label: 'Division'},
    {data: 'grupo_desc', label: 'Grupo'},
    {data: 'clase_desc', label: 'Clase'},
    {data: 'subclase_desc', label: 'Subclase'},
    {data: 'rubro_desc', label: 'Rubro'},
    {data: 'producto_desc', label: 'Producto'},
    {data: 'descripcion', label: 'Articulo'},
   
  ];

  displayedColumns: string[] ;
  busqueda="";
  dataSource:Array<any>=[];
  q='';
  pageSize=5;
  length=5;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private articuloService: ArticuloService,    
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any

    ) {

    this.displayedColumns= this.columns.map(x => {
      return x.data;
    });


    this.articuloService.getAllArticulos(this.pageSize,1,'').subscribe((datos:any)=>{
        this.length=datos.count;
        this.dataSource = this.transformDatosArticulos(datos);
        
    });    

   }

   transformDatosArticulos(datos){

        
    let articulos : Array<Articulo> = datos.results;
    let articulosFinal= articulos.map((a: Articulo)=>{
        
        let clasificacion:Clasificacion = a.clasificacion;
        let aCopy= {...a};
        delete aCopy.clasificacion;
        return {...aCopy, ...clasificacion}

    });
    return articulosFinal
   }

  ngOnInit() {
  }
  

  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadPage())
        )
        .subscribe();

  }

loadPage(){


  this.articuloService.getAllArticulos(this.paginator.pageSize,this.paginator.pageIndex,this.busqueda).subscribe((datos:any)=>{
    
    this.dataSource = this.transformDatosArticulos(datos);
  });  

}

  selectArticulo(articulo:Articulo,event){
    this.articulo=articulo;
    this.selectedRowIndex=this.articulo.id;
  }

  changeBusqueda(event){
    let q= event.target.value;
    if (q.length>=3){
      this.articuloService.getAllArticulos(this.paginator.pageSize,1,this.busqueda).subscribe((datos:any)=>{
        this.length=datos.count;
        this.dataSource = this.transformDatosArticulos(datos);
        
    });   
    }

    

  }
  
 closeDialog(selectArticulo: boolean){
      (selectArticulo)?this.dialogRef.close({ articulo:this.articulo}):this.dialogRef.close();      
  }

}
