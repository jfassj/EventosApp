import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName!:string;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.userName = user.displayName || user.email!.split('@')[0];
      }
    });
  }

   async signOut(){
     try{
       await this.authService.logout();
       this.router.navigate(['/login']);
     }catch(error){
       console.error('Error al cerrar sesión', error);

     }
   }

}

