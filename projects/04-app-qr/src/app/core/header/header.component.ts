import { Component, inject, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'qr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email = ''

  authSrv = inject(AuthService)

  getData() {
    this.email = this.authSrv.getUser()?.email || ''
  }

  signOut() {
    this.authSrv.signOut()
    this.getData()
  }

  ngOnInit(): void {
    this.getData()
  }
}
