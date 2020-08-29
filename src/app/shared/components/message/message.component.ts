import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  title;
  message;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any

  ) { 

    this.title=matDialogData.title;
    this.message=matDialogData.message;
  }

  ngOnInit() {
  }
  
  closeDialog(opc: boolean){
    this.dialogRef.close({opc:opc});
  }
}
