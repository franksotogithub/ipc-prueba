import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablasMaestrasRoutingModule } from './tablas-maestras-routing.module';
import { DirectorioIpcComponent } from './components/directorio-ipc/directorio-ipc.component';

import {MaterialModule} from './../material/material.module';
import {SharedModule} from './../shared/shared.module';
import { DirectorioIpcEditComponent } from './components/directorio-ipc-edit/directorio-ipc-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ArticuloComponent} from './../shared/components/articulo/articulo.component';
import {DeleteMessageComponent} from './../shared/components/delete-message/delete-message.component';
import { ArticuloDirectorioCreateComponent } from './components/articulo-directorio-create/articulo-directorio-create.component';
import { ArticuloDirectorioEditComponent } from './components/articulo-directorio-edit/articulo-directorio-edit.component';
import {AuthModule} from './../auth/auth.module';

@NgModule({
  declarations: [DirectorioIpcComponent, 
    
    DirectorioIpcEditComponent,
     ArticuloDirectorioCreateComponent, 
     ArticuloDirectorioEditComponent 
    ],
  imports: [
    CommonModule,
    TablasMaestrasRoutingModule,
    MaterialModule,
    SharedModule,  
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  entryComponents: [
    ArticuloComponent,
    DeleteMessageComponent,
 ]
})
export class TablasMaestrasModule { }
