import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdbService } from 'src/app/core/services/idb.service';
import { ProgramacionRuta} from './../../../core/models/programacionRuta.model';
import { Informante} from './../../../core/models/informante.model';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Producto } from 'src/app/core/models/producto.model';

import { Utils} from './../../../shared/class/utils';

@Component({
  selector: 'app-mercados',
  templateUrl: './mercados.component.html',
  styleUrls: ['./mercados.component.scss']
})
export class MercadosComponent implements OnInit {
  
  id: number;
  informante:Informante;
  isChecked:boolean=false;
  next: number;
  preview: number;
  dataSource=[];
  isDetalle=false;
  producto: Producto;
  informantes :Informante[];
  codComerciales ='11';
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
    private breakpointObserver: BreakpointObserver,
    
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = parseInt(params.id);

      this.idbService.programacionRutas$.subscribe((datos:Array<ProgramacionRuta> )=>{
        
        if (datos.length>0){
          let programacionRuta=datos[0];

 

          this.informantes =Object.keys(programacionRuta.informantes).map((i) => {
            let el : Informante=programacionRuta.informantes[i];
            return el
          }).filter((e)=>{return e.encuesta_id==this.codComerciales}); 
  
      

          
          this.informante =  this.informantes.find((e:Informante)=>{
            return e.id === this.id
            });

            [this.preview,this.next] = Utils.getIdsNextPreview(this.informantes,this.id);
          
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

  changeProducto(producto:Producto,precio:boolean) {
    
    if(precio){
     

      let num = parseFloat(producto.precio);
      num = num/100.0;
      let n = num.toFixed(2);
      producto.precio= String(n);

    }
    this.idbService.producto$.next(producto);

  }

  
}

