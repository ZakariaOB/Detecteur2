import { Routes } from '@angular/router';
import { ContactListComponent } from './app/contacts/contact-list/contact-list.component';
import { UsersComponent } from './app/users/users/users.component';
import { AlertListComponent } from './app/alerts/alert-list/alert-list.component';
import { FirebaseTestComponent } from './app/firebase-test/firebase-test.component';

export const appRoutes: Routes = [
    { path: 'user', component: UsersComponent },
    { path: 'contact/:id', component: ContactListComponent },
    { path: 'capteur/:id', component: AlertListComponent },
    { path: 'firebasetest', component: FirebaseTestComponent },
    { path: '**', redirectTo: 'user', pathMatch: 'full' }
];
