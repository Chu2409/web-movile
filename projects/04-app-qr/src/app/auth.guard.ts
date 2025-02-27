import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './core/services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSrv: AuthService,
  ) {}

  canActivate(): boolean {
    if (!this.authSrv.isLogged()) {
      this.router.navigate(['/'])
      return false
    }
    return true
  }
}
