import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Importe o Router
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrigido o nome da propriedade
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) {} // Injete o Router

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
          this.toastr.success('Usuário Logado!');
        },
        error: (err) => {
          this.toastr.error('Erro ao conectar');
        }
      });
    } else {
      this.toastr.error('Error')
      return;
    }
  }
}
