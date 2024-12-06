import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  title = ''
  group!: FormGroup

  constructor(
    private reference: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data ? 'EDITAR' : 'NUEVO'
  }

  ngOnInit() {
    this.loadForm()
  }

  save() {
    const record = this.group.value
    this.reference.close(record)
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl(this.data?.id),
      name: new FormControl(this.data?.name, Validators.required),
      lastName: new FormControl(this.data?.lastName, Validators.required),
      position: new FormControl(this.data?.position, Validators.required),
    })
  }
}
