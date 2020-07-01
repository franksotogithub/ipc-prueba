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

@Injectable({
  providedIn: 'root'
})
export class IdbService   {
  _db;
  public mercados$ = new BehaviorSubject<any>([]);
  public productos$ = new BehaviorSubject<any>([]);
  public investigadores$ = new BehaviorSubject<any>([]);
  public movMercadoCab$ =new BehaviorSubject<any>([]);
  
  constructor(private directorioService:DirectorioService,
    private productoService : ProductoService,
    private investigadorService: InvestigadorService,
    private movMercadoCabService : MovMercadoCabService,
    ) { 
    this.connectToIDB();
  }

  async connectToIDB() {
    
    this._db = await openDB('ipc-local-database-1', 1, {
      upgrade(db){
        /*if(!db.objectStoreNames.contains('mercados')){
          db.createObjectStore('mercados',{keyPath: 'id', autoIncrement: true});
        }*/
        if(!db.objectStoreNames.contains('mercados'))
        {
          const store=db.createObjectStore('mercados',{keyPath: 'id', autoIncrement: true});
          store.createIndex('id', 'id');
      
        }

        if(!db.objectStoreNames.contains('mov_mercados_cab'))
        {
          const store=db.createObjectStore('mov_mercados_cab',{keyPath: 'id', autoIncrement: true});
          store.createIndex('id', 'id');
      
        }
        if(!db.objectStoreNames.contains('productos'))
        {
          const store=db.createObjectStore('productos',{keyPath: 'id', autoIncrement: true});
          store.createIndex('id', 'id');
      
        }

        if(!db.objectStoreNames.contains('investigadores'))
        {
          const store=db.createObjectStore('investigadores',{keyPath: 'id', autoIncrement: true});
          store.createIndex('id', 'id');
      
        }
        
        
      }
  
    });



    this.movMercadoCab$.next(await this._db.getAllFromIndex('mov_mercados_cab', 'id'));
    this.mercados$.next(await this._db.getAllFromIndex('mercados', 'id'));
    this.productos$.next(await this._db.getAllFromIndex('productos', 'id'));
    this.investigadores$.next(await this._db.getAllFromIndex('investigadores', 'id'));

  }


  addItems(target: string, value: any) {
    this._db.add(target,value);
    
  }

  getAllData(target: string) {
    return this._db.getAllFromIndex(target, 'id');
  }

  deleteAllData(target){

  }

  async descargandoDatos(){
    this._db.clear('mercados');
    this.directorioService.getAllDirectorioIPC().subscribe((datos :DirectorioIPC[])=>{
      datos.forEach(item=>{this._db.add('mercados',item);});
      this.mercados$.next(datos);

    });
    
    this._db.clear('productos');
    this.productoService.getAllProductos().subscribe((datos:Producto[])=>{
      /*this._db.clear('productos');*/
      datos.forEach(item=>{
        this._db.add('productos',item);
      });
      this.productos$.next(datos);
      
    });

    this._db.clear('investigadores');
    this.investigadorService.getAllInvestigadores().subscribe((datos:Investigador[])=>{
      datos.forEach(item=>{
        this._db.add('investigadores',item);
      });
      this.investigadores$.next(datos);
    });

    
  
    /*this.mercados$.next(await this._db.getAllFromIndex('mercados', 'id'));
    this.productos$.next(await this._db.getAllFromIndex('productos', 'id'));
    this.investigadores$.next(await this._db.getAllFromIndex('investigadores', 'id'));*/
  }

  async cargandoDatos(target){

      let movMercadosCab=await this._db.getAllFromIndex('mov_mercados_cab', 'id');

      movMercadosCab.forEach((item)=>{
        console.log('item>>',item);
        this.movMercadoCabService.createMovMercadoCab(item).subscribe((newMovMercadoCab)=>{
          console.log('newMovMercadoCab>>>',newMovMercadoCab);
        });
      });
    

  }
}