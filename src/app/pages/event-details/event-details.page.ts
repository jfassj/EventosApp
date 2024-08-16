import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event, EventService } from 'src/app/servicios/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event!: Event;
  event$!:Observable<Event | undefined>;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router:Router) { }

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(eventId!).subscribe((event) => {
      this.event = event!;
    });

  }

  editEvent() {
    this.router.navigate(['/tabs/event-edit', this.event.id]);
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.event.id!).then(() => {
      this.router.navigate(['/tabs/events']);
    });
  }
}
