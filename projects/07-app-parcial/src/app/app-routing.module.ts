import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProjectComponent } from './project/project.component'
import { TaskComponent } from './task/task.component'
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
