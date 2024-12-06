import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-zhu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  router = inject(Router)

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response) this.router.navigate(['/projects'])
          else alert('Credenciales incorrectas')
        },
        error: () => {
          alert('Credenciales incorrectas')
        },
      })
    }
  }
}
