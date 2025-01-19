import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  private apiUrl = environment.apiUrl + "auth/register"
  constructor(private httpClient: HttpClient) { }

  register(username: string,password: string): Observable<any> {
    return this.httpClient.post(this.apiUrl, { username, password });
  }
}
