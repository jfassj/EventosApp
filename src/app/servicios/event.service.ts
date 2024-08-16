import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: any;
  location: string;
  organizerId: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private collectionName = 'events';

  constructor(private firestore: AngularFirestore) { }

  // Obtener eventos filtrados por organizerId
  getEvents(organizerId: string): Observable<Event[]> {
    return this.firestore.collection<Event>(this.collectionName, ref =>
      ref.where('organizerId', '==', organizerId)
    ).valueChanges({ idField: 'id' });
  }

  getEvent(id: string): Observable<Event | undefined> {
    return this.firestore.collection<Event>(this.collectionName).doc(id).valueChanges();
  }

  createEvent(event: Event): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({ ...event, id });
  }

  updateEvent(event: Event): Promise<void> {
    if (!event.id) {
      return Promise.reject('Event ID is required for update');
    }
    return this.firestore.collection(this.collectionName).doc(event.id).update(event);
  }

  deleteEvent(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
