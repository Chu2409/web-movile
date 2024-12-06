import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment.development'
import { IAgency } from '../interface/agency.interface'
import { BaseService } from 'src/app/shared/services/base.service'

@Injectable({
  providedIn: 'root',
})
export class AgencyService extends BaseService<IAgency> {
  constructor(http: HttpClient) {
    super(http, `${environment.API_URL}/agencies`)
  }
}
