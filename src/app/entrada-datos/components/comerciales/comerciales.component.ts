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
  displayedColumns = ['orden','codigo','producto','precio','ce','observacion','id'];
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

      this.dataSource = [
        {'orden':1,'codigo':'001','producto':'producto1','marca':'marca1','cap':'100L','presentacion':'presentacion1','id':1,precio:0,ce:'N','observacion':''},
        {'orden':2,'codigo':'002','producto':'producto2','marca':'marca2','cap':'200L','presentacion':'presentacion2','id':2,precio:0,ce:'N','observacion':''},
      ];

    });



    this.breakpointObserver.observe(['(max-width: 770px)']).subscribe(result => {
      this.displayedColumns = result.matches ? 
      ['codigo','producto','id'] : 
      ['orden','codigo','producto','precio','ce'];
    });

  }

  getIdsNextPreview(array,id){
    let idPreview,idNext;

    console.log('array,id>>',array,id);

    let index = array.findIndex((e:Informante)=>{
      return e.id === id
      });
      console.log('index>>',index);
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
    console.log('idPreview,idNext>>',idPreview,idNext);
    return [idPreview,idNext];

  }

/*
  detalle(id){
    this.producto=this.dataSource.find((e)=>{return e.id==id});
    this.isDetalle=true;
  }*/
}
