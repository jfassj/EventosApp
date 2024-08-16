import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Event, EventService } from 'src/app/servicios/event.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.page.html',
  styleUrls: ['./event-edit.page.scss'],
})
export class EventEditPage implements OnInit {

  event: Event = {title:'', description: '', date: new Date(), location:'', organizerId: ''};
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isEditMode = true;
      this.eventService.getEvent(id).subscribe(event => this.event = event || this.event);
    }

    this.afAuth.currentUser.then(user =>{
      if(user){
        this.event.organizerId = user.uid;
      }
    });
  }

  saveEvent(){
    if(this.isEditMode){
      this.eventService.updateEvent(this.event).then(() => this.router.navigate(['/tabs/events']));
    }else {
      this.eventService.createEvent(this.event).then(() => this.router.navigate(['/tabs/events']));
    }
  }

  deleteEvent(){
    if(this.isEditMode){
      this.eventService.deleteEvent(this.event.id!).then(()=> this.router.navigate(['/events']))
    }
  }

}

