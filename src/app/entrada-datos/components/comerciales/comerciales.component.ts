import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdbService } from 'src/app/core/services/idb.service';
import { ProgramacionRuta} from './../../../core/models/programacionRuta.model';
import { Informante} from './../../../core/models/informante.model';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Producto } from 'src/app/core/models/producto.model';

@Component({
  selector: 'app-comerciales',
  templateUrl: './comerciales.component.html',
  styleUrls: ['./comerciales.component.scss']
})
export class ComercialesComponent implements OnInit {
  
  id: number;
  informante:Informante;
  isChecked:boolean=false;
  next: number;
  preview: number;
  dataSource=[];
  isDetalle=false;
  producto: Producto;
  /*displayedColumns = ['orden','codigo','producto','marca','cap','presentacion','id'];*/
  displayedColumns = ['orden','art_id','art_desc','precio','ce','observacion','id'];
  ces =[
    {id:"N" ,name:"Dato normal"},
    {id:"O" ,name:"Precio estacional "},
    {id:"S" ,name:" Supervisado en el mes 'n' "},
    {id:"T" ,name: "Temporal dato que se repite"}
   

  ];
  constructor(
    private idbService:IdbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,  
    private breakpointObserver: BreakpointObserver
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = parseInt(params.id);

      this.idbService.programacionRutas$.subscribe((datos:Array<ProgramacionRuta> )=>{
        
        if (datos.length>0){
          let programacionRuta=datos[0];

          let informantes = Object.keys(programacionRuta.informantes)
          .map(i => programacionRuta.informantes[i])
          
          this.informante = informantes.find((e:Informante)=>{
            return e.id === this.id
            });

            [this.preview,this.next] = this.getIdsNextPreview(informantes,this.id);
          
          }

      }); 

      this.idbService.productos$.subscribe( (productos:Producto[])=>{
        
       
        this.dataSource=productos.filter((p)=>{ return p.informante_id==this.id});
       
      });

    });


    this.breakpointObserver.observe(['(max-width: 770px)']).subscribe(result => {
      this.displayedColumns = result.matches ? 
      ['art_id','art_desc','id'] : 
      ['orden','art_id','art_desc','precio','ce','observacion'];
    });

  }

  getIdsNextPreview(array,id){
    let idPreview,idNext;

    

    let index = array.findIndex((e:Informante)=>{
      return e.id === id
      });
     
    if(array.length==0)  {
      idPreview=id;idNext=id
    }

    else if ((index - 1 ) < 0 ){
      idPreview=id;
      idNext=array[index+1].id;
    }

    else if(array.length==(index+1)){
      idPreview=array[index-1].id;
      idNext=id;
    }
    else{
      idPreview=array[index-1].id;
      idNext=array[index+1].id;
    }
    
    return [idPreview,idNext];

  }

  changeProducto(producto:Producto) {
    this.idbService.producto$.next(producto);

  }
/*
  detalle(id){
    this.producto=this.dataSource.find((e)=>{return e.id==id});
    this.isDetalle=true;
  }*/
}
