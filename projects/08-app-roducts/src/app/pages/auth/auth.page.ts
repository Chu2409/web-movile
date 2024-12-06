import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  isModal = false;

  group = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
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
        .signIn(this.group.value as User)
        .then(async (res) => {
          this.getUserInfo(res.user.uid)
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

  async getUserInfo(uid: string) {
    if (this.group.valid) {
      const loading = await this.utilsSrv.presentLoading()
      loading.present()
      const path = `users/${uid}`
      this.firebaseSrv.getDocument(path).then((user: any) => {
        if (user) {
          
          this.utilsSrv.saveInLocalStorage('user', user);
          this.utilsSrv.routerLink('main/home');
          this.group.reset();

          this.utilsSrv.presentToast({
            message: `Bienvenido ${user.name}`,
            color: 'success',
            position: 'middle',
            duration: 3000,
            icon: 'person-circle-outline',
          });
        } else {
          throw new Error('User data not found');
        }
      }).catch((err) => {
        this.utilsSrv.presentToast({
          message: err.message,
          color: 'danger',
          position: 'top',
          duration: 2000,
          icon: 'alert-circle-outline',
        });
      })
    }
  }

  onClick() {}
}
