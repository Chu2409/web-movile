import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'
import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component'
import { EvaluationRoutingModule } from './evaluation-routing.module'

@NgModule({
  declarations: [LoginComponent, MainComponent],
  imports: [CommonModule, EvaluationRoutingModule, SharedModule],
})
export class EvaluationModule {}
