import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateComponent } from 'src/app/shared/components/add-update/add-update.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  firebaseSrv = inject(FirebaseService)
  utilSrv = inject(UtilsService)

  async addUpdateProduct() {
    const success = await this.utilSrv.presentModal({
      component: AddUpdateComponent,
      cssClass: 'add-update-modal',
      componentProps: {}
      
    })
  }
}
