import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursos = [
    { id: 1, nombre: 'Matemáticas', descripcion: 'Curso de matemáticas' },
    { id: 2, nombre: 'Historia', descripcion: 'Curso de historia' },
  ];

  getCursos() {
    return of(this.cursos);  // No necesitamos Observable aquí si ya estamos usando la detección de cambios
  }

  agregarCurso(curso: any) {
    curso.id = this.cursos.length + 1;  // Asegura que el id sea único
    this.cursos.push(curso);
  }

  eliminarCurso(id: number) {
    this.cursos = this.cursos.filter(curso => curso.id !== id);
  }

  editarCurso(curso: any) {
    const index = this.cursos.findIndex(c => c.id === curso.id);
    if (index !== -1) {
      this.cursos[index] = curso;
    }
  }
}
