import {Moment} from 'moment';
import {  LatLong } from '../core/models/generic/lat-long';


export class UtilHelper {

  static  getIdsNextPreview(array,id,key){
    let idPreview,idNext;

    console.log(array , id)

    let index = array.findIndex((e)=>{
      return e[key] == id
      });
     
    console.log('index',index);

    if(array.length==0 ||array.length==1 )  {
      idPreview=id;idNext=id
    }

    else if ((index - 1 ) < 0 ){
      idPreview=id;
      idNext=array[index+1][key];
    }

    else if(array.length==(index+1)){
      idPreview=array[index-1][key];
      idNext=id;
    }
    else{
      idPreview=array[index-1][key];
      idNext=array[index+1][key];
    }
    console.log('idPreview,idNext>>>',idPreview,idNext);
    return [idPreview,idNext];

  }
    

  public static formatPrecio(precio:any,convert_decimal=0,fixed=2):string{
    let num = parseFloat(precio);
    num = num / Math.pow(10,convert_decimal);
    let n = num.toFixed(fixed);

    return String(n);
  }

  public static getCurrentLocation() :LatLong{
    let latLong = new LatLong();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position>>',position);
        latLong.latitud = `${position.coords.latitude}`;
       latLong.longitud = `${position.coords.longitude}`;  
       return latLong;
      });
    } else {
      alert('Geolocation is not supported by this browser.');
      return latLong;
    }
   
    
  }

  public static  getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => { 
        resolve(position.coords);
      }, (err) => {
        reject(err);
      });
    });
  }

  public static zeroPad = (num, places) => String(num).padStart(places, '0')

}