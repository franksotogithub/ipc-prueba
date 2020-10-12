import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService : AuthService,
    private authenticationService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.currentUserValue;
      console.log('currentUser>>>',currentUser);
      if (currentUser) {
       
        return true;
      }
   

      if(next.queryParams['token']){
        let token = next.queryParams['token'];
        this.authService.testToken(token).subscribe((user)=>{
          if(user){
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.authService.setCurrentUserValue(user);
            return true;
          }
        });
        
      }
      


  
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
  
}
