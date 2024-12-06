import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

export interface ITask {
  id: number
  name: string
  description: string
  status: string
  project_id: number
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.API_URL}/tasks`

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl)
  }

  createTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task)
  }

  updateTask(id: number, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/${id}`, task)
  }
}
