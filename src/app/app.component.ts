import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Task';

  isAuthenticated: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }
  checkAuthStatus(): void {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      this.isAuthenticated = true;
    }
  }
 

  logout(): void {
    // Limpa os dados de autenticação
    sessionStorage.removeItem('auth-token');
    this.isAuthenticated = false;
    this.router.navigate(['/auth/login']);
  }
}
