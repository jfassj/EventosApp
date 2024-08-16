import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  email!: string;
  password!:string;

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  async login(){
    try{
      await this.authService.login(this.email, this.password);
      this.navCtrl.navigateRoot('/tabs')
    }catch(error){
      console.error('Error en el inicio de sesión: ', error);

    }
  }

}
