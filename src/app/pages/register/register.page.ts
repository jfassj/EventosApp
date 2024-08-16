import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  async register(){
    try{
      await this.authService.register(this.email, this.password);
      this.navCtrl.navigateRoot('/tabs')
    }catch(error){
      console.error('Error en el registro:', error);

    }
  }



}
