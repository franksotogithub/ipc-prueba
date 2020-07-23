import { Component, OnInit } from '@angular/core';
import { IdbService } from 'src/app/core/services/idb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ProgramacionRuta} from './../../../core/models/programacionRuta.model';
import * as moment from 'moment';


import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-comerciales-list',
  templateUrl: './comerciales-list.component.html',
  styleUrls: ['./comerciales-list.component.scss']
})
export class ComercialesListComponent implements OnInit {
  
  datos = {
    usuario: '',
    fecha:'',
    ruta:'',
    circuito:0,
    distrito:'',
    ubicacion:'',
  }
  dataSource=[];
  
  displayedColumns = ['ruc','establecimiento','direccion','giro','avance','estado','id'];


  ngOnInit() {
 
   
  }

  constructor(
    private idbService:IdbService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
    ) 
    {


      this.idbService.programacionRutas$.subscribe((datos:Array<ProgramacionRuta> )=>{
        
        if (datos.length>0){

          let programacionRuta=datos[0];
  
          let ruta = programacionRuta.ruta;
          
          let investigador= programacionRuta.investigador;
        
        
  
          this.datos.ruta=ruta.nombre;
          this.datos.fecha =moment(ruta.fecha_inicio).format('YYYY-MM-DD');;
          
          this.datos.usuario = investigador.nombre;
          this.datos.circuito = ruta.circuito;
          this.datos.distrito = ruta.ciudad_nombre;
          this.datos.ubicacion = ruta.descripcion;
        
        this.dataSource = Object.keys(programacionRuta.informantes).map(i => programacionRuta.informantes[i]); ;

        }
        
        
      });  

      
      /*this.breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        this.displayedColumns = result.matches ? 
        ['id','establecimiento'] : 
        ['id','ruc','establecimiento','direccion','giro','avance','estado'];
      });*/
      /*this.displayedColumns = ['id','ruc','establecimiento','direccion','giro','avance','estado'];*/
      
  }


  /*private buildForm() {
    this.form = this.formBuilder.group({
      usuario: [''],
      title: [''],
      price: [''],
      image: [''],
      description: [''],
    });
  }*/

  edicion(idInformante:number){

  }
}
