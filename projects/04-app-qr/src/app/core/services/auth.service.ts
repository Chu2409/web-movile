import { inject, Injectable } from '@angular/core'
import {
  UserCredential,
  signInWithEmailAndPassword,
  Auth,
} from '@angular/fire/auth'
import { User } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { StateService } from './state.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth)
  router = inject(Router)
  stateSrv = inject(StateService)

  async login(email: string, password: string): Promise<UserCredential> {
    const credentials = await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    )

    this.saveDataInLocalStorage(credentials.user)

    return credentials
  }

  saveDataInLocalStorage(user: User) {
    localStorage.setItem(
      'user',
      JSON.stringify({ uid: user.uid, email: user.email }),
    )
  }

  getUser(): User {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  isLogged(): boolean {
    return !!this.getUser()
  }

  signOut() {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
    this.stateSrv.toggleVisibility()
  }
}
