import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { TitleComponent } from './title/title.component'
import { FormComponent } from './form/form.component'
import { MatSelectModule } from '@angular/material/select'
import { ListComponent } from './list/list.component'
import { TableComponent } from './table/table.component'
import { PaginatorComponent } from './paginator/paginator.component'

@NgModule({
  declarations: [
    TitleComponent,
    FormComponent,
    ListComponent,
    TableComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatSelectModule,
    TitleComponent,
    FormComponent,
    ListComponent,
  ],
})
export class SharedModule {}
