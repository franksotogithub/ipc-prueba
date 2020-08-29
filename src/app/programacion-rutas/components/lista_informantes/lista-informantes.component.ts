import { Component, OnInit,Inject, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DirectorioService} from '../../../core/services/directorio.service';
import {Ciudad} from '../../../core/models/ciudad.model';
import {CiudadService} from '../../../core/services/ciudad.service';
import {GiroService} from '../../../core/services/giro.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-informantes',
  templateUrl: './lista-informantes.component.html',
  styleUrls: ['./lista-informantes.component.scss']
})
export class ListaInformantesComponent implements OnInit {

  ciudad:Ciudad;
  dataSource:Array<any>=[];
  dataSource1:number;
  dataSource2:number;
  dataSource3:Array<any>=[];
  dataSource4:Array<any>=[];
  ver1:boolean;
  pag:number;
  area_interes=[];
  id_interes=[];
  onAdd = new EventEmitter();
  

  displayedColumns =['nro','anio_base','cod_info','cod_ipc','razon_social','giro','ciudad','direccion','checked'];

  constructor(
    public dialogRef: MatDialogRef<any>,
    private ciudades:CiudadService, 
    private giro_empresa: GiroService,
    private directorioService:DirectorioService,   
    @Inject(MAT_DIALOG_DATA) public matDialogData: any)
     {  
 
        this.ver1=true;
        this.directorioService.getAllDirectorioIPC().subscribe((data:any)=>{
            if (data.results){
              this.dataSource=data.results;
              this.dataSource1=data.page_size;
              this.dataSource2=data.count;
              this.pag=0;            
            }  
        this.ver1=false;
        });

        this.ciudades.getAllCiudades().subscribe((data:any)=>{
          if (data.results){
            this.dataSource3=data.results;
          }
        });

        this.giro_empresa.getAllGiroEmpresa().subscribe((data:any)=>{
          if (data.results){
            this.dataSource4=data.results;
          }
        });    
       
    }

  ngOnInit() {
  }


  agregar(id:number,cod:string,nombre_com:string, giro_n:string) {
    this.area_interes.push ({"i":"","informante":{"id":id,"codigo_ipc":cod,"nombre_comercial":nombre_com,"giro":giro_n},"tipo_encuesta_id":"","observacion":"","id":id});
    this.id_interes.push(id);
  }

   enviarData()
   {
      this.onAdd.emit(this.area_interes);
   }

  getPaginatorData(event){
    let pag=parseInt(event.pageIndex)+1;
    this.ver1=true;
    this.directorioService.getDirectorioPag(pag).subscribe((data:any)=>{
      if (data.results){
          this.pag=(pag-1);
          let datas = data.results;    
          let arrayTemp=[];
          datas.forEach(element => {
                if(this.id_interes.includes(element.id_directorio_ipc))
                { 
                  element.checked=true;}
                else 
                 { element.checked=false;}
                arrayTemp.push(element);
          });
          
          this.dataSource1=data.page_size;
          this.dataSource2=data.count;
          this.dataSource=arrayTemp;
          this.ver1=false;
      }
    });
  }  
     
 /* filtrar(event) {
    let pag=parseInt(event.pageIndex)+1;
    const filtro = (event.target as HTMLInputElement).value;
    let arrayTemp1=[];
    let arrayTemp2=[];
    this.directorioService.getDirectorioPag(pag).subscribe((data:any)=>{
          arrayTemp1=data.results;
          arrayTemp1.forEach(element => { 
           if(element.giro.nombre.toLowerCase().includes(filtro.toLowerCase()))
            { 
             arrayTemp2.push(element);
            }
            if(element.direccion.toLowerCase().includes(filtro.toLowerCase()) )
            { 
             arrayTemp2.push(element);
            }
        });
        this.dataSource=arrayTemp2;
        this.dataSource1=50;
        this.dataSource2=arrayTemp2.length;
          
      }); 
  }*/
             
    
}
