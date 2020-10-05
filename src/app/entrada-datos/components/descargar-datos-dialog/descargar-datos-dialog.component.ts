import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-descargar-datos-dialog',
  templateUrl: './descargar-datos-dialog.component.html',
  styleUrls: ['./descargar-datos-dialog.component.scss']
})
export class DescargarDatosDialogComponent implements OnInit {
  title:string
  message
  date_start = new Date();
  date_end = new Date();
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,) {

      
     }

  ngOnInit() {
 this.title='Descargando datos';      
    
  }

  confirmar(e:boolean){    

    this.dialogRef.close({confirm:e,date_start:this.date_start,date_end:this.date_end});
      
  }

}
