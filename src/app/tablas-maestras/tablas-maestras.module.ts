import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablasMaestrasRoutingModule } from './tablas-maestras-routing.module';
import { DirectorioIpcComponent } from './components/directorio-ipc/directorio-ipc.component';
import { NavComponent } from './components/nav/nav.component';
import {MaterialModule} from './../material/material.module';
import {SharedModule} from './../shared/shared.module';
import { DirectorioIpcEditComponent } from './components/directorio-ipc-edit/directorio-ipc-edit.component';
import { RutaDetalleProdCreateComponent } from './components/ruta-detalle-prod-create/ruta-detalle-prod-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RutaDetalleProdEditComponent } from './components/ruta-detalle-prod-edit/ruta-detalle-prod-edit.component';
import {ArticuloComponent} from './../shared/components/articulo/articulo.component';

@NgModule({
  declarations: [DirectorioIpcComponent, NavComponent, DirectorioIpcEditComponent,RutaDetalleProdCreateComponent, RutaDetalleProdEditComponent ],
  imports: [
    CommonModule,
    TablasMaestrasRoutingModule,
    MaterialModule,
    SharedModule,  
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ArticuloComponent
 ]
})
export class TablasMaestrasModule { }
