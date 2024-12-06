import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) type!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) required!: boolean;
  @Input() autoComplete?: string;
  @Input({ required: true }) icon!: string;
  @Input() placeHolder = '';

  hide = true;
  isPassword = false;

  ngOnInit(): void {
    this.isPassword = this.type === 'password';
  }

  toggleShowPassword() {
    this.hide = !this.hide;
    this.type = this.hide ? 'password' : 'text';
  }
}
