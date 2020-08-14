import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculoIndiceComponent} from './components/calculo-indice/calculo-indice.component';
import {MenuInicialComponent} from './../auth/components/menu-inicial/menu-inicial.component';

const routes: Routes = [
{
  path:'',
  component : MenuInicialComponent,
  children: [

    {path:'',
      redirectTo: 'calculo-indice', 
      pathMatch: 'full'
      
    },

    {
      path:'calculo-indice',
      component: CalculoIndiceComponent
    }
  ]

  
},
  /*
{
  path:'calculo-indice',
  component: CalculoIndiceComponent
}*/

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculoRoutingModule { }
