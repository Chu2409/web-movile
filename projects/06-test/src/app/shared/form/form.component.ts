import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { IDish } from 'src/app/evaluation/interface/dish.interface'
import { ModelService } from 'src/app/evaluation/services/model.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input()
  model: IDish | null = null

  platoTipicoForm!: FormGroup

  @Output() reloadEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private fb: FormBuilder) {}
  service = inject(ModelService)
  router = inject(Router)

  ngOnInit(): void {
    // Inicializar el formulario
    this.initializeForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && !changes['model'].isFirstChange()) {
      // Re-inicializar el formulario cuando el model cambie
      this.initializeForm()
    }
  }

  private initializeForm(): void {
    this.platoTipicoForm = this.fb.group({
      name: [this.model?.name, [Validators.required, Validators.minLength(3)]],
      country: [this.model?.country, Validators.required],
      ingredient: [this.model?.ingredient, Validators.required],
      time: [this.model?.time, [Validators.required, Validators.min(1)]],
      difficulty: [this.model?.difficulty, Validators.required],
    })
  }

  onSubmit(): void {
    if (this.platoTipicoForm.valid) {
      if (this.model) {
        this.service
          .update(this.model.id, this.platoTipicoForm.value)
          .subscribe({
            next: () => {
              this.reloadEmitter.emit(true)
              this.platoTipicoForm.reset()
            },
            error: (error) => {
              console.error(error)
            },
          })
      } else {
        this.service.create(this.platoTipicoForm.value).subscribe({
          next: () => {
            this.reloadEmitter.emit(true)
            this.platoTipicoForm.reset()
          },
          error: (error) => {
            console.error(error)
          },
        })
      }
    }
  }
}
