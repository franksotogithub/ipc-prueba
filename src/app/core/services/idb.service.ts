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
    
    this._db = await openDB('ipc-local-database-1',10, {
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
        

        let tables2 = ['productos'];


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
    this._db.clear('programacion_ruta');
    this._db.clear('productos');

    this.programacionRutaService.getProgramacionRuta().subscribe(( data:any )=>{
      let results:ProgramacionRuta[] = data['results'];
      let idInformantes =[];
      let list_articulos:Producto[] = [];

      results.forEach((r)=>{
        this._db.add('programacion_ruta',r);
        Object.keys(r.informantes).map((key, index)=> {
          const articulos = r.informantes[key].articulos;
          Object.keys(articulos).map(async (key2, index)=> { 
              let art:Producto=articulos[key2];

              await this._db.put('productos',art,art.id);
              list_articulos.push(art);
          });
        });


      });

      this.programacionRutas$.next(results);
      this.productos$.next(list_articulos);



    });

    

    /*this._db.clear('informante');

    this.informanteService.getInformantesByUser().subscribe((datos:any)=>{
      let results =  datos['results'][0];
    
      let informantes = Object.keys(results["informantes"]).map((key) => results["informantes"][key]);
      console.log(informantes);
      informantes.forEach(item=>{this._db.add('informante',item);});
      this.informantes$.next(informantes);
      

    });*/

    
    /*this.directorioService.getAllDirectorioIPC().subscribe((datos :DirectorioIPC[])=>{
      datos.forEach(item=>{this._db.add('mercados',item);});
      this.mercados$.next(datos);

    });*/


    /*
    this._db.clear('mercados');
    this.directorioService.getAllDirectorioIPC().subscribe((datos :DirectorioIPC[])=>{
      datos.forEach(item=>{this._db.add('mercados',item);});
      this.mercados$.next(datos);

    });*/




/*
    this._db.clear('mercados');
    this.directorioService.getAllDirectorioIPC().subscribe((datos :DirectorioIPC[])=>{
      datos.forEach(item=>{this._db.add('mercados',item);});
      this.mercados$.next(datos);

    });
    
    this._db.clear('productos');
    this.productoService.getAllProductos().subscribe((datos:Producto[])=>{
      
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
*/
    
  }

  async limpiandoDatos(){
    this._db.clear('programacion_ruta');
    this._db.clear('productos');
    this.programacionRutas$.next(null);
    this.productos$.next(null);
  }
  async cargandoDatos(target){
    let productos=await this._db.getAll('productos');
    this.programacionRutaService.updateProductos(productos).subscribe(res=>{
      
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
