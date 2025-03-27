import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:3306'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  login(correo: string, contraseña: string): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.apiURL}/login`, { correo, contraseña });
  }

  register(correo: string, contraseña: string, rol: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiURL}/register`, { correo, contraseña, rol });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}