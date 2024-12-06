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

export interface IClaimUnclaim {
  id: number
  type: string
  description: string
}
@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: IClaimUnclaim[] = [
    {
      id: 1,
      type: 'Consulta',
      description: 'Información sobre plazos de entrega',
    },
    { id: 2, type: 'Reclamo', description: 'Producto recibido en mal estado' },
    { id: 3, type: 'Solicitud', description: 'Cambio de dirección de envío' },
    { id: 4, type: 'Queja', description: 'Facturación incorrecta' },
    {
      id: 5,
      type: 'Consulta',
      description: 'Disponibilidad de producto en tienda',
    },
    { id: 6, type: 'Reclamo', description: 'Pedido incompleto' },
    { id: 7, type: 'Solicitud', description: 'Cancelación de suscripción' },
    {
      id: 8,
      type: 'Queja',
      description: 'Atención deficiente en tienda física',
    },
    {
      id: 9,
      type: 'Consulta',
      description: 'Información sobre garantía extendida',
    },
    { id: 10, type: 'Reclamo', description: 'Cobro indebido en tarjeta' },
    {
      id: 11,
      type: 'Solicitud',
      description: 'Actualización de información personal',
    },
    {
      id: 12,
      type: 'Queja',
      description: 'Problemas con la aplicación móvil',
    },
    {
      id: 13,
      type: 'Consulta',
      description: 'Proceso de devolución de productos',
    },
    { id: 14, type: 'Reclamo', description: 'Publicidad engañosa' },
    {
      id: 15,
      type: 'Solicitud',
      description: 'Reembolso por servicio no prestado',
    },
  ]
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'type', title: 'TIPO' },
    { field: 'description', title: 'DESCRIPCIÓN' },
  ]
  keypadButtons = keypadButtons
  records: IClaimUnclaim[] = []
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  constructor() {
    this.loadUnclaims()
  }

  loadUnclaims() {
    this.records = this.data
    console.log(this.records)
    this.changePage(0)
  }

  delete(id: number) {
    const position = this.data.findIndex((ind) => ind.id === id)
    this.records = this.data.splice(position, 1)
    this.loadUnclaims()
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
        const unclaim = { ...response }
        const position = this.data.findIndex((ind) => ind.id === unclaim.id)
        this.data[position] = unclaim
        this.loadUnclaims()
        this.showMessage('Elemento actualizado')
      } else {
        const unclaim = { ...response, id: this.data.length + 1 }
        this.data.push(unclaim)
        this.loadUnclaims()
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
