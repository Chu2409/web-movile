import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  isModal = false;

  group = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
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
        .singUp(this.group.value as User)
        .then(async (res) => {
          await this.firebaseSrv.updateProfile(this.group.value.name as string);
          let uid = res.user.uid;
          this.group.controls.uid.setValue(uid);
          this.setUserInfo(uid);
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

  async setUserInfo(uid: string) {
    if (this.group.valid) {
      const loading = await this.utilsSrv.presentLoading();
      loading.present();
      const path = `users/${uid}`;
      delete this.group.value.password;

      this.firebaseSrv.setDocument(path, this.group.value).then(async (res) => {
        this.utilsSrv.saveInLocalStorage('user', this.group.value);
        this.utilsSrv.routerLink('main/home')
      }).catch((err) => {
        this.utilsSrv.presentToast({
          message: err.message,
          color: 'danger',
          position: 'top',
          duration: 2000,
          icon: 'alert-circle-outline',
        });
      });
    }
  }
}
