import { Injectable } from '@angular/core';
import {openDB ,DBSchema } from 'idb';
import {Observable, Subject,BehaviorSubject} from 'rxjs';
import {Producto} from './../models/producto.model';
import {DirectorioIPC} from './../models/directorio.model';
import {Investigador} from './../models/investigador.model';
import {MovMercadoCab} from './../models/movMercadoCab.model';

import {DirectorioService} from './directorio.service';
import {ProductoService} from './producto.service';
import { InvestigadorService } from './investigador.service';

import { MovMercadoCabService } from './mov-mercado-cab.service';
import { InformanteService } from './informante.service';
import { Informante } from '../models/informante.model';
import { ProgramacionRuta} from '../models/programacionRuta.model';
import {ProgramacionRutaService} from './programacion-ruta.service';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class IdbService   {
  _db;
  public mercados$ = new BehaviorSubject<any>([]);
  public productos$ = new BehaviorSubject<any>([]);
  public investigadores$ = new BehaviorSubject<any>([]);
  public movMercadoCab$ =new BehaviorSubject<any>([]);
  public informantes$ =new BehaviorSubject<Informante[]>([]);
  public informante$ = new BehaviorSubject<Informante>(null);
  public programacionRutas$ = new BehaviorSubject<ProgramacionRuta[]>([]);
  public producto$ = new BehaviorSubject<Producto>(null);
  
  constructor(
    /*private directorioService:DirectorioService,
    private productoService : ProductoService,
    private investigadorService: InvestigadorService,*/
    /*private movMercadoCabService : MovMercadoCabService,
    private informanteService: InformanteService*/
    private programacionRutaService:ProgramacionRutaService

    ) { 
    this.connectToIDB();
  }

  async connectToIDB() {
    
    this._db = await openDB('ipc-local-database-3',12, {
      upgrade(db){

        /*let tables = ['investigador','informante','ruta'];*/
        let tables = ['programacion_ruta'];

        tables.forEach((table)=>{
          if(!db.objectStoreNames.contains(table))
          {
            const store=db.createObjectStore(table,{keyPath: 'id', autoIncrement: true});
            store.createIndex('id', 'id');        
          }
        });
        

        let tables2 = ['productos','informantes'];


        tables2.forEach((table)=>{
          if(!db.objectStoreNames.contains(table))
          {

            const store=db.createObjectStore(table);

            /*store.createIndex('id', 'id'); */

          }
        });

        

      }
  
    });


    this.programacionRutas$.next(await this._db.getAllFromIndex('programacion_ruta', 'id'));
    this.productos$.next(await this._db.getAll('productos'));
    this.informantes$.next(await this._db.getAll('informantes'));
    
    
    /*
    this.informantes$.next(await this._db.getAllFromIndex('informante', 'id'));
*/
/*
    this.movMercadoCab$.next(await this._db.getAllFromIndex('mov_mercados_cab', 'id'));
    this.mercados$.next(await this._db.getAllFromIndex('mercados', 'id'));
    this.productos$.next(await this._db.getAllFromIndex('productos', 'id'));
    this.investigadores$.next(await this._db.getAllFromIndex('investigadores', 'id'));
*/
    


    this.producto$.subscribe(async(p)=>{
       await this._db.put('productos',p,p.id);

    });

    this.informante$.subscribe(async(p)=>{
      await this._db.put('informantes',p,p.id_directorio_ipc);
    })

    
  }


  addItems(target: string, value: any) {
    this._db.add(target,value);
    
  }

  getAllData(target: string) {
    return this._db.getAllFromIndex(target, 'id');
  }

  deleteAllData(target){
    this._db.clear(target);
  }

  getItem(target,key){
    return this._db.get(target,key);
  }

  updateItem(target,value,key){
    this._db.put(target,value,key);
  }

   /*async descargandoDatos(resolve,reject){*/
    async descargandoDatos(){
    this._db.clear('programacion_ruta');
    this._db.clear('productos');
    this._db.clear('informantes');
    let message="";
    this.programacionRutaService.descargarProgramacionRuta().subscribe(( data:any )=>{
      let results:ProgramacionRuta[] = data['results'];
      let idInformantes =[];
      let list_articulos:Producto[] = [];
      let list_informantes:Informante[] = [];
      results.forEach((r)=>{
        this._db.add('programacion_ruta',r);
        Object.keys(r.informantes).map(async(key, index)=> {
          const informante:Informante = r.informantes[key];
          await this._db.put('informantes',informante,informante.id_directorio_ipc);
          list_informantes.push(informante);
          const articulos = r.informantes[key].articulos;

          Object.keys(articulos).map(async (key2, index)=> { 
              let art:Producto=articulos[key2];

              await this._db.put('productos',art,art.id);
              list_articulos.push(art);
          });
        });
        this.programacionRutas$.next(results);
        this.productos$.next(list_articulos);
        this.informantes$.next(list_informantes);
        /*message = 'Datos descargados';
        resolve(message);*/
        
      });
    },
    /*(error)=>{
      message = 'Error al descargar datos';
      reject(message);
    
    }*/
    
    );
    
    
    
  }

  async limpiandoDatos(){
    this._db.clear('programacion_ruta');
    this._db.clear('productos');
    this.programacionRutas$.next(null);
    this.productos$.next(null);
  }
  async cargandoDatos(target){
    let informantes=await this._db.getAll('informantes');
    let articulos=await this._db.getAll('productos');
    let data ={};

    informantes.forEach((v)=>{delete v.articulos; delete v.giro; });
    data['informantes'] = informantes;

    data['articulos'] = articulos;
    
    this.programacionRutaService.cargarProgramacionRuta(data).subscribe(res=>{
      
    })
      /*let movMercadosCab=await this._db.getAllFromIndex('mov_mercados_cab', 'id');

      movMercadosCab.forEach((item)=>{
        console.log('item>>',item);
        this.movMercadoCabService.createMovMercadoCab(item).subscribe((newMovMercadoCab)=>{
          console.log('newMovMercadoCab>>>',newMovMercadoCab);
        });
      });
    */

  }

}
