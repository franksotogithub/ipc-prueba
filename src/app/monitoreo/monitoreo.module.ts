import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { RutasComponent } from './components/rutas/rutas.component';


@NgModule({
  declarations: [RutasComponent],
  imports: [
    CommonModule,
    MonitoreoRoutingModule
  ]
})
export class MonitoreoModule { }
