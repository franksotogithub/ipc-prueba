import { Component, OnInit, Input } from '@angular/core';
import {DeleteMessageComponent} from './../../../shared/components/delete-message/delete-message.component';
import {MessageComponent} from './../../../shared/components/message/message.component';
import {DirectorioService} from '../../../core/services/directorio.service';
import {RutaService} from '../../../core/services/ruta.service';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {Ciudad} from '../../../core/models/ciudad.model';
import {CiudadService} from '../../../core/services/ciudad.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss']
})

export class RutaComponent implements OnInit {
  
  dataSource:Array<any>=[];
  dataSource1:number;
  dataSource2:number;
  dataSource3:Array<any>=[];
  ciudad:Ciudad;
  @Input() pag:number;
  @Input() ver:boolean;
  displayedColumns =['nro','circuito','anio_base','nombre_circuito','ciudad_nombre','descripcion','fecha_inicio','nro_informantes','estado','acciones'];
  constructor( 
    public location:Location,
    private ciudades:CiudadService, 
    public directorioService: DirectorioService,
    public dialog: MatDialog,
    private rutaService: RutaService) 
    { 
      this.ver=true;
       this.rutaService.getAllRuta().subscribe((data:any)=>{
        if (data.results){
            this.dataSource=data.results;
            this.dataSource1=data.page_size;
            this.dataSource2=data.count;
            this.pag=0;
            this.ver=false;

        }
     });
     this.ciudades.getAllCiudades().subscribe((data:any)=>{
      if (data.results){
        this.dataSource3=data.results;
      }
    });

    }

  ngOnInit() {
    
  }


  eliminarCircuito(id:number){
    let title = "¿Desea anular el Circuito?";
    let message = "Al hacer clic en 'Eliminar', el Circuito será eliminado. Desea continuar?";

    const dialogRef = this.dialog.open(DeleteMessageComponent, {
      width: '400px',
      data: {title: title, message: message}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      let opc = result;
      if(opc==="confirm")
      {
        this.ver=true;
        this.rutaService.deleteRuta(id).subscribe((res)=>{
          console.log('res',res);
          this.ver=false;
          let title = "Éxito";
          let message = "El registro se deshabilito con éxito!";
          const dialogRef1 = this.dialog.open(MessageComponent, {
          width: '400px',
          data: {title: title, message: message}
          });
          dialogRef1.afterClosed().subscribe(result => {
            this.ngOnInit();
            this.location.path();
          }); 
          
        });
      }
    
    });
  }

  agregar(id:number) {
    
    this.directorioService.getDirectorioIPC(id).subscribe((data:any)=>{
    this.dataSource.push(new RutaService(data.results));
    });

  }

  getPaginatorData(event){
    let pag=parseInt(event.pageIndex)+1;
    this.ver=true;
    this.rutaService.getRutaPag(pag).subscribe((data:any)=>{
        if (data.results){
          this.pag=(pag-1);
          this.dataSource=data.results;
          this.dataSource1=data.page_size;
          this.dataSource2=data.count;
          this.ver=false;
      }
    });
  }



  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.ver=true;
    this.rutaService.buscarNombreRuta(filtro).subscribe((data:any)=>{
      if (data.results){
          this.dataSource=data.results;
          this.dataSource1=data.page_size;
          this.dataSource2=data.count;
          this.pag=0;
          this.ver=false;
      }
   });
  }

  changeRuta(valor) {
    let filtro2= valor.value;
    this.ver=true;
    this.rutaService.buscarCiudadRuta(filtro2).subscribe((data:any)=>{
      if (data.results){
          this.dataSource=data.results;
          this.dataSource1=data.page_size;
          this.dataSource2=data.count;
          this.pag=0;
          this.ver=false;
      }
   });
  }
  
}



 