import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Task';
  username: string = '';

  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }
  checkAuthStatus(): void {
    const token = sessionStorage.getItem('auth-token');
    
    if (token) {
      this.isAuthenticated = true;
      const tokenPayload = jwtDecode(token) as any;
      this.username = tokenPayload.username;
      console.log(this.username)
    } else {
      this.isAuthenticated = false;
    }
  }
 

  logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    this.isAuthenticated = false;
    this.router.navigate(['/auth/login']);
  }
}
