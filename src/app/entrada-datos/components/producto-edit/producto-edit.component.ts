import { Component, OnInit ,ViewChild, ElementRef ,Inject, HostListener} from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Producto} from './../../../core/models/producto.model';
import { Informante } from 'src/app/core/models/informante.model';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { ProgramacionRuta} from './../../../core/models/programacionRuta.model';
import {MatDialog} from '@angular/material/dialog';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Utils} from './../../../shared/class/utils';
import { DetEjecucionCircuitoResquest } from 'src/app/core/models/det-ejecucion-circuito/det-ejecucion-circuito.request';
import { TipoEncuesta } from 'src/app/shared/enum/tipo-encuesta.enum';
import { DetEjecucionCircuitoModel } from 'src/app/core/models/det-ejecucion-circuito/det-ejecucion-circuito.model';
import { MovMercadoCasasModel } from 'src/app/core/models/mov_mercado_casas/mov-mercado-casas.model';
import { UtilHelper } from 'src/app/util/util.helper';
import { MovMercadoCasasRequest } from 'src/app/core/models/mov_mercado_casas/mov_mercado_casas.request';
import { TablesDB } from 'src/app/shared/enum/tables-db.enum';
import { LatLong } from 'src/app/core/models/generic/lat-long';
import { Estado } from 'src/app/shared/enum/estado.enum';
import { OnDestroy } from '@angular/core';
import { MoneyDialogComponent } from 'src/app/shared/components/money-dialog/money-dialog.component';
import { AudioDialogComponent } from 'src/app/shared/components/audio-dialog/audio-dialog.component';
import { CameraService } from 'src/app/core/services/camera/camera.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss']
})
export class ProductoEditComponent implements OnInit {
  id
  ordenProducto;
  movMercadoCasas:MovMercadoCasasModel=new MovMercadoCasasModel();
  movMercadoCasasModelList : MovMercadoCasasModel[];
  informante:DetEjecucionCircuitoModel;
  preview;
  next;
  ces = [
    { id: 'N', name: 'Dato normal' },
    { id: 'T', name: 'Temporal dato que se repite' },
    { id: 'S', name: 'Supervisado en el mes' },
    { id: 'O', name: 'Precio estacional' },
    { id: 'F', name: 'Cerrado' },
  ];
  ESTADO=Estado;
  total:number=0;
  avance:number=0;
  cerrar:boolean=false;
  disabled=false;


  listEstado = [
    { estado: Estado.FINALIZADO, label: 'Orden Finalizada' },
    { estado: Estado.PENDIENTE, label: 'Orden Pendiente' },
    { estado: Estado.TEMPORAL, label: 'Orden Temporal' },
    { estado: Estado.CERRADO, label: 'Orden Cerrada' },
  ];
  labelEstado = '';

