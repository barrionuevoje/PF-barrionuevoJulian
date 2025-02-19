import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // Importa el LoginComponent
import { AuthGuard } from '../app/components/guards/auth.guard'; // Importa el guard de autenticación

const routes: Routes = [
  // Ruta de Login (página pública, sin AuthGuard)
  { path: 'login', component: LoginComponent },

  // Rutas protegidas con `AuthGuard`
  { path: 'alumnos', loadChildren: () => import('./components/alumnos/alumnos.module').then(m => m.AlumnosModule), canActivate: [AuthGuard] },
  { path: 'cursos', loadChildren: () => import('./features/cursos/cursos.module').then(m => m.CursosModule), canActivate: [AuthGuard] },

  // Ruta predeterminada (redirige a /login)
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Ruta comodín, redirige a login si no está autenticado
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
