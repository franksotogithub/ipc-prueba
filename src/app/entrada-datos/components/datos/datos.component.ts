import { Component, OnInit } from '@angular/core';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { LoaderService } from './../../../core/services/loader.service';
import { TablesDB } from 'src/app/shared/enum/tables-db.enum';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
})
export class DatosComponent implements OnInit {
   
  constructor(
    private idbService: IdbService,
    private loaderService: LoaderService
  ) {}
  message = null;
  messageError = null;
  ngOnInit() {}

  descargando() {
    this.message = 'Datos descargados';
    this.messageError = 'Error al descargar datos';
    this.idbService.descargandoDatos();
  }

  cargando() {
    this.message = 'Datos cargados';
    this.messageError = 'Error al cargar datos';
    this.idbService.cargandoDatos(TablesDB.MOV_MERC_CASAS);
  }

  limpiarDatos() {
    this.message = 'Tablas limpiadas';

    this.idbService.limpiandoDatos();
    this.loaderService.show();

    setTimeout(() => {
      this.loaderService.hide();
      this.loaderService.showNotification();
    }, 2000);
  }
}
