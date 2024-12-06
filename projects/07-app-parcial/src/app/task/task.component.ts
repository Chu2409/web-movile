import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ITask, TaskService } from '../services/task.service'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-zhu-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: ITask[] = []
  taskForm: FormGroup
  editForm: FormGroup
  isEditing = false
  currentTaskId: number | null = null
  userRole = ''

  srv = inject(AuthService)

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      project_id: ['', Validators.required],
    })

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      project_id: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadTasks()
    this.userRole = this.srv.getUserRole() || ''
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data
    })
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe(() => {
        this.loadTasks()
        this.taskForm.reset()
      })
    }
  }

  onEditSubmit(): void {
    if (this.editForm.valid && this.currentTaskId !== null) {
      this.taskService
        .updateTask(this.currentTaskId, this.editForm.value)
        .subscribe(() => {
          this.loadTasks()
          this.isEditing = false
          this.currentTaskId = null
          this.editForm.reset()
        })
    }
  }

  editTask(task: any): void {
    this.isEditing = true
    this.currentTaskId = task.id
    this.editForm.patchValue(task)
  }

  cancelEdit(): void {
    this.isEditing = false
    this.currentTaskId = null
    this.editForm.reset()
  }
}
