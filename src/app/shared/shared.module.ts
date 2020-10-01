import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';

import {MaterialModule} from './../material/material.module';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import { DeleteMessageComponent } from './components/delete-message/delete-message.component';
import { MoneyDialogComponent} from './components/money-dialog/money-dialog.component';
import {OnlyNumbersDirective} from './directive/only-numbers.directive';
import {ButtonLoadingDirective} from './directive/button-loading.directive';
import { AudioDialogComponent } from './components/audio-dialog/audio-dialog.component';
import { VariedadTemporalFormDialogComponent } from './components/variedad-temporal-form-dialog/variedad-temporal-form-dialog.component';

@NgModule({
  declarations: [
    MenuComponent, 
    HeaderToolbarComponent, 
    LoaderComponent,
     NotificationComponent, 
     ArticuloComponent,  
     DeleteMessageComponent,
     ConfirmDialogComponent,
     MoneyDialogComponent,
     OnlyNumbersDirective,
     ButtonLoadingDirective,
     AudioDialogComponent,
     VariedadTemporalFormDialogComponent,
     
    ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MenuComponent,LoaderComponent,
    NotificationComponent,ConfirmDialogComponent,
    MoneyDialogComponent,OnlyNumbersDirective,
  ButtonLoadingDirective
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
