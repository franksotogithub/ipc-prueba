import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradaDatosRoutingModule } from './entrada-datos-routing.module';
import { MercadosComponent } from './components/mercados/mercados.component';

import { NavComponent } from './components/nav/nav.component';
import {MaterialModule} from './../material/material.module';
import {SharedModule} from './../shared/shared.module';
import { ComercialesComponent } from './components/comerciales/comerciales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosComponent } from './components/datos/datos.component';
import { MercadosListComponent } from './components/mercados-list/mercados-list.component';

@NgModule({
  declarations: [MercadosComponent, NavComponent, ComercialesComponent, DatosComponent, MercadosListComponent],
  imports: [
    CommonModule,
    EntradaDatosRoutingModule,
    MaterialModule,
    SharedModule,   
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EntradaDatosModule { }
