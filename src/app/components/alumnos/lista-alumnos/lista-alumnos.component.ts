import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Material Table
import { MatButtonModule } from '@angular/material/button'; // Material Buttons
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Material Dialog
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { AgregarAlumnoComponent } from '../agregar-alumno/agregar-alumno.component'; // Reutilizamos este componente para editar

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); // MatTableDataSource para la tabla
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'curso', 'acciones']; // Columnas visibles

  constructor(
    private alumnosService: AlumnosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosService.getAlumnos().subscribe((data) => {
      this.dataSource.data = data; // Asigna los datos al MatTableDataSource
    });
  }

  agregarAlumno(): void {
    const dialogRef = this.dialog.open(AgregarAlumnoComponent);

    dialogRef.afterClosed().subscribe((nuevoAlumno) => {
      if (nuevoAlumno) {
        const updatedData = [...this.dataSource.data, nuevoAlumno]; // Añade el nuevo alumno a los datos existentes
        this.dataSource.data = updatedData; // Actualiza la fuente de datos
      }
    });
  }

  editarAlumno(alumno: any): void {
    const dialogRef = this.dialog.open(AgregarAlumnoComponent, {
      data: alumno // Pasa los datos del alumno a editar
    });

    dialogRef.afterClosed().subscribe((alumnoEditado) => {
      if (alumnoEditado) {
        // Actualiza los datos en la tabla
        const updatedData = this.dataSource.data.map(item =>
          item.id === alumnoEditado.id ? alumnoEditado : item // Compara y reemplaza los datos del alumno editado
        );
        this.dataSource.data = updatedData; // Actualiza la fuente de datos
      }
    });
  }

  eliminarAlumno(index: number): void {
    const updatedData = this.dataSource.data.filter((_, i) => i !== index); // Elimina el alumno por índice
    this.dataSource.data = updatedData; // Actualiza la fuente de datos
  }
}
