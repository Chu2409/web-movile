import { Component, inject, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-zhu-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  showSidebar = true

  authSrv = inject(AuthService)

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !event.url.includes('/login')
      }
    })
  }

  logout() {
    this.authSrv.logout()
    this.router.navigate(['/login'])
  }
}
