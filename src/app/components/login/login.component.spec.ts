import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // <-- Importamos AuthService
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Mockeamos `AuthService` y `Router`
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule], // 🚨 AQUÍ ESTÁ LA CORRECCIÓN: Se usa `imports`
      providers: [
        { provide: AuthService, useValue: authServiceSpy }, // Mockeamos AuthService
        { provide: Router, useValue: routerSpy } // Mockeamos Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make the form valid when filled correctly', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call AuthService login and navigate on success', () => {
    // Simulamos que `login` devuelve `true`
    authServiceSpy.login.and.returnValue(true);

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    component.login(); // Llamamos al método de login

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cursos']);
  });

  it('should not navigate on failed login', () => {
    // Simulamos que `login` devuelve `false`
    authServiceSpy.login.and.returnValue(false);

    component.loginForm.controls['email'].setValue('wrong@example.com');
    component.loginForm.controls['password'].setValue('wrongpass');

    component.login(); // Llamamos al método de login

    expect(authServiceSpy.login).toHaveBeenCalledWith('wrong@example.com', 'wrongpass');
    expect(routerSpy.navigate).not.toHaveBeenCalled(); // Aseguramos que no navega
  });
});
