import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'; 
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CursosActions from '../store/cursos.actions';
import { CursosState } from '../store/cursos.reducer';
import { selectCursos, selectLoading } from '../store/cursos.selectors';

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
  cursos$: Observable<any[]> = new Observable<any[]>(); // Inicializamos el observable
  loading$: Observable<boolean> = new Observable<boolean>(); // Inicializamos el observable
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  cursoForm!: FormGroup;
  formVisible: boolean = false;
  cursoAEditar: any = null;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private store: Store<CursosState>, // Inyectamos el store
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.cursos$ = this.store.select(selectCursos);
    this.loading$ = this.store.select(selectLoading);

    this.store.dispatch(CursosActions.cargarCursos());

    this.cursos$.subscribe(cursos => {
      if (cursos) {
        this.dataSource.data = cursos;
      }
    });

    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
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
        this.store.dispatch(CursosActions.editarCurso({ curso: cursoEditado }));
      } else {
        this.store.dispatch(CursosActions.agregarCurso({ curso }));
      }

      this.formVisible = false;
      this.cdr.detectChanges();
    }
  }

  cancelar(): void {
    this.formVisible = false;
  }

  eliminarCurso(id: number): void {
    this.store.dispatch(CursosActions.eliminarCurso({ id }));
  }

  editarCurso(curso: any): void {
    this.abrirFormulario(curso);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/cursos/detalle', id]);
  }
}
