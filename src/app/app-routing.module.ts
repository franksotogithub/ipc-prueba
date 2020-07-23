import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './core/guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/entrada-datos',
    pathMatch: 'full',
  },
  {
    path:'entrada-datos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./entrada-datos/entrada-datos.module').then(m => m.EntradaDatosModule)
  },
  
  {
    path: 'auth',
    loadChildren:()=> import('./auth/auth.module').then(m=> m.AuthModule)

  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
