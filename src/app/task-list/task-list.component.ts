import { Component, OnInit } from '@angular/core';
import { TaskType } from '../types/task-type';
import { TaskService } from '../services/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{
  tasks: TaskType[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }
  
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas:', error);
      },
    });
  }
  
  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== id); // Remove a tarefa da lista local
      },
      error: (err) => console.error('Erro ao excluir tarefa:', err),
    });
  }
}
