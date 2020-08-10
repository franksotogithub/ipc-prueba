import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  isNotification = new Subject<boolean>();

  isNotificationError = new Subject<boolean>();

  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }

  showNotification(){
    this.isNotification.next(true);
  }
  
  showNotificationError(){
    this.isNotificationError.next(true);
  }
  constructor() { }
}
