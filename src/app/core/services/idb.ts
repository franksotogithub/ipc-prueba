import {openDB ,DBSchema } from 'idb';



export class Idb   {
    _db;
    public data_ini:Array<any>
    constructor(target) { 
      this.connectToIDB(target);
    }
  
    async connectToIDB(target) {
      
      this._db = await openDB('ipc-local-database-1', 1, {
        upgrade(db){
          /*if(!db.objectStoreNames.contains('mercados')){
            db.createObjectStore('mercados',{keyPath: 'id', autoIncrement: true});
          }*/
          if(!db.objectStoreNames.contains(target))
          {
            const store=db.createObjectStore(target,{keyPath: 'id', autoIncrement: true});
            store.createIndex('id', 'id');
        
          }
  
          
        }
    
      });
      
      this.data_ini= await this._db.getAllFromIndex(target, 'id');

    }
  
    
    addItems(target: string, value: any) {
      this._db.add(target,value);
    }

    getAllData(target: string) {
      return  this._db.getAllFromIndex(target, 'id');
    }
  
  }
  