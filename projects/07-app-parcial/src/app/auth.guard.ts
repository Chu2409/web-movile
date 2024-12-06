import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    if (this.loginService.isLogged()) {
      return true
    } else {
      return this.router.navigate(['/login'])
    }
  }
}
