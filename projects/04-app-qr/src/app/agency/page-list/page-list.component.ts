import { Component, inject } from '@angular/core'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DownloadComponent } from 'src/app/shared/download/download.component'
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface'
import { FormComponent } from '../form/form.component'
import { environment } from 'src/environments/environment.development'
import { MatSnackBar } from '@angular/material/snack-bar'
import { IAgency } from '../interface/agency.interface'
import { AgencyService } from '../services/agency.service'
import { keypadButtons } from '../../shared/data/keypad-buttons'

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'AGENCIA' },
    { field: 'address', title: 'DIRECCIÓN' },
  ]

  keypadButtons = keypadButtons

  dataAux: IAgency[] = []
  data: IAgency[] = []
  dataLength = this.dataAux.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  service = inject(AgencyService)

  constructor() {
    this.loadData()
  }

  loadData() {
    this.service.getAll().subscribe({
      next: (response) => {
        this.dataAux = response
        this.data = [...this.dataAux]
        this.dataLength = this.data.length
        this.changePage(0)
      },
      error: (error) => {
        console.error(error)
      },
    })
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.showMessage('Elemento eliminado')
        this.loadData()
      },
      error: (error) => {
        console.error(error)
      },
    })
  }

  openForm(row: IAgency | null = null) {
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
      if (response.id) {
        const model = { ...response }
        this.service.update(response.id, model).subscribe({
          next: () => {
            this.showMessage('Elemento actualizado')
            this.loadData()
          },
          error: (error) => {
            console.error(error)
          },
        })
      } else {
        this.service.create(response).subscribe({
          next: () => {
            this.showMessage('Nuevo elemento agregado')
            this.loadData()
          },
          error: (error) => {
            console.error(error)
          },
        })
      }
    })
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet('Lista de Agencias', 'agencias', this.dataAux)
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
    this.data = this.dataAux.slice(skip, skip + pageSize)
  }
}
