import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';

import {MaterialModule} from './../material/material.module';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { DeleteMessageComponent } from './components/delete-message/delete-message.component';
@NgModule({
  declarations: [MenuComponent, HeaderToolbarComponent, LoaderComponent, NotificationComponent, ArticuloComponent, MessageComponent, DeleteMessageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[MenuComponent,LoaderComponent,NotificationComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
