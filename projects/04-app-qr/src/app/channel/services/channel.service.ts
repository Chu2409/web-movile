import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment.development'
import { BaseService } from 'src/app/shared/services/base.service'
import { IChannel } from '../inteface/channel.interface'

@Injectable({
  providedIn: 'root',
})
export class ChannelService extends BaseService<IChannel> {
  constructor(http: HttpClient) {
    super(http, `${environment.API_URL}/channels`)
  }
}
