import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdbService } from 'src/app/core/services/idb.service';
import { ProgramacionRuta} from './../../../core/models/programacionRuta.model';
import { Informante} from './../../../core/models/informante.model';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Producto } from 'src/app/core/models/producto.model';

import { Utils} from './../../../shared/class/utils';

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
  informantes :Informante[];
  codComerciales ='00';
  /*displayedColumns = ['orden','codigo','producto','marca','cap','presentacion','id'];*/
  displayedColumns = ['orden','art_id','art_desc','precio','ce','observacion','id'];
  ces =[
    {id:"N" ,name:"Dato normal"},
    {id:"O" ,name:"Precio estacional "},
    {id:"S" ,name:" Supervisado en el mes 'n' "},
    {id:"T" ,name: "Temporal dato que se repite"}
   
  ];

  filterValue:Array<any>;
  constructor(
    private idbService:IdbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,  
    private breakpointObserver: BreakpointObserver,
    
    ) {
      this.filterValue =[...this.ces];
     }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = parseInt(params.id);

      /*
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

      }); */

      /*console.log('this.id>>>',this.id);*/

      /*this.informante=this.idbService.getItem('informantes',this.id);*/

    this.idbService.informantes$.subscribe( (informantes:Informante[])=>{
        
        
        this.informante=informantes.find(e=>e.id_directorio_ipc==this.id);

        [this.preview,this.next] = Utils.getIdsNextPreview(informantes,this.id,'id_directorio_ipc');
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

  changeInformante(){
    this.idbService.updateItem('informantes',this.informante,this.informante.id_directorio_ipc);
  }

  changeProducto(producto: Producto, precio: boolean) {

    if(precio){
      let num = parseFloat(producto.precio);
      num = num / 100.0;
      let n = num.toFixed(2);
      producto.precio = String(n);
    }

    /*this.idbService.producto$.next(producto);*/
    this.idbService.updateItem('productos',producto,producto.id);

  }


  ceSearch(event:any){
    let value =event.target.value;
    const filterValue = value.toLowerCase();
    if(value!=='')
      this.filterValue = this.ces.filter(option => option.name.toLowerCase().includes(filterValue));
    else
      this.filterValue =[...this.ces];

  }

  displayCE(ce: any): string {
    return ce ? ce.name : ce;
  }
  focusCE(){
    this.filterValue =[...this.ces];
  }

/*(focus)="focusFunction()"*/
  ceSelected(producto:Producto,event$){
    if(producto.ce!=event$.option.value.id){
      console.log("producto>>",producto);
      producto.ce= event$.option.value.id;
      producto.ce_name= event$.option.value.name;
      this.idbService.producto$.next(producto);  
    }
    
    

    
    /*this.form.get('mercado').setValue(event$.option.value.id);
    this.mercadoSelect = event$.option.value.nombre;*/

  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.informante.latitud = position.coords.latitude;
        this.informante.longitud = position.coords.longitude;
        this.idbService.informante$.next(this.informante);
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
