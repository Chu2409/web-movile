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

export interface IClient {
  id: number
  name: string
  lastName: string
  address: string
}
@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: IClient[] = [
    {
      id: 1,
      name: 'Pablo',
      lastName: 'Villacrés',
      address: 'Av. 6 de Diciembre, Quito',
    },
    {
      id: 2,
      name: 'María',
      lastName: 'Sánchez',
      address: 'Calle Olmedo, Loja',
    },
    {
      id: 3,
      name: 'Juan',
      lastName: 'Vera',
      address: 'Av. Manabí, Portoviejo',
    },
    {
      id: 4,
      name: 'Laura',
      lastName: 'Castro',
      address: 'Malecón, Esmeraldas',
    },
    {
      id: 5,
      name: 'Roberto',
      lastName: 'Pérez',
      address: 'Av. 4 de Noviembre, Manta',
    },
  ]
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'NOMBRE' },
    { field: 'lastName', title: 'APELLIDO' },
    { field: 'address', title: 'DIRECCIÓN' },
  ]
  keypadButtons = keypadButtons
  records: IClient[] = []
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  constructor() {
    this.loadClients()
  }

  loadClients() {
    this.records = this.data
    console.log(this.records)
    this.changePage(0)
  }

  delete(id: number) {
    const position = this.data.findIndex((ind) => ind.id === id)
    this.records = this.data.splice(position, 1)
    this.loadClients()
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
        const client = { ...response }
        const position = this.data.findIndex((ind) => ind.id === response.id)
        this.data[position] = client
        this.loadClients()
        this.showMessage('Elemento actualizado')
      } else {
        const client = { ...response, id: this.data.length + 1 }
        this.data.push(client)
        this.loadClients()
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
