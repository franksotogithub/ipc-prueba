export class LatLong{
  latitud: string;
  longitud : string;
  constructor(latitud?:string,longitud?:string){
    this.latitud = latitud?latitud:null;
    this.longitud = longitud?longitud:null;
  }
}