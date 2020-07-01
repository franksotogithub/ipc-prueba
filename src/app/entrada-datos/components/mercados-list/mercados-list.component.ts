import { Component, OnInit } from '@angular/core';
import { IdbService } from 'src/app/core/services/idb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mercados-list',
  templateUrl: './mercados-list.component.html',
  styleUrls: ['./mercados-list.component.scss']
})
export class MercadosListComponent implements OnInit {
  movMercadoCab:Array<any> ;
  /*dataSource=[{'codigo':1,'nombre':'holass'}];*/


  dataSource=[];
  displayedColumns = ['mercado','hora_ini','hora_fin'];
  constructor(private idbService:IdbService,
    private router: Router,
    ) { 
      
    this.idbService.movMercadoCab$.subscribe((datos)=>{
      /*this.movMercadoCab = datos;*/
      this.dataSource = datos;

    });

  }

  ngOnInit() {
  }
  addMercado(){
    this.router.navigate(['./entrada-datos/mercado_nuevo']);
  }
}
