import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IdbService } from './core/services/idb/idb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'INEI-PRY-IPC-FRONTEND';
  constructor(


    private idbService:IdbService,
  ) {
    this.idbService.connectToIDB();
  }

  ngOnInit(): void {
    this.idbService.connectToIDB();
  }

  ngAfterViewInit(): void {

  }


}
