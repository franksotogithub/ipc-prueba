import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './core/guard/auth.guard';
import {LoginComponent} from './auth/components/login/login.component';
import {MenuInicialComponent} from './auth/components/menu-inicial/menu-inicial.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu-inicial',
    pathMatch: 'full',
  },
  {
    path:'entrada-datos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./entrada-datos/entrada-datos.module').then(m => m.EntradaDatosModule)
  },
  {
    path:'calculo',
    canActivate: [AuthGuard],
    loadChildren: () => import('./calculo/calculo.module').then(m => m.CalculoModule)
  },

  {
    path:'tablas-maestras',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tablas-maestras/tablas-maestras.module').then(m => m.TablasMaestrasModule)
  },
  {
    path: 'menu-inicial',
    canActivate: [AuthGuard],
    component:MenuInicialComponent

  },
  {
    path: 'login',
    component: LoginComponent

  },

  /*{
    path: 'auth',
    loadChildren:()=> import('./auth/auth.module').then(m=> m.AuthModule)

  },*/
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
