import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { async } from '@angular/core/testing';

import { DatosResquest } from '../../models/datos/datos.request';

import { DetEjecucionCircuitoResquest } from '../../models/det-ejecucion-circuito/det-ejecucion-circuito.request';
import { MovMercadoCasasRequest } from '../../models/mov_mercado_casas/mov_mercado_casas.request';
import { DatosService } from '../datos/datos.service';
import {
  DATA_BASE_NAME,
  DATA_VERSION,

} from 'src/app/global/constants';

import {TablesDB} from 'src/app/shared/enum/tables-db.enum';
import { DetEjecucionCircuitoModel } from '../../models/det-ejecucion-circuito/det-ejecucion-circuito.model';
import { MovMercadoCasasModel } from '../../models/mov_mercado_casas/mov-mercado-casas.model';
import { DatosModel } from '../../models/datos/datos.model';


@Injectable({
  providedIn: 'root',
})
export class IdbService {
  _db;
  dataBaseName = DATA_BASE_NAME;
  version = DATA_VERSION;
  tables = [TablesDB.DET_EJEC_CIRCUITO, TablesDB.MOV_MERC_CASAS];
  public detEjecCircuito: BehaviorSubject<
    DetEjecucionCircuitoResquest
  > = new BehaviorSubject<DetEjecucionCircuitoResquest>(null);

  public detEjecCircuitoList: BehaviorSubject<
    DetEjecucionCircuitoResquest[]
  > = new BehaviorSubject<DetEjecucionCircuitoResquest[]>([]);

  public movMercadoCasas: BehaviorSubject<
    MovMercadoCasasRequest
  > = new BehaviorSubject<MovMercadoCasasRequest>(null);

  public movMercadoCasasList: BehaviorSubject<
    MovMercadoCasasRequest[]
  > = new BehaviorSubject<MovMercadoCasasRequest[]>([]);

  constructor(
    
    private datosService: DatosService
  ) {
    this.connectToIDB();
  }

  async connectToIDB() {
    this._db = await openDB(this.dataBaseName, this.version, {
      upgrade(db) {
        let tables = [TablesDB.DET_EJEC_CIRCUITO, TablesDB.MOV_MERC_CASAS];

        tables.map((table) => {
          
          const store = db.createObjectStore(table);
        });
        
      },
    });
    
/*
    this.detEjecCircuito.subscribe(async (p: DetEjecucionCircuitoResquest) => {
      if(p){
        console.log('holasss');
        await this._db.put(TablesDB.DET_EJEC_CIRCUITO, p, p.id);
        //this.detEjecCircuitoList.next(await this._db.getAll(TablesDB.DET_EJEC_CIRCUITO));
      }
    });
    
*/
    /*

    this.movMercadoCasas.subscribe(async (p: MovMercadoCasasRequest) => {
      if(p){
        await this._db.put(TablesDB.MOV_MERC_CASAS, p, p.id);
        //this.movMercadoCasasList.next(await this._db.getAll(TablesDB.MOV_MERC_CASAS));
      }
    });
*/
    /*
    this.detEjecCircuitoList.subscribe(
      async (list: DetEjecucionCircuitoResquest[]) => {
        list.map(async (p) => {
          
          await this._db.put(TablesDB.DET_EJEC_CIRCUITO, p, p.id);
        });
      }
    );

    this.movMercadoCasasList.subscribe(
      async (list: MovMercadoCasasRequest[]) => {
        list.map(async (p) => {
        
          await this._db.put(TablesDB.MOV_MERC_CASAS, p, p.id);
        });
      }
    );*/

    
/*
    this.detEjecCircuitoList.next(
      await this._db.getAll(TablesDB.DET_EJEC_CIRCUITO)
    );

    this.movMercadoCasasList.next(
      await this._db.getAll(TablesDB.MOV_MERC_CASAS)
      );*/
  }

  addItems(target: string, value: any) {
    this._db.add(target, value);
  }

  async getAllData(target: string) {
    this._db =await openDB(this.dataBaseName, this.version);
    let datos= await this._db.getAll(target);    

    return datos;
  }

  async deleteAllData(target) {
    this._db =await openDB(this.dataBaseName, this.version);
       
    this._db.clear(target);
  }

  async getItem(target, key) {
    this._db =await openDB(this.dataBaseName, this.version);
    return this._db.get(target, key);
  }

  async updateItem(target, value, key) {
    this._db =await openDB(this.dataBaseName, this.version);
    
    this._db.put(target, value, key);
  }

  async descargandoDatos() {
    this.tables.map((table) => {
      this._db.clear(table);
    });

    this.datosService.descargarDatos().subscribe((datos: DatosResquest) => {

      this.detEjecCircuitoList.next(datos.det_ejecucion_circuito);
      this.movMercadoCasasList.next(datos.mov_mercado_casas);
    });
  }

  async limpiandoDatos() {
 
  }
  async cargandoDatos(target) {

    let datos = new DatosModel();
    datos.det_ejecucion_circuito= await this._db.getAll(TablesDB.DET_EJEC_CIRCUITO);
    datos.mov_mercado_casas= await this._db.getAll(TablesDB.MOV_MERC_CASAS);
    
    this.datosService.cargarDatos(datos).subscribe(res=>{
      if(res.result){
        console.log('carga completada');
      }
    });
    

    /*
    let informantes=await this._db.getAll('informantes');
    let articulos=await this._db.getAll('productos');
    let data ={};

    informantes.forEach((v)=>{delete v.articulos; delete v.giro; });
    data['informantes'] = informantes;

    data['articulos'] = articulos;
    
    this.programacionRutaService.cargarProgramacionRuta(data).subscribe(res=>{
      
    })
     */
  }



}
