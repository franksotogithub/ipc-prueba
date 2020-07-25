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
isNotification: Subject<boolean> = this.loaderService.isNotification;

constructor(private loaderService: LoaderService,private _snackBar: MatSnackBar
  ) { 
    
    this.isNotification.subscribe((n)=>{
      console.log('holasss');
      this._snackBar.open(this.message, '', {
        duration: 2000,
      });
    });
    
}

ngOnInit() {
}


}
