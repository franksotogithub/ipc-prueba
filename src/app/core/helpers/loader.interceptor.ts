import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor ,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { Observable,of } from 'rxjs';

import { LoaderService } from '../services/loader.service';
import { finalize ,tap,catchError,} from 'rxjs/operators';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    /*return next.handle(request).pipe(
    catchError((err: any)=>{
      this.loaderService.showNotificationError();
      return of(err);
      
    }),
    finalize(()=>{

      this.loaderService.hide();
      this.loaderService.showNotification();
      }
   
    ),);*/
    return next.handle(request).pipe(
      tap(evt => {
          if (evt instanceof HttpResponse) {
              if(evt != null) {
                    
              this.loaderService.hide();
              this.loaderService.showNotification();
               }  
          }
      }),
      catchError((err: any) => {
          if(err instanceof HttpErrorResponse) {
              try {
                          
              this.loaderService.hide();
              this.loaderService.showNotificationError();                    
              } catch(e) {
                 console.log('error>>>',e);
              }
          }
          return of(err);
      }));

  }
}
