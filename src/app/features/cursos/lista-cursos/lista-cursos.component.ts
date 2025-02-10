import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../../../services/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';  // Importar MatTableModule
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule  // Incluir MatTableModule
  ],
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss'],
})
export class ListaCursosComponent implements OnInit {
  cursos: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  cursoForm!: FormGroup;
  formVisible: boolean = false;
  cursoAEditar: any = null;

  constructor(
    private cursosService: CursosService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef  // Inyectamos ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.cargarCursos();
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  cargarCursos(): void {
    this.cursosService.getCursos().subscribe((data) => {
      this.cursos = data;
    });
  }

  abrirFormulario(curso: any = null): void {
    this.formVisible = true;
    if (curso) {
      this.cursoAEditar = curso;
      this.cursoForm.setValue({
        nombre: curso.nombre,
        descripcion: curso.descripcion,
      });
    } else {
      this.cursoAEditar = null;
      this.cursoForm.reset();
    }
  }

  guardarCurso(): void {
    if (this.cursoForm.valid) {
      const curso = this.cursoForm.value;
  
      if (this.cursoAEditar) {
        // Si hay un curso a editar
        const cursoEditado = { ...this.cursoAEditar, ...curso };
        this.cursosService.editarCurso(cursoEditado);
      } else {
        // Si es un curso nuevo
        this.cursosService.agregarCurso(curso);
      }
  
      this.cargarCursos(); // Recargamos la lista de cursos
      this.formVisible = false; // Ocultamos el formulario
  
      // Forzamos la detección de cambios para que la vista se actualice inmediatamente
      this.cdr.detectChanges();
    }
  }
  
  

  cancelar(): void {
    this.formVisible = false;
  }

  eliminarCurso(id: number): void {
    this.cursosService.eliminarCurso(id);
    this.cargarCursos();
  }

  editarCurso(curso: any): void {
    this.abrirFormulario(curso);
  }
}
