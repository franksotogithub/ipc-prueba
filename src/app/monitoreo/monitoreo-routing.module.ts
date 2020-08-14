import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutasComponent} from './components/rutas/rutas.component';
import {AuthGuard} from './../core/guard/auth.guard';
import {MenuInicialComponent} from './../auth/components/menu-inicial/menu-inicial.component';
const routes: Routes = [
  {
    path:'',
    component : MenuInicialComponent,
    children: [
  
      {path:'',
        redirectTo: 'rutas', 
        pathMatch: 'full'
        
      },
  
      {
        path:'rutas',
        component: RutasComponent,
        canActivate: [AuthGuard]
      },

      


    ]
  
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoreoRoutingModule { }
