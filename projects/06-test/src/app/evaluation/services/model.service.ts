import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment.development'
import { IDish } from '../interface/dish.interface'
import { BaseService } from 'src/app/shared/services/base.service'

@Injectable({
  providedIn: 'root',
})
export class ModelService extends BaseService<IDish> {
  constructor(http: HttpClient) {
    super(http, `${environment.API_URL}/dishes`)
  }
}
