import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Material Table
import { MatButtonModule } from '@angular/material/button'; // Material Buttons
import { MatDialogModule } from '@angular/material/dialog'; // Material Dialog
import { ReactiveFormsModule } from '@angular/forms'; // Reactive Forms
import { CursosRoutingModule } from './lista-cursos/cursos-routing.module';
// Importa el componente standalone ListaCursosComponent
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { RouterModule } from '@angular/router'; 
import { AlumnosRoutingModule } from '../../components/alumnos/alumnos-routing.module'; // Asegúrate de que esta importación es correcta
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,       // Importa MatTableModule para usar las tablas
    MatButtonModule,      // Importa MatButtonModule para los botones
    MatDialogModule,      // Si estás usando diálogos
    ReactiveFormsModule,  // Si usas formularios reactivos
    ListaCursosComponent,  
    CursosRoutingModule ,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    DetalleCursoComponent,
    HttpClientModule
  ],
  declarations: [
    
  ],
})
export class CursosModule {}
