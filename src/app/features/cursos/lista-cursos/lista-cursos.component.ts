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
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'; 

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
    MatTableModule,
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
    private cdr: ChangeDetectorRef,
    private router: Router 
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
        const cursoEditado = { ...this.cursoAEditar, ...curso };
        this.cursosService.editarCurso(cursoEditado);
      } else {
        this.cursosService.agregarCurso(curso);
      }

      this.cargarCursos();
      this.formVisible = false;
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

  // Método para navegar al detalle del curso
  verDetalle(id: number): void {
    this.router.navigate(['/cursos/detalle', id]);
  }
}
