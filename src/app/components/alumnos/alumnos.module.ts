import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlumnosComponent } from '../alumnos/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from '../alumnos/abm-alumnos/abm-alumnos.component';
import { SharedModule } from '../../../shared/shared.modules';
import { AlumnosRoutingModule } from '../alumnos/alumnos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosEffects } from './store/alumnos.effects';
import { alumnosReducer } from '../alumnos/store/alumnos.reducer';

@NgModule({
  
  imports: [
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    AlumnosRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AbmAlumnosComponent,
    ListaAlumnosComponent,
    DetalleAlumnoComponent,
    StoreModule.forFeature('alumnos', alumnosReducer),
    EffectsModule.forFeature([AlumnosEffects])
  ],
  
  declarations: [
       
  
  ],
})
export class AlumnosModule {}
