import { Component} from '@angular/core';
import { TaskType } from '../types/task-type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'], // Corrigido para "styleUrls"
})
export class TaskForm{
  tasks: TaskType[] = [];
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: TaskType = { ...this.taskForm.value };

      this.taskService.addTask(newTask).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.taskForm.reset();
        },
        error: (err) => console.error('Erro ao adicionar tarefa:', err),
      });
    }
  }


}
