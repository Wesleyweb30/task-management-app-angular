import { UserRegisterService } from './../services/user-register.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  constructor(private userRegisterService: UserRegisterService, private router: Router, private toastr: ToastrService) {}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.toastr.error('As senhas não coincidem');
        return;
      }
      this.userRegisterService.register(
        this.registerForm.value.username!,
        this.registerForm.value.password!,
      ).subscribe({
        next: () => {
          this.router.navigate(['auth/login']);
          this.toastr.success('Registro bem-sucedido! Faça login.');
        },
        error: (err) => {
          this.toastr.error('Erro ao registrar');
        }
      });
    } else {
      this.toastr.error('Por favor, preencha todos os campos corretamente.');
    }
  }
}
