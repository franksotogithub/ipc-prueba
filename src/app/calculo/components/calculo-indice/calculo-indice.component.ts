import { Component, OnInit } from '@angular/core';
import {CalculoService} from './../../../core/services/calculo.service';
import {LoaderService} from './../../../core/services/loader.service';

@Component({
  selector: 'app-calculo-indice',
  templateUrl: './calculo-indice.component.html',
  styleUrls: ['./calculo-indice.component.scss']
})
export class CalculoIndiceComponent implements OnInit {
  semanas =[1,2,3,4,5];
  message = "datos procesados";
  constructor(private loaderService: LoaderService) { 

    
  }

  ngOnInit() {
  }

  procesarCalculo(){
    this.loaderService.show();
    setTimeout(()=>{
      this.loaderService.hide();
      this.loaderService.showNotification();
    },2000);

  }
}
