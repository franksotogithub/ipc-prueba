import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cerrar-dialog',
  templateUrl: './cerrar-dialog.component.html',
  styleUrls: ['./cerrar-dialog.component.scss']
})
export class CerrarDialogComponent implements OnInit {

  title:string
  
  date_start = new Date();
  date_end = new Date();
  maxDate = new Date();
  observacion: string;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,) {

      
     }

  ngOnInit() {
      this.title="Cerrar Informante";
    
  }

  
  confirmar(e:boolean){    
    
    this.dialogRef.close({confirm:e,observacion:this.observacion});
  }

}
