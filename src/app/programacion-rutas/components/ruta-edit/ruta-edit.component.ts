import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {DeleteMessageComponent} from './../../../shared/components/delete-message/delete-message.component';
import {ListaInformantesComponent} from './../lista_informantes/lista-informantes.component';
import {RutaService} from '../../../core/services/ruta.service';
import {Ruta} from '../../../core/models/ruta.model';
import {Ciudad} from '../../../core/models/ciudad.model';
import {CiudadService} from '../../../core/services/ciudad.service';
import {AnioBaseService} from '../../../core/services/anioBase.service';
import {TipoEncuestaService} from '../../../core/services/tipo_encuesta.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {MessageComponent} from './../../../shared/components/message/message.component';

@Component({
  selector: 'app-ruta-edit',
  templateUrl: './ruta-edit.component.html',
  styleUrls: ['./ruta-edit.component.scss']
})

export class RutaEditComponent implements OnInit {
  id: number;
  ruta:Ruta;
  ciudad:Ciudad;
  dataSource:Array<any>=[];
  dataSource2:Array<any>=[];
  dataSource3:Array<any>=[];
  dataSource4:Array<any>=[];
  cadenaTemp:Array<any>=[];
  cadena:Array<any>=[];
  ver1:boolean;
  cadenaAnt:Array<any>=[];
 // longitud:number;
  displayedColumns =['nro','informante','direccion','giro','tipo_encuesta','observacion','accion'];
 
  constructor(public location:Location,
     public dialog: MatDialog,
     private ciudades:CiudadService, 
     private anioBase:AnioBaseService, 
     private tipo_encuesta: TipoEncuestaService, 
     private activatedRoute: ActivatedRoute, 
     private rutaService: RutaService) 
     {  
      
        this.ver1=true;
        this.activatedRoute.params.subscribe((params: Params) => {
        this.id = parseInt(params.id);
       
        this.rutaService.getRutaDetalle(this.id).subscribe((ruta:Ruta)=>{
        this.ruta=ruta;
        this.dataSource2=ruta.detalles;
        this.guardarCodAnt(ruta.detalles);
        this.ver1=false;
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
       
      });
    }

  ngOnInit()
  {
    
  }

  guardarCodAnt(dato:any)
  {
      dato.forEach(element => {
          this.cadenaAnt.push(element.id);
      });
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



  EditarRutaDetalle(id:number){
   
    let detalles=[];
    let k=1;
    let r=0;
    this.dataSource2.forEach(element => {
  
        if(this.cadenaAnt.includes(element.id))
        {
         detalles.push({"id":element.id, 
                        "com_orden":element.orden,
                        "informante":element.informante.id,
                        "tipo_encuesta":element.tipo_encuesta_id,
                        "observacion":element.observacion
                        })
         }
         else
         {
            if(element.tipo_encuesta_id==="")
            {  r=r+1
              return false;
            } 
            else{
               detalles.push({"com_orden":k,
                        "informante":element.informante.id,
                        "tipo_encuesta":element.tipo_encuesta_id,
                        "observacion":element.observacion
                       })
            }
          k++;
        }
    });
  
      let datos_form= {"id":id,
                        "nombre":this.ruta.nombre,
                        "descripcion":this.ruta.descripcion,
                        "ciudad":this.ruta.ciudad,
                        "anio_base":this.ruta.anio_base,
                        "detalles": detalles};
   
         
     if(r>0){
           r=0;
           let title = "Aviso!";
           let message = "Debe de Seleccionar una tipo de Encuesta, para proseguir!";
           const dialogRef1 = this.dialog.open(MessageComponent, {
            width: '400px',
             data: {title: title, message: message}
         });
     } 
     else{    
              this.ver1=true;              
              this.rutaService.updateRutaDetalles(id,datos_form).subscribe(res=>{
              this.ver1=false; 
              let title = "Éxito!";
              let message = "El registro fue editado!";
              const dialogRef1 = this.dialog.open(MessageComponent, {
                 width: '400px',
                  data: {title: title, message: message}
              });
              dialogRef1.afterClosed().subscribe(result => {
              this.location.back();
              }); 
      })
    }    
  }

 
}


  
 

