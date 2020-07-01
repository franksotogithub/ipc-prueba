import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/entrada-datos',
    pathMatch: 'full',
  },
  {
    path:'entrada-datos',
    loadChildren: () => import('./entrada-datos/entrada-datos.module').then(m => m.EntradaDatosModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
