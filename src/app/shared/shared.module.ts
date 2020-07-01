import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';

import {MaterialModule} from './../material/material.module';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';

@NgModule({
  declarations: [MenuComponent, HeaderToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[MenuComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
