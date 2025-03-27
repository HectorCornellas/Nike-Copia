import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importa los módulos necesarios
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          alert('Inicio de sesión exitoso.');
          this.router.navigate(['/landing-page']);
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
          alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
      );

      if (user.email === email && user.password === password) {
        alert('Inicio de sesión exitoso.');
        this.router.navigate(['/landing-page']);
      } else {
        alert('Correo o contraseña incorrectos.');
      }
    }
  }
  ngOnInit(): void {
    console.log('token', localStorage.getItem('token'));
    console.log('role', localStorage.getItem('role'));
  }
}