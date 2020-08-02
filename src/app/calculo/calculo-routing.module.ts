import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import { CalculoIndiceComponent} from './components/calculo-indice/calculo-indice.component';


const routes: Routes = [
{
  path:'',
  component : NavComponent,
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
