import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrigido o nome da propriedade
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {} // Injete o Router

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
        next: () => {
          console.log("Login com sucesso");
          this.router.navigate(['/task']); // Redireciona para a rota de task
        },
        error: (err) => {
          console.error("Erro no login", err);
        }
      });
    } else {
      console.error("Formulário inválido");
    }
  }
}
