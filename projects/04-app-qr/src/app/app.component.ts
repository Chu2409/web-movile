import { Component, inject, OnInit } from '@angular/core'
import { AuthService } from './core/services/auth.service'
import { StateService } from './core/services/state.service'

@Component({
  selector: 'qr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'appGQR'
  expanded = true

  authSrv = inject(AuthService)
  stateSrv = inject(StateService)
  isLogged = false

  onToggleExpanded(expanded: boolean) {
    this.expanded = expanded
  }

  ngOnInit(): void {
    this.stateSrv.isVisible.subscribe((logged) => {
      this.isLogged = logged
    })
  }
}
