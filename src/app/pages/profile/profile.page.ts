import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name!: string;
  email!: string;
  newPassword!: string;
  profileImage!: string | undefined;

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.email = user.email!;
        this.name = user.displayName || '';
        this.profileImage = user.photoURL || '';
      }
    });
  }

  async updateProfile(){
    try{
      const user = await this.afAuth.currentUser;
      if (user){
        if(this.name || this.profileImage){
          await user.updateProfile({
            displayName: this.name,
            photoURL: this.profileImage,
          });
        }
        if(this.newPassword){
          await user?.updatePassword(this.newPassword)
        }

        console.log('Perfil Actualizado');
        this.navCtrl.navigateRoot('/home');

      }
      }catch(error){
        console.error('Error al actualizar el perfil:', error);

      }


  }

  async pickImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    const response = await fetch(image.webPath!);
    const blob = await response.blob();


    const filePath = `profile_pictures/${new Date().getTime()}_profile.jpg`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, blob);

    task.snapshotChanges().pipe(
      finalize(() =>{
        fileRef.getDownloadURL().subscribe(url =>{
          this.profileImage = url;
        })
      })
    ).subscribe();
  }

}
