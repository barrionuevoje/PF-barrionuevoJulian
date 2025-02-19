import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.scss'],
  standalone: true,

})
export class DetalleAlumnoComponent implements OnInit {
  alumnoId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.alumnoId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la URL
  }
}
