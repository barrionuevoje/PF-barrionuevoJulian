import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Material Table
import { MatButtonModule } from '@angular/material/button'; // Material Buttons
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Material Dialog
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cargarAlumnos } from '../store/alumnos.actions';
import { selectAllAlumnos, selectAlumnosLoading } from '../store/alumnos.selectors';
import { AgregarAlumnoComponent } from '../agregar-alumno/agregar-alumno.component'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); 
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'curso', 'acciones']; 

  alumnos$: Observable<any[]>;
  loading$: Observable<boolean>; 

  constructor(
    public store: Store<any>,
    private dialog: MatDialog,
    private router: Router 
  ) {this.alumnos$ = this.store.select(selectAllAlumnos);
    this.loading$ = this.store.select(selectAlumnosLoading);}

  ngOnInit(): void {
    this.store.dispatch(cargarAlumnos());
    this.alumnos$.subscribe(alumnos => this.dataSource.data = alumnos);
  }

  agregarAlumno(): void {
    const dialogRef = this.dialog.open(AgregarAlumnoComponent);

    dialogRef.afterClosed().subscribe((nuevoAlumno) => {
      if (nuevoAlumno) {
        this.dataSource.data = [...this.dataSource.data, nuevoAlumno]; 
      }
    });
  }

  editarAlumno(alumno: any): void {
    const dialogRef = this.dialog.open(AgregarAlumnoComponent, {
      data: alumno 
    });

    dialogRef.afterClosed().subscribe((alumnoEditado) => {
      if (alumnoEditado) {
        this.dataSource.data = this.dataSource.data.map(item =>
          item.id === alumnoEditado.id ? alumnoEditado : item
        );
      }
    });
  }

  eliminarAlumno(index: number): void {
    this.dataSource.data = this.dataSource.data.filter((_, i) => i !== index);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/alumnos/detalle', id]); 
  }
}
