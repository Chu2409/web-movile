import { HttpClient } from '@angular/common/http'
import { Injectable, Inject } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  constructor(
    protected http: HttpClient,
    @Inject(String) protected apiUrl: string,
  ) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl)
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`)
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item)
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item)
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`)
  }
}
