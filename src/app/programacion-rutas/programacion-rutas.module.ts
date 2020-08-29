import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramacionRutasRoutingModule } from './programacion-rutas-routing.module';
import { ProgramacionRutasComponent } from './components/programacion-rutas/programacion-rutas.component';
import { RutaComponent } from './components/ruta/ruta.component';
import { RutaCreateComponent } from './components/ruta-create/ruta-create.component';
import { RutaEditComponent} from './components/ruta-edit/ruta-edit.component';

import {MaterialModule} from './../material/material.module';
import {SharedModule} from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AuthModule} from './../auth/auth.module';
import {DeleteMessageComponent} from './../shared/components/delete-message/delete-message.component';
import {MessageComponent} from './../shared/components/message/message.component';
import {ListaInformantesComponent} from './../programacion-rutas/components/lista_informantes/lista-informantes.component';


@NgModule({
  declarations: [ 
    ProgramacionRutasComponent, 
    RutaComponent,
    RutaCreateComponent,
    RutaEditComponent,
    ListaInformantesComponent,
    ],
  imports: [
    CommonModule,
    ProgramacionRutasRoutingModule,
    MaterialModule,
    SharedModule,  
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
  ],
  entryComponents: [
    DeleteMessageComponent,
    ListaInformantesComponent,
    MessageComponent
 ]
})
export class ProgramacionRutasModule { }
