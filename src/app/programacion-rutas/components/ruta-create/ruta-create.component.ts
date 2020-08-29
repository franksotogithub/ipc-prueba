import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {DeleteMessageComponent} from './../../../shared/components/delete-message/delete-message.component';
import {ListaInformantesComponent} from './../lista_informantes/lista-informantes.component';
import {RutaService} from '../../../core/services/ruta.service';
import {Ruta} from '../../../core/models/ruta.model';
import {AnioBaseService} from '../../../core/services/anioBase.service';
import {Ciudad} from '../../../core/models/ciudad.model';
import {CiudadService} from '../../../core/services/ciudad.service';
import {TipoEncuestaService} from '../../../core/services/tipo_encuesta.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {MessageComponent} from './../../../shared/components/message/message.component';

@Component({
  selector: 'app-ruta-create',
  templateUrl: './ruta-create.component.html',
  styleUrls: ['./ruta-create.component.scss']
})
export class RutaCreateComponent implements OnInit {
 
  ruta:Ruta;
  ciudad:Ciudad;
  dataSource:Array<any>=[];
  dataSource2:Array<any>=[];
  dataSource3:Array<any>=[];
  dataSource4:Array<any>=[];
  cadenaTemp:Array<any>=[];
  cadena:Array<any>=[];
  ver1:boolean;
  displayedColumns =['nro','informante','direccion','giro','tipo_encuesta','observacion','accion'];
 
  constructor(public location:Location,
     public dialog: MatDialog,
     private ciudades:CiudadService, 
     private anioBase:AnioBaseService, 
     private tipo_encuesta: TipoEncuestaService, 
     private rutaService: RutaService) 
     {  
      
        this.rutaService.getAllRuta().subscribe((ruta:Ruta)=>{
        this.ruta=ruta;
        });

        this.ciudades.getAllCiudades().subscribe((data:any)=>{
          if (data.results){
            this.dataSource=data.results;
          }
        });

        this.tipo_encuesta.getAllTipoEncuesta().subscribe((data:any)=>{
          if (data.results){
            this.dataSource3=data.results;
          }
        });   
        
        this.anioBase.getAllAnioBase().subscribe((data:any)=>{
          if (data.results){
            this.dataSource4=data.results;
          }
        });  
      
    }

  
  ngOnInit()
  {
  }

 
  listaInformante(){     
    let dialogRef = this.dialog.open(ListaInformantesComponent, {width: '99%'});
    
    let sub = dialogRef.componentInstance.onAdd.subscribe((dato:any) => {
        this.cadena=this.dataSource2;
        this.cadenaTemp=dato; 
        this.cadena=this.cadena.concat(this.cadenaTemp);
        let hash = {};
        this.cadena = this.cadena.filter(o => hash[o.id] ? false : hash[o.id] = true);
        this.dataSource2=this.cadena;
    });
  }

  eliminarInformante(id:number){
    let title = "Eliminar Informante?";
    let message = "Al hacer clic en 'Eliminar', el Informante será eliminado. Desea continuar?";

    const dialogRef = this.dialog.open(DeleteMessageComponent, {
      width: '400px',
      data: {title: title, message: message}
    });

    dialogRef.afterClosed().subscribe(result => {
      let cadenTemp=[];
      this.dataSource2.forEach(element => {
        if(id!=element.id)
        {
          cadenTemp.push(element);
        }
      });
      this.dataSource2=cadenTemp;
        });
  }

  mensajeT(titulo:string, mensaj:string){
    let title = titulo;
    let message = mensaj;

    const dialogRef1 = this.dialog.open(MessageComponent, {
      width: '400px',
      data: {title: title, message: message}
    });
  }

  GuardarRutaDetalle(){
    
    if (this.ruta.nombre===undefined)
    {
      let title = "Aviso!";
      let message = "Debe de Ingresa el dato de Nombre de Circuito para continuar!";
      this.mensajeT(title,message);
    
    }
    else if(this.ruta.descripcion===undefined)
    {
      let title = "Aviso!";
      let message = "Debe de Ingresa la Descrición de Circuito para continuar!";
      this.mensajeT(title,message);
    }
    else if(this.ruta.ciudad===undefined)
    {
      let title = "Aviso!";
      let message = "Debe de Seleccionar una Ciudad para continuar!";
      this.mensajeT(title,message);
    }
    else if(this.ruta.anio_base===undefined)
    {
      let title = "Aviso!";
      let message = "Debe de Seleccionar un Año Base para continuar!";
      this.mensajeT(title,message);
    }
    else{
     let detalles=[];
     let k=1;
     let r=0;
     this.dataSource2.forEach(element => {
           if(element.tipo_encuesta_id==="")
           {  r=r+1
              return false;
           }
           else{
                detalles.push({"com_orden":k,
                               "informante":element.informante.id,
                               "tipo_encuesta":element.tipo_encuesta_id,
                               "observacion":element.observacion})
                               k++;
           }
    });
   
    let datos_form = {"nombre":this.ruta.nombre,
                        "descripcion":this.ruta.descripcion,
                        "ciudad":this.ruta.ciudad,
                        "anio_base":this.ruta.anio_base,
                        "detalles": detalles};
   
    if(r>0){
          r=0;
          let title = "Aviso!";
          let message = "Debe de Seleccionar una tipo de Encuesta, para proseguir!";
          this.mensajeT(title,message);
    } 
    else{
          this.ver1=true;   
          r=0;              
          this.rutaService.saveRutaDetalles(datos_form).subscribe(res=>{         
          this.ver1=false;
          let title = "Éxito!";
          let message = "El registro fue guardado!";
          const dialogRef1 = this.dialog.open(MessageComponent, {
            width: '400px',
            data: {title: title, message: message}
          });
          dialogRef1.afterClosed().subscribe(result => {
            this.location.back();
          });
        });
    }

    
  }
  
}

 
}
