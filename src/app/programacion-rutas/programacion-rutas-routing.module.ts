import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramacionRutasComponent} from './components/programacion-rutas/programacion-rutas.component';

import {RutaComponent} from './components/ruta/ruta.component';
import {RutaCreateComponent} from './components/ruta-create/ruta-create.component';
import {RutaEditComponent} from './components/ruta-edit/ruta-edit.component';

import {AuthGuard} from '../core/guard/auth.guard';
import {MenuInicialComponent} from './../auth/components/menu-inicial/menu-inicial.component';

const routes: Routes = [
  {
    path:'',
    component : MenuInicialComponent,
    children: [
  
      {path:'',
        redirectTo: 'circuito', 
        pathMatch: 'full'
        
      },

      {
        path:'circuito',
        component: RutaComponent,
        canActivate: [AuthGuard]
      },

      {
        path:'circuito/create',
        component: RutaCreateComponent,
        canActivate: [AuthGuard]
      },
      
      {
        path: 'circuito/edit/:id',
        component: RutaEditComponent,
        canActivate: [AuthGuard]
   
      },
  
      {
        path:'programacion-circuito',
        component: ProgramacionRutasComponent,
        canActivate: [AuthGuard]
      },

      

    ]
  
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramacionRutasRoutingModule { }
