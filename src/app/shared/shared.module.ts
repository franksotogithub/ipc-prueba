import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';

import {MaterialModule} from './../material/material.module';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [MenuComponent, HeaderToolbarComponent, LoaderComponent, NotificationComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[MenuComponent,LoaderComponent,NotificationComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
