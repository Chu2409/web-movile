import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage  {
  group = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSrv = inject(FirebaseService);
  utilsSrv = inject(UtilsService);


  async submit() {
    if (this.group.valid) {
      const loading = await this.utilsSrv.presentLoading({
        message: 'Signing up...',
      });
      loading.present();
      this.firebaseSrv
        .sendResetEmail(this.group.value.email!)
        .then( () => {
          this.utilsSrv.routerLink('/auth');
        })
        .catch((err) => {
          this.utilsSrv.presentToast({
            message: err.message,
            color: 'danger',
            position: 'top',
            duration: 2000,
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        }); 
    }
  }

}
