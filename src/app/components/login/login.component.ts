import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el AuthService
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa el módulo correctamente

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Propiedad para mostrar los errores

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService // Inyectamos el servicio de autenticación
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Usamos el servicio de autenticación para validar las credenciales
      if (this.authService.login(email, password)) {
        console.log('Usuario autenticado');
        this.router.navigate(['/cursos']); // Redirige a /cursos si las credenciales son correctas
      } else {
        // Si las credenciales son incorrectas, mostramos un mensaje de error
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    } else {
      // Si el formulario no es válido, mostramos un mensaje de error
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
