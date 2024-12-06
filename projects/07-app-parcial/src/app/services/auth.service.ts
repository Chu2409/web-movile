import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { environment } from 'src/environments/environment.development'

export interface IUser {
  id: number
  email: string
  password: string
  role: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/users/login`

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response))
        }
      }),
    )
  }

  isLogged(): boolean {
    return localStorage.getItem('user') !== null
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user')
    if (user) {
      const userObj = JSON.parse(user)
      return userObj.role || null
    }
    return null
  }

  logout(): void {
    localStorage.removeItem('user')
  }
}
