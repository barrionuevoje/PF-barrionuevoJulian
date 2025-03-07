import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CursosRoutingModule } from './lista-cursos/cursos-routing.module';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { cursosReducer } from './store/cursos.reducer'; // Importa el reducer
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ListaCursosComponent,
    CursosRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    DetalleCursoComponent,
    HttpClientModule,
    StoreModule.forFeature('cursos', cursosReducer), // Registra el store de cursos
    EffectsModule.forFeature([CursosEffects]),
    
  ],
  declarations: [],
})
export class CursosModule {}
