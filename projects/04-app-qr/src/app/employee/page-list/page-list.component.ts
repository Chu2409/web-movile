import { Component, inject } from '@angular/core'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { DownloadComponent } from 'src/app/shared/download/download.component'
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface'
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface'
import { environment } from 'src/environments/environment.development'
import { FormComponent } from '../form/form.component'
import { keypadButtons } from 'src/app/shared/data/keypad-buttons'

export interface IEmployee {
  id: number
  name: string
  lastName: string
  position: string
}
@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: IEmployee[] = [
    {
      id: 1,
      name: 'Carlos',
      lastName: 'Mendoza',
      position: 'Gerente General',
    },
    {
      id: 2,
      name: 'Sofía',
      lastName: 'Vargas',
      position: 'Coordinadora de Marketing',
    },
    {
      id: 3,
      name: 'Javier',
      lastName: 'Paredes',
      position: 'Desarrollador Senior',
    },
  ]
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'NOMBRE' },
    { field: 'lastName', title: 'APELLIDO' },
    { field: 'position', title: 'CARGO' },
  ]
  keypadButtons = keypadButtons
  records: IEmployee[] = []
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  constructor() {
    this.loadEmployees()
  }

  loadEmployees() {
    this.records = this.data
    console.log(this.records)
    this.changePage(0)
  }

  delete(id: number) {
    const position = this.data.findIndex((ind) => ind.id === id)
    this.records = this.data.splice(position, 1)
    this.loadEmployees()
  }

  openForm(row: any | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row,
    }
    const reference: MatDialogRef<FormComponent> = this.dialog.open(
      FormComponent,
      options,
    )

    reference.afterClosed().subscribe((response) => {
      if (!response) {
        return
      }
      if (response.id) {
        const channel = { ...response }
        const position = this.data.findIndex((ind) => ind.id === response.id)
        this.data[position] = channel
        this.loadEmployees()
        this.showMessage('Elemento actualizado')
      } else {
        const channel = { ...response, id: this.data.length + 1 }
        this.data.push(channel)
        this.loadEmployees()
        this.showMessage('Nuevo elemento agregado')
      }
    })
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet('Lista de Canales', 'canales', this.data)
        break
      case 'NEW':
        this.openForm()
        break
    }
  }

  showBottomSheet(title: string, fileName: string, data: any) {
    this.bottomSheet.open(DownloadComponent)
  }

  showMessage(message: string, duration = 5000) {
    this.snackBar.open(message, '', { duration })
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.records.slice(skip, skip + pageSize)
  }
}
