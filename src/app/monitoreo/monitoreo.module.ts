import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { RutasComponent } from './components/rutas/rutas.component';
import { NavComponent } from './components/nav/nav.component';
import {MaterialModule} from './../material/material.module';
import {SharedModule} from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthModule} from './../auth/auth.module';
import { MapToolsComponent } from './components/map-tools/map-tools.component';
/*import {LeafletModule} from '@asymmetrik/ngx-leaflet';*/
@NgModule({
  declarations: [RutasComponent, NavComponent, MapToolsComponent],
  imports: [
    CommonModule,
    MonitoreoRoutingModule,
    MaterialModule,
    SharedModule,  
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    /*LeafletModule*/
  ]
})
export class MonitoreoModule { }
