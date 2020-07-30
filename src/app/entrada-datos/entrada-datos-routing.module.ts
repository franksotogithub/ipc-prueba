import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {MercadosComponent} from './components/mercados/mercados.component';
import {ComercialesComponent} from './components/comerciales/comerciales.component';
import {DatosComponent} from './components/datos/datos.component';
import {MercadosListComponent} from './components/mercados-list/mercados-list.component';
import {ComercialesListComponent} from './components/comerciales-list/comerciales-list.component';
import {ProductoEditComponent} from './components/producto-edit/producto-edit.component';

import {AuthGuard} from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component : NavComponent,
    children: [

      {path:'',
        redirectTo: 'comerciales', 
        pathMatch: 'full'
        
      },

     
      {
        path:'mercados',
        component:MercadosListComponent, 
        canActivate: [AuthGuard]
      },
      

      {
        path: 'mercados/edit/:id',
        component: MercadosComponent, 
        canActivate: [AuthGuard]
      },

     {
        path: 'mercados/edit/:id/producto/:idProducto',
        component: ProductoEditComponent
      },
      

      {
        path:'comerciales',
        component:ComercialesListComponent, 
        canActivate: [AuthGuard]
      },

    
      {
        path: 'comerciales/edit/:id',
        component: ComercialesComponent
      }, 
      
      {
        path: 'comerciales/edit/:id/producto/:idProducto',
        component: ProductoEditComponent
      },

      {
        path: 'datos',
        component: DatosComponent, 
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaDatosRoutingModule { }
