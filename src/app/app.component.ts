import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { filter } from 'rxjs/operators';
import { IdbService } from './core/services/idb/idb.service';
import { UrlService } from './core/services/url/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'INEI-PRY-IPC-FRONTEND';
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(
    private router: Router,
    private urlService: UrlService,

    private idbService:IdbService,
  ) {
    this.idbService.connectToIDB();
  }

  ngOnInit(): void {
    this.idbService.connectToIDB();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      this.urlService.setPreviousUrl(this.previousUrl);
    });
  }

  ngAfterViewInit(): void {

  }


}