  estadosList: string[] = this.listEstado.map((e) => {
    return e.estado;
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private idbService:IdbService,
    public dialog: MatDialog,
    private cameraService: CameraService,
    private router: Router,
    ) {


    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = parseInt(params.id);
      this.ordenProducto = params.idProducto;
      this.getInformantesCasasComerciales();     
      
    });




   }

  ngOnInit() {
    this.cameraService.imgUrl$.subscribe(result=>{
      if(result){
        if (result.imgUrl)
        { 
          
          this.movMercadoCasas.imgUrl=`${result.imgUrl}`;          

          this.changeMovMercadoCasas(this.movMercadoCasas);

        }
      }
    });

  }


  getInformantesCasasComerciales() {
  
    
    this.idbService
    .getAllData(TablesDB.DET_EJEC_CIRCUITO)
    .then((values: DetEjecucionCircuitoResquest[]) => {
      
      let informantes = values
        .filter((i) => {
          return i.tipo_encuesta === TipoEncuesta.CASAS_COMERCIALES;
        })
        .map((e) => {
          return new DetEjecucionCircuitoModel(e);
        })


      this.informante = informantes.find((e) => {
        return e.orden == this.id;
      });


      this.getMovMercadoCasas();
    });


  }

  getMovMercadoCasas(){

    this.idbService
    .getAllData(TablesDB.MOV_MERC_CASAS)
    .then((values: MovMercadoCasasRequest[]) => {
      this.movMercadoCasasModelList = values
        .filter((p) => {
          return p.det_ejecucion == this.informante.id;
        })
        .map((p) => {
          return new MovMercadoCasasModel(p);
        })
        .sort((a, b) => {
          if (a.orden > b.orden) {
            return 1;
          }
          if (a.orden < b.orden) {
            return -1;
          }

          return 0;
        });

      this.movMercadoCasas= this.movMercadoCasasModelList.find((p)=>p.orden==this.ordenProducto);
      [this.preview, this.next]=UtilHelper.getIdsNextPreview(this.movMercadoCasasModelList,this.ordenProducto,'orden');

      this.getEstadoMovCasas();

    });
  }


  changeEstadoInformante() {
    this.avance = this.movMercadoCasasModelList.filter((e) => {
      return e.estado === Estado.FINALIZADO || e.estado === Estado.TEMPORAL;
    }).length;
    this.total = this.movMercadoCasasModelList.length;
    let cantTemp = this.movMercadoCasasModelList.filter((e) => {
      return e.estado === Estado.TEMPORAL;
    }).length;

    if (this.avance == this.total && cantTemp == 0) {
      this.informante.estado = Estado.FINALIZADO;
      this.cerrar = false;
      this.disabled = false;
    } else if (this.avance == this.total && cantTemp > 0) {
      this.informante.estado = Estado.TEMPORAL;
      this.cerrar = false;
      this.disabled = false;
    } else if (this.avance !== this.total || this.informante.estado == null) {
      this.informante.estado = Estado.PENDIENTE;
      this.cerrar = false;
      this.disabled = false;
    }



  }
  

  openCamera() {
    /*console.log('this.movMercadoCasas Inicial>>>',this.movMercadoCasas);
    this.cameraService.setImgUrl(this.movMercadoCasas.imgUrl);*/

   
    
  /*  this.cameraService.setPreviusUrl()*/


    /*const dialogRef = this.dialog.open(CameraDialogComponent,{
      width: '90%',
      data: {idProducto: this.ordenProducto ,imgUrl:this.movMercadoCasas.imgUrl},
      
      disableClose: true
      
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result){
        if (result.imgUrl)
        { 
          
          this.movMercadoCasas.imgUrl=`${result.imgUrl}`;          

          this.changeMovMercadoCasas(this.movMercadoCasas);

        }
      }
    });*/
  }

  openAudio(){
    const dialogRef = this.dialog.open(AudioDialogComponent,{
      width: '90%',
      data: {idProducto: this.ordenProducto ,audioUrl:this.movMercadoCasas.audioUrl},
      disableClose: true
      
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result){
        if (result.audioUrl)
        { 
          

          this.movMercadoCasas.audioUrl = `${result.audioUrl}`;          
          /*this.idbService.movMercadoCasas.next(this.movMercadoCasas);*/
          this.changeMovMercadoCasas(this.movMercadoCasas);
        }
      }
    });
  }



  changeMovMercadoCasasModel(
    m: MovMercadoCasasModel,
    precio?: boolean
  ) {
   

    let today = new Date();

    m.fecha_registro = `${today.toISOString()}`;
    if (precio) {
      m.precio = UtilHelper.formatPrecio(m.precio);
      if (m.precio == null || m.precio === 'NaN') {
        m.precio = UtilHelper.formatPrecio(0);
      }
    } 
 
    if (m.ce == 'T') {
      m.estado = Estado.TEMPORAL;
      m.precio = m.precio_anterior
      ? UtilHelper.formatPrecio(m.precio_anterior)
      : UtilHelper.formatPrecio(0);
    } 
    else if(m.ce=='F'){
      m.estado = Estado.CERRADO;
      m.precio = m.precio_anterior
      ? UtilHelper.formatPrecio(m.precio_anterior)
      : UtilHelper.formatPrecio(0);
    }
    else {
      if (
        m.precio !== null &&
        m.precio !== 'NaN' &&
        parseFloat(m.precio) !== 0.0 &&
        m.ce !== null
      ) {
        m.estado = m.ce == 'T' ? m.estado : Estado.FINALIZADO;
      } else {
        m.estado = Estado.PENDIENTE;
      }
    }

    this.labelEstado = this.listEstado.find((e)=> { return e.estado == this.movMercadoCasas.estado}).label;


    this.getCurrentLocation();
    this.changeEstadoInformante();
    this.changeMovMercadoCasas(m);
    
  }



  getEstadoMovCasas(){
   
    
    if( this.movMercadoCasas.estado==Estado.TEMPORAL){
      this.disabled=true;
      this.cerrar=false;
    }
    if(this.movMercadoCasas.estado==Estado.CERRADO)
    {
      this.cerrar=true;
      this.disabled = true;
    }
    this.labelEstado = this.listEstado.find((e)=> { return e.estado == this.movMercadoCasas.estado}).label;
  }


  changeMovMercadoCasas(movMercadoCasas: MovMercadoCasasModel){
    this.idbService.updateItem(TablesDB.MOV_MERC_CASAS,movMercadoCasas,movMercadoCasas.id);
  }

  changeInformante(informante : DetEjecucionCircuitoModel) {
    this.idbService.updateItem(TablesDB.DET_EJEC_CIRCUITO,informante,informante.id);
  }

  async getCurrentLocation() {
    if (
      this.informante.latitud == null ||
      this.informante.latitud == '0' ||
      this.informante.longitud == null ||
      this.informante.longitud == '0'
    ) {
      let coords = await UtilHelper.getPosition();

      this.informante.latitud = coords['latitude'];
      this.informante.longitud = coords['longitude'];
    }
  }
  convertMoneda(){

    const dialogRef = this.dialog.open(MoneyDialogComponent,{   
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result){
        if (result.confirm)
        { 
          this.movMercadoCasas.precio= result.precio;


        }
      }
    });

  }

}




@Component({
  selector: 'camera-dialog',
  templateUrl: './camera-dialog.html',
  styleUrls: ['./camera-dialog.scss']
})
export class CameraDialogComponent implements OnInit , OnDestroy{
   width: number;
   height: number;
   camera:boolean=true;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight;
  }

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  public imageAsDataUrl:string;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }


  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage.imageAsDataUrl);

    this.webcamImage = webcamImage;
    this.imageAsDataUrl = webcamImage.imageAsDataUrl;

  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
  ) {

   
    this.onResize();
    console.log('this.matDialogData>>>',this.matDialogData);
  
    if(this.matDialogData.imgUrl){

      this.imageAsDataUrl = this.matDialogData.imgUrl;


    }
    


   }
  ngOnDestroy(): void {
    /*throw new Error('Method not implemented.');*/
    this.dialogRef.close({ imgUrl:this.imageAsDataUrl});
  }

   openPhoto(){
    this.camera=false;
   }
   back(){
    this.camera=true;
   }
   guardar(){
    this.dialogRef.close({ imgUrl:this.imageAsDataUrl});
    /*
    (this.webcamImage)?(this.webcamImage.imageAsDataUrl)?this.dialogRef.close({ imgUrl:this.webcamImage.imageAsDataUrl}):false:false;

  */
   }
   
}
