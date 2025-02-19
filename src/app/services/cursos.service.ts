import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = 'http://localhost:3000/cursos';  // URL de la API local

  constructor(private http: HttpClient) {}

  // Obtener cursos desde la API
  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un curso
  agregarCurso(curso: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, curso);
  }

  // Eliminar un curso
  eliminarCurso(id: number) {
    return this.http.delete(`http://localhost:3000/cursos/${id}`);
  }

  // Editar un curso
  editarCurso(curso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${curso.id}`, curso);
  }
}
