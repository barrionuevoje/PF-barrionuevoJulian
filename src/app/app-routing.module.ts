import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Rutas de carga perezosa para los módulos
  { path: 'alumnos', loadChildren: () => import('./components/alumnos/alumnos.module').then(m => m.AlumnosModule) },
  { path: 'cursos', loadChildren: () => import('./features/cursos/cursos.module').then(m => m.CursosModule) },
  
  // Ruta predeterminada, puedes cambiar a /cursos si prefieres
  { path: '', redirectTo: '/cursos', pathMatch: 'full' },
  
  // Ruta comodín para redirigir a /alumnos
  { path: '**', redirectTo: '/alumnos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
