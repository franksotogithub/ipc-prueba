import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { MovMercadoCasasModel } from 'src/app/core/models/mov_mercado_casas/mov-mercado-casas.model';
import { CameraService } from 'src/app/core/services/camera/camera.service';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { UrlService } from 'src/app/core/services/url/url.service';
import { TablesDB } from 'src/app/shared/enum/tables-db.enum';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  previousUrl: Observable<string> = this.urlService.previousUrl$;
  width: number;
  height: number;
  camera:boolean=true;
  previusUrl :string ='';

id: number;
  movMercadoCasasModel:MovMercadoCasasModel;
 @HostListener('window:resize', ['$event'])
 onResize(event?: Event) {
   const win = !!event ? (event.target as Window) : window;
   this.width = win.innerWidth;
   this.height = win.innerHeight;

   this.videoOptions.width={ideal: 300};
   this.videoOptions.height={ideal: 600};
   /*this.videoOptions.width={ideal: this.width};*/

    /*width : {ideal: 300},
    height : {ideal: 400}
   */

   if( this.width> this.height){
    this.videoOptions.width={ideal: 600};
    this.videoOptions.height={ideal: 400};
   }
   console.log('---------------------');
   console.log('width:>>',this.width);
   console.log('height:>>',this.height);


 }

 public showWebcam = true;
 public allowCameraSwitch = true;
 public multipleWebcamsAvailable = false;
 public deviceId: string;
 public videoOptions: MediaTrackConstraints = {
  width : {ideal: 300},
  height : {ideal: 600}
 
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

/*
  this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      console.log('previous url: ', previousUrl);
  });
*/
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
   private cameraService : CameraService,
   private urlService: UrlService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private idbService: IdbService,
 ) {

  
   this.onResize();
   this.urlService.previousUrl$.subscribe((previousUrl: string) => {
    this.previusUrl = previousUrl;
    
});


this.activatedRoute.params.subscribe((params: Params) => {
  this.id = parseInt(params.id);
  
   this.idbService.getItem(TablesDB.MOV_MERC_CASAS,this.id).then(data =>{

    this.movMercadoCasasModel = new MovMercadoCasasModel(data);
    if( this.movMercadoCasasModel.imgUrl){

      this.imageAsDataUrl = this.movMercadoCasasModel.imgUrl;
 
 
    }
  });

});

/*
async getItem(target, key) {
  this._db =await openDB(this.dataBaseName, this.version);
  return this._db.get(target, key);
}*/












  /* console.log('this.matDialogData>>>',this.matDialogData);
 
   if(this.matDialogData.imgUrl){

     this.imageAsDataUrl = this.matDialogData.imgUrl;


   }*/


   /*this.activatedRoute.url
   .subscribe(
     response => {

      console.log('response url',response);

      console.log('this.cameraService.getImgUrl>>>',this.cameraService.getImgUrl());

      if(this.cameraService.getImgUrl()){
        this.imageAsDataUrl = this.cameraService.getImgUrl();
      }

     });*/


   
   


  }
 ngOnDestroy(): void {
  
   /*this.dialogRef.close({ imgUrl:this.imageAsDataUrl});*/
 }

  openPhoto(){
   this.camera=false;
  }
  back(){
   this.camera=true;
  }
  guardar(){
    
    this.movMercadoCasasModel.imgUrl =this.imageAsDataUrl;
  
    
    this.idbService.updateItem(TablesDB.MOV_MERC_CASAS, this.movMercadoCasasModel,this.id);
     this.router.navigate([this.previusUrl]);
    /*
   this.dialogRef.close({ imgUrl:this.imageAsDataUrl});
*/
  }

}
