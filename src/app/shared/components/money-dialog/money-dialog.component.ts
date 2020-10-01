import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilHelper } from 'src/app/util/util.helper';

@Component({
  selector: 'app-money-dialog',
  templateUrl: './money-dialog.component.html',
  styleUrls: ['./money-dialog.component.scss']
})
export class MoneyDialogComponent implements OnInit {
  
  monedaExtranjera=0;
  tipoCambio=0;
  monedaNacional='0.00';

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,) {

      

     }

  ngOnInit() {

 
    
  }

  confirmar(e:boolean){    
      this.dialogRef.close({ confirm:e,precio:this.monedaNacional});
  }

  changePrecio(){
    this.monedaNacional=UtilHelper.formatPrecio( this.tipoCambio*this.monedaExtranjera);
  }

}
