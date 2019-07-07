import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users/users.component';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { PagerService } from './_services/pager.service';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { DetectorService } from './_services/detector.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { AlertListComponent } from './alerts/alert-list/alert-list.component';
import { NavComponent } from './nav/nav.component';
import { FirebaseTestComponent } from './firebase-test/firebase-test.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from 'src/environments/environment';

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      UsersComponent,
      UserListComponent,
      ContactComponent,
      ContactListComponent,
      AlertListComponent,
      NavComponent,
      FirebaseTestComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      UserService,
      PagerService,
      DetectorService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
