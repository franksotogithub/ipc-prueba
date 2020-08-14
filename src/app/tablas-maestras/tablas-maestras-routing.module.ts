import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DirectorioIpcComponent} from './components/directorio-ipc/directorio-ipc.component';
import {DirectorioIpcEditComponent} from './components/directorio-ipc-edit/directorio-ipc-edit.component';
import {ArticuloDirectorioCreateComponent} from './components/articulo-directorio-create/articulo-directorio-create.component';
import {ArticuloDirectorioEditComponent} from './components/articulo-directorio-edit/articulo-directorio-edit.component';
import {AuthGuard} from '../core/guard/auth.guard';
import {MenuInicialComponent} from './../auth/components/menu-inicial/menu-inicial.component';

const routes: Routes = [
  {
    path:'',
    component : MenuInicialComponent,
    children: [
  
      {path:'',
        redirectTo: 'directorio-ipc', 
        pathMatch: 'full'
        
      },
  
      {
        path:'directorio-ipc',
        component: DirectorioIpcComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'directorio-ipc/edit/:id',
        component: DirectorioIpcEditComponent,
        canActivate: [AuthGuard]
   
      },

      {
        path: 'directorio-ipc/edit/:id/articulo',
        component: ArticuloDirectorioCreateComponent,
        canActivate: [AuthGuard]   
      },

      {
        path: 'directorio-ipc/edit/:id/articulo/:idArticulo',
        component: ArticuloDirectorioEditComponent,
        canActivate: [AuthGuard]
      },


    ]
  
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablasMaestrasRoutingModule { }
