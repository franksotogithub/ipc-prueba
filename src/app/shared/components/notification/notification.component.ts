import { Component, OnInit , Input } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { LoaderService } from './../../../core/services/loader.service' ;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
/*
  constructor() { }

  ngOnInit() {
  }
*/

@Input() message="cargado";
@Input() message_error="error";

isNotification: Subject<boolean> = this.loaderService.isNotification;
isNotificationError: Subject<boolean> = this.loaderService.isNotificationError;

constructor(private loaderService: LoaderService,private _snackBar: MatSnackBar
  ) { 
    
    this.isNotification.subscribe((n)=>{
      
      this._snackBar.open(this.message, '', {
        duration: 2000,
      });
    });

    this.isNotificationError.subscribe((n)=>{
      
      this._snackBar.open(this.message_error,'cerrar', {
        duration: 10000,
        /*panelClass: ['mat-toolbar', 'mat-']*/
      
      });
    });
}

ngOnInit() {
}


}
