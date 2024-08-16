import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      { path: 'events', loadChildren: () => import('../events/events.module').then(m => m.EventsPageModule) },
      { path: 'event-details/:id', loadChildren: () => import('../event-details/event-details.module').then(m => m.EventDetailsPageModule) },
      { path: 'event-edit', loadChildren: () => import('../event-edit/event-edit.module').then(m => m.EventEditPageModule) },
      { path: 'event-edit/:id', loadChildren: () => import('../event-edit/event-edit.module').then(m => m.EventEditPageModule) },
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule) },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
