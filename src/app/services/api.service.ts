import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.example.com';  // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método GET para obtener datos (por ejemplo, lista de cursos)
  getCursos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos`);
  }

  // Método POST para crear un nuevo recurso (por ejemplo, un nuevo curso)
  addCurso(curso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cursos`, curso);
  }

  // Método PUT para actualizar un recurso
  updateCurso(id: number, curso: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cursos/${id}`, curso);
  }

  // Método DELETE para eliminar un recurso
  deleteCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cursos/${id}`);
  }
}
