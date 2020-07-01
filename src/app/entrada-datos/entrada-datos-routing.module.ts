import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {MercadosComponent} from './components/mercados/mercados.component';
import {ComercialesComponent} from './components/comerciales/comerciales.component';
import {DatosComponent} from './components/datos/datos.component';
import {MercadosListComponent} from './components/mercados-list/mercados-list.component';
const routes: Routes = [
  {
    path:'',
    component : NavComponent,
    children: [

      {  path:'',
      component:MercadosListComponent
        
      },
     
      {
        path:'mercados',
        component:MercadosListComponent
      },
      
      {
        path: 'mercado_nuevo',
        component: MercadosComponent
      },

      {
        path: 'datos',
        component: DatosComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaDatosRoutingModule { }
