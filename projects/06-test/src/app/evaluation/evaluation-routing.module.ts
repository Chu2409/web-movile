import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationRoutingModule {}
