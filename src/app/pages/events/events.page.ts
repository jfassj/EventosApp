import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { EventService, Event } from 'src/app/servicios/event.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service'; // Asegúrate de tener un servicio de autenticación

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  events$: Observable<Event[]> = new Observable<Event[]>();


  constructor(
    private eventService: EventService,
    private router: Router,
    private authService: AuthService // Servicio de autenticación
  ) { }

   ngOnInit() {
    this.events$ = this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.eventService.getEvents(user.uid); // Usa el uid del usuario para filtrar eventos
        } else {
          console.error('No user logged in');
          return []; // O manejar el caso cuando no hay usuario
        }
      })
    );
  }

  viewEventDetails(event: Event) {
    this.router.navigate(['/tabs/event-details', event.id]);
  }
}
