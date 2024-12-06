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

export interface IFollowUp {
  id: number
  reason: string
  status: string
}

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: IFollowUp[] = [
    {
      id: 1,
      reason: 'Fallo en el sistema de autenticación',
      status: 'En revisión',
    },
    { id: 2, reason: 'Lentitud en la aplicación móvil', status: 'En proceso' },
    { id: 3, reason: 'Pérdida de datos en la nube', status: 'Crítico' },
    {
      id: 4,
      reason: 'Problema de compatibilidad de software',
      status: 'Pendiente',
    },
    {
      id: 5,
      reason: 'Actualización de seguridad necesaria',
      status: 'Programado',
    },
  ]
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'reason', title: 'RAZÓN' },
    { field: 'status', title: 'ESTADO' },
  ]
  keypadButtons = keypadButtons
  records: IFollowUp[] = []
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  constructor() {
    this.loadFollowUps()
  }

  loadFollowUps() {
    this.records = this.data
    console.log(this.records)
    this.changePage(0)
  }

  delete(id: number) {
    const position = this.data.findIndex((ind) => ind.id === id)
    this.records = this.data.splice(position, 1)
    this.loadFollowUps()
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
        const followUp = { ...response }
        const position = this.data.findIndex((ind) => ind.id === followUp.id)
        this.data[position] = followUp
        this.loadFollowUps()
        this.showMessage('Elemento actualizado')
      } else {
        const followUp = { ...response, id: this.data.length + 1 }
        this.data.push(followUp)
        this.loadFollowUps()
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
