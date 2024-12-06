import { Component } from '@angular/core'
import { IDish } from '../interface/dish.interface'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  model: IDish | null = null
  reloadFlag = false

  onEdit(model: IDish) {
    this.model = model
  }

  reloadData() {
    this.reloadFlag = !this.reloadFlag
  }
}
