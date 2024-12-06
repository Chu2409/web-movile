import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isVisibleComponent = new BehaviorSubject<boolean>(false)
  isVisible = this.isVisibleComponent.asObservable()

  toggleVisibility() {
    const currentValue = this.isVisibleComponent.value
    this.isVisibleComponent.next(!currentValue)
  }
}
