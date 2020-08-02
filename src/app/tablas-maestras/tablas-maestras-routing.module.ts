import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {DirectorioIpcComponent} from './components/directorio-ipc/directorio-ipc.component';
import {DirectorioIpcEditComponent} from './components/directorio-ipc-edit/directorio-ipc-edit.component';
import {RutaDetalleProdEditComponent} from './components/ruta-detalle-prod-edit/ruta-detalle-prod-edit.component';
import {RutaDetalleProdCreateComponent} from './components/ruta-detalle-prod-create/ruta-detalle-prod-create.component';
import {AuthGuard} from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component : NavComponent,
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
        component: RutaDetalleProdCreateComponent,
        canActivate: [AuthGuard]
   
      },

      {
        path: 'directorio-ipc/edit/:id/articulo/:idArticulo',
        component: RutaDetalleProdEditComponent,
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
