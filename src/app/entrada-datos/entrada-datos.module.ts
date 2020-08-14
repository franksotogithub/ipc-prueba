import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebcamModule} from 'ngx-webcam';
import { EntradaDatosRoutingModule } from './entrada-datos-routing.module';
import { MercadosComponent } from './components/mercados/mercados.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MaterialModule} from './../material/material.module';
import {SharedModule} from './../shared/shared.module';
import { ComercialesComponent } from './components/comerciales/comerciales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosComponent } from './components/datos/datos.component';
import { MercadosListComponent } from './components/mercados-list/mercados-list.component';
import { ComercialesListComponent } from './components/comerciales-list/comerciales-list.component';

import {ProductoEditComponent,CameraDialogComponent} from './components/producto-edit/producto-edit.component';
import {AuthModule} from './../auth/auth.module';

@NgModule({
  declarations: [MercadosComponent, 
    
    ComercialesComponent, 
    DatosComponent,
     MercadosListComponent, 
     ComercialesListComponent, 
     ProductoEditComponent,
     CameraDialogComponent,
    ],
  imports: [
    CommonModule,
    EntradaDatosRoutingModule,
    MaterialModule,
    SharedModule,   
    FormsModule,
    ReactiveFormsModule,
    WebcamModule,
    AuthModule
  ],
  entryComponents: [
    CameraDialogComponent
 ]
  /*providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },    
  ],*/
})
export class EntradaDatosModule { }
