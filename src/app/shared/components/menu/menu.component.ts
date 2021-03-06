import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  
  constructor(  
    private router : Router,
    private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher
    ) { 

    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }
  logout(){
    
  }

}
