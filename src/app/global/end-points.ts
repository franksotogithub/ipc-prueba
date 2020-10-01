export class EndPoints {
  
  public static get API_V1(): string {return  `/api/v1`};
  public static get RUTAS(): string {return `${EndPoints.API_V1}/rutas`;}
  public static get DATOS(): string {return `${EndPoints.RUTAS}/datos`;}
  public static get DESCARGAR_DATOS(): string {return  `${EndPoints.DATOS}/descarga_datos`};
  public static get CARGAR_DATOS(): string {return  `${EndPoints.DATOS}/cargar_datos/`};
  

}

