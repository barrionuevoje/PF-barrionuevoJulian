import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosComponent } from './lista-cursos.component';
import { DetalleCursoComponent } from '../detalle-curso/detalle-curso.component';

const routes: Routes = [
  { path: '', component: ListaCursosComponent },
  { path: 'detalle/:id', component: DetalleCursoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule {}
  