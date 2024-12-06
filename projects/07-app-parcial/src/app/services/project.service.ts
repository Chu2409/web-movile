import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

export interface IProject {
  id: number
  name: string
  description: string
  status: string
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = `${environment.API_URL}/projects`

  constructor(private http: HttpClient) {}

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl)
  }

  createProject(project: IProject): Observable<IProject> {
    return this.http.post<IProject>(this.apiUrl, project)
  }

  updateProject(id: number, project: IProject): Observable<IProject> {
    return this.http.put<IProject>(`${this.apiUrl}/${id}`, project)
  }
}
