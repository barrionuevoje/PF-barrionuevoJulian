import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms'; // Importa el módulo correctamente
import { MatFormFieldModule } from '@angular/material/form-field'; // Material Form Field
import { MatInputModule } from '@angular/material/input'; // Material Input
import { MatButtonModule } from '@angular/material/button'; // Material Buttons

@Component({
  selector: 'app-agregar-alumno',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.scss']
})
export class AgregarAlumnoComponent {
  alumnoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del alumno a editar (si aplica)
  ) {
    this.alumnoForm = this.fb.group({
      id: [data?.id || null], // Si es edición, se pasa el ID
      nombre: [data?.nombre || '', Validators.required],
      apellido: [data?.apellido || '', Validators.required],
      curso: [data?.curso || '', Validators.required]
    });
  }

  guardar(): void {
    if (this.alumnoForm.valid) {
      this.dialogRef.close(this.alumnoForm.value); // Cierra el diálogo y pasa los datos actualizados
    }
  }

  cancelar(): void {
    this.dialogRef.close(); // Cierra el diálogo sin hacer cambios
  }
}