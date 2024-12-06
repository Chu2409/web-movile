import { Component, inject, Inject, OnInit, Optional } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { FormComponent } from 'src/app/agency/form/form.component'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { StateService } from '../services/state.service'

@Component({
  selector: 'qr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  group!: FormGroup

  private router = inject(Router)
  private authSrv = inject(AuthService)
  private stateSrv = inject(StateService)

  constructor(@Optional() private reference: MatDialogRef<FormComponent>) {}

  ngOnInit() {
    this.loadForm()
  }

  login() {
    const record = this.group.value

    if (this.group.valid) {
      this.authSrv.login(record.email, record.password).then(() => {
        this.router.navigate(['/agencies'])
        this.stateSrv.toggleVisibility()
      })
    } else {
      alert('Complete el formulario')
    }
  }

  save() {
    const record = this.group.value
    this.reference.close(record)
  }

  loadForm() {
    this.group = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })
  }
}
