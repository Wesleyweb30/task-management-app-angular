import { Component} from '@angular/core';
import { TaskType } from '../types/task-type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'], // Corrigido para "styleUrls"
})
export class TaskForm{
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder,private router: Router, private toastr: ToastrService) {
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
          this.taskForm.reset();
          this.router.navigate(['/tasks']);
          this.toastr.success('Tarefa Criada Com sucesso!');
        },
        error: (err) => this.toastr.error('Tarefa Não Criada, Tente Novamente ❌')
      });
    }
  }

  
}
