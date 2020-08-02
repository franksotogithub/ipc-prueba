import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculoRoutingModule } from './calculo-routing.module';
import { CalculoIndiceComponent } from './components/calculo-indice/calculo-indice.component';
import {MaterialModule} from './../material/material.module';
import {SharedModule} from './../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [CalculoIndiceComponent, NavComponent],
  imports: [
    CommonModule,
    CalculoRoutingModule,
    MaterialModule,
    SharedModule,  
  ]
})
export class CalculoModule { }
