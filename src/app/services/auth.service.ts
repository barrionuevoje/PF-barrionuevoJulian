import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Cambiar a pública
  public isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (password === 'password') {  // Cambia esta lógica según las necesidades
      this.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
}
