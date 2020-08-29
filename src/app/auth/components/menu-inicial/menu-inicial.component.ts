import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit {
/*
  constructor( private router : Router, private authService : AuthService) { }

  ngOnInit() {
  }



  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }*/

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  
  constructor(  
    private router : Router,
    private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher,
    private authService : AuthService
    ) { 

    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}