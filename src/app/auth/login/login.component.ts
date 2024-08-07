import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginInterface } from '../../interfaces/login.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    this.authService.login(this.loginForm.value as LoginInterface).subscribe({
      next: (resp: any) => {
        if (resp.status) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', 'Ingresa las credenciales correctas', 'error');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          Swal.fire(
            'Error',
            err.mensaje || 'Credenciales incorrectas',
            'error'
          );
        } else {
          Swal.fire('Error', 'Ocurrió un error inesperado', 'error');
        }
      },
    });
  }
}
