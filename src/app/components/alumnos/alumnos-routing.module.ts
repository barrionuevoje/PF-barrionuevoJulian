import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';

const routes: Routes = [
  { path: '', component: ListaAlumnosComponent },  
  { path: 'detalle/:id', component: DetalleAlumnoComponent }  // No anidamos esta ruta dentro de otra
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
  