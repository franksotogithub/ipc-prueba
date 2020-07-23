import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto} from './../../../core/models/producto.model';
import { Informante } from 'src/app/core/models/informante.model';
import { IdbService } from 'src/app/core/services/idb.service';
import { ProgramacionRuta} from './../../../core/models/programacionRuta.model';
import {MatDialog} from '@angular/material/dialog';


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


      this.producto={
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
      }
           
    });





   }

  ngOnInit() {
  }


  openCamera() {
    const dialogRef = this.dialog.open(CameraDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}



@Component({
  selector: 'camera-dialog',
  templateUrl: './camera-dialog.html',
  styleUrls: ['./camera-dialog.scss']
})
export class CameraDialogComponent implements OnInit{

  
  @ViewChild("video",{'static':true})
  public video: ElementRef;

  @ViewChild("canvas",{'static':true})
  public canvas: ElementRef;

  public captures: Array<any>;
  public c: any;
  public constructor() {
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
  }

}
