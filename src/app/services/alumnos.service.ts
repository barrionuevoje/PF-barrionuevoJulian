import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', curso: 'Matemáticas' },
    { id: 2, nombre: 'María', apellido: 'García', curso: 'Historia' },
    { id: 3, nombre: 'Carlos', apellido: 'López', curso: 'Ciencias' },
  ];

  constructor() {}

  getAlumnos(): Observable<any[]> {
    return of(this.alumnos); // Devolvemos un observable con los datos
  }

  addAlumno(alumno: any): Observable<void> {
    this.alumnos.push(alumno); // Agregar el alumno al array
    return of();
  }

  deleteAlumno(id: number): Observable<void> {
    this.alumnos = this.alumnos.filter((alumno) => alumno.id !== id); // Filtrar el alumno por ID
    return of();
  }
}
