
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskType } from '../types/task-type';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
   private apiUrl = environment.apiUrl + "task"

  constructor(private http: HttpClient) {}

  // Método para obter os headers com token de autenticação
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Método centralizado para tratar erros
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Erros no cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erros no servidor
      errorMessage = `Erro ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Obtém as tarefas
  getTasks(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Adiciona uma nova tarefa
  addTask(task: TaskType): Observable<TaskType> {
    return this.http.post<TaskType>(this.apiUrl, task, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Atualiza uma tarefa existente
  updateTask(id: string, updatedTask: TaskType): Observable<TaskType> {
    return this.http.put<TaskType>(`${this.apiUrl}/${id}`, updatedTask, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Exclui uma tarefa
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
}
