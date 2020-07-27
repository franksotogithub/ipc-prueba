import { Component, OnInit ,ViewChild, ElementRef ,Inject} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto} from './../../../core/models/producto.model';
import { Informante } from 'src/app/core/models/informante.model';
import { IdbService } from 'src/app/core/services/idb.service';
import { ProgramacionRuta} from './../../../core/models/programacionRuta.model';
import {MatDialog} from '@angular/material/dialog';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss']
})
export class ProductoEditComponent implements OnInit {
  id
  idProducto;
  producto:Producto;
  informante:Informante;
  preview;
  next;
  ces =[
    {id:"N" ,name:"Dato normal"},
    {id:"O" ,name:"Precio estacional "},
    {id:"S" ,name:" Supervisado en el mes 'n' "},
    {id:"T" ,name: "Temporal dato que se repite"}  

  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private idbService:IdbService,
    public dialog: MatDialog
    ) {





    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = parseInt(params.id);
      this.idProducto = parseInt(params.idProducto);


      this.idbService.programacionRutas$.subscribe((datos:Array<ProgramacionRuta> )=>{
        
        if (datos.length>0){
          let programacionRuta=datos[0];

          let informantes = Object.keys(programacionRuta.informantes)
          .map(i => programacionRuta.informantes[i])
          
          this.informante = informantes.find((e:Informante)=>{
            return e.id === this.id
            });
          }



      }); 


      this.idbService.productos$.subscribe((productos:Producto[])=>{
        productos = productos.filter((p)=>p.informante_id==this.id);
        this.producto= productos.find((p)=>p.id==this.idProducto);
        /*this.preview;
        next;*/
        [this.preview,this.next] = this.getIdsNextPreview(productos,this.idProducto);

      });
      

      /*this.producto={
        orden:1,
        codigo:'001',
        producto:'producto1',
        marca:'marca1',
        cap:'100L',
        presentacion:'presentacion1',
        id:1,
        precio:0,
        ce:'N',
        observacion:''
      }*/
           
    });





   }

  ngOnInit() {
  }


  openCamera() {
    const dialogRef = this.dialog.open(CameraDialogComponent,{
      /*width: '400px',*/
      data: {idProducto: this.idProducto}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        if (result.imgUrl)
        { 
          this.producto.imgUrl=result.imgUrl;          
          this.idbService.producto$.next(this.producto);
        }
      }
    });
  }

  change(producto:Producto){
    this.idbService.producto$.next(producto);
  }

  
  getIdsNextPreview(array,id){
    let idPreview,idNext;

    console.log('array,id>>',array,id);

    let index = array.findIndex((e:Informante)=>{
      return e.id === id
      });
      console.log('index>>',index);
    if(array.length==0)  {
      idPreview=id;idNext=id
    }

    else if ((index - 1 ) < 0 ){
      idPreview=id;
      idNext=array[index+1].id;
    }

    else if(array.length==(index+1)){
      idPreview=array[index-1].id;
      idNext=id;
    }
    else{
      idPreview=array[index-1].id;
      idNext=array[index+1].id;
    }
    console.log('idPreview,idNext>>',idPreview,idNext);
    return [idPreview,idNext];

  }
}



@Component({
  selector: 'camera-dialog',
  templateUrl: './camera-dialog.html',
  styleUrls: ['./camera-dialog.scss']
})
export class CameraDialogComponent implements OnInit{

  /*
  @ViewChild("video",{'static':true})
  public video: ElementRef;

  @ViewChild("canvas",{'static':true})
  public canvas: ElementRef;

  public captures: Array<any>;
  public c: any;
  public constructor(private idbService:IdbService) {
      this.captures = [];
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
              this.video.nativeElement.srcObject=stream; 
              this.video.nativeElement.play();
          });
      }
  }


  public capture() {
      var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 480, 480);
      this.c=this.canvas.nativeElement.toDataURL("image/png");
      console.log('this.c>>>',this.c);
  }*/


  // toggle webcam on/off
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

   

      /*this.data=  this.matDialogData.data ;
      this.action=this.matDialogData.action;
      this.actionItemSelect=this.actionItems.find(x=>x.action==this.action);*/
   }

   guardar(){
    (this.webcamImage)?(this.webcamImage.imageAsDataUrl)?this.dialogRef.close({ imgUrl:this.webcamImage.imageAsDataUrl}):false:false;
   }
   
}