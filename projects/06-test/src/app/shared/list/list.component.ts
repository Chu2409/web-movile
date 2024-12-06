import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { MetaDataColumn } from '../table/table.component'
import { IDish } from 'src/app/evaluation/interface/dish.interface'
import { ModelService } from 'src/app/evaluation/services/model.service'
import { environment } from 'src/environments/environment.development'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnChanges {
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'NOMBRE' },
    { field: 'country', title: 'PAÍS' },
    { field: 'ingredient', title: 'INGREDIENTE' },
    { field: 'time', title: 'TIEMPO' },
    { field: 'difficulty', title: 'DIFICULTAD' },
  ]

  @Output() editEmitter: EventEmitter<IDish> = new EventEmitter<IDish>()
  @Input() reloadFlag = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reloadFlag'] !== undefined) {
      console.log('Recargando datos')

      this.loadData()
    }
  }

  dataAux: IDish[] = []
  data: IDish[] = []
  dataLength = this.dataAux.length

  service = inject(ModelService)

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
        this.loadData()
      },
      error: (error) => {
        console.error(error)
      },
    })
  }

  onEditClick(model: IDish) {
    this.editEmitter.emit(model)
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.dataAux.slice(skip, skip + pageSize)
  }
}
