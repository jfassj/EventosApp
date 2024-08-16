import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'; // Importa User desde 'firebase/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$!: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState as Observable<User | null>;
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$; // Devuelve el observable de authState
  }

  async register(email: string, password: string){
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string){
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(){
    return await this.afAuth.signOut();
  }
}
