import { Component, OnInit,AfterViewInit,Inject ,ViewChild,Input} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.scss']
})
export class DeleteMessageComponent implements OnInit {
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
    this.dialogRef.close({ opc:opc});
  }
}
