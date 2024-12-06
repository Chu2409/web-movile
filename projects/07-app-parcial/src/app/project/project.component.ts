import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IProject, ProjectService } from '../services/project.service'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-zhu-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: IProject[] = []
  projectForm: FormGroup
  editForm: FormGroup
  isEditing = false
  currentProjectId: number | null = null
  userRole = ''

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private srv: AuthService,
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    })

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadProjects()
    this.userRole = this.srv.getUserRole() || ''
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data
    })
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService
        .createProject(this.projectForm.value)
        .subscribe(() => {
          this.loadProjects()
          this.projectForm.reset()
        })
    }
  }

  onEditSubmit(): void {
    if (this.editForm.valid && this.currentProjectId !== null) {
      this.projectService
        .updateProject(this.currentProjectId, this.editForm.value)
        .subscribe(() => {
          this.loadProjects()
          this.isEditing = false
          this.currentProjectId = null
          this.editForm.reset()
        })
    }
  }

  editProject(project: any): void {
    this.isEditing = true
    this.currentProjectId = project.id
    this.editForm.patchValue(project)
  }

  cancelEdit(): void {
    this.isEditing = false
    this.currentProjectId = null
    this.editForm.reset()
  }
}
