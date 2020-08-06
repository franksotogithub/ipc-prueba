import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {RutasComponent} from './components/rutas/rutas.component';
import {AuthGuard} from './../core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component : NavComponent,
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
