import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-informante-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title:string='';
  message:string='';
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,) {

      

     }

  ngOnInit() {

    (this.matDialogData.title)?this.title=this.matDialogData.title:false;      
    (this.matDialogData.message)?this.message=this.matDialogData.message:false;      
    
  }

  confirmar(e:boolean){    
      this.dialogRef.close({ confirm:e});
      
  }

}
