import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Constants } from 'src/constantes';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-firebase-test',
  templateUrl: './firebase-test.component.html',
  styleUrls: ['./firebase-test.component.css']
})
export class FirebaseTestComponent implements OnInit, OnDestroy {
  users: any[];
  obj: any;
  objAsync: any;
  usersList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.usersList = db.list(Constants.FireBaseDbUserNode);
    this.usersList.snapshotChanges().subscribe(changes => {
      this.users = changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });

    this.objAsync = db.object('users/2').valueChanges();
  }

  ngOnInit() {
  }

  addObjTest() {
    this.usersList.push({
      FirstName: 'Oussama',
      LastName: 'BouAz',
      PhoneNumber: 'BTS'
    });
  }

  // Necessary with firebase
  ngOnDestroy(): void {
    // Check this out
    //this.subscription.unsubscribe();
  }

  updateUser(user) {
    const key = user['key'];
    this.db.object('users/' + key).update({
      FirstName: 'ADAM',
      LastName: 'ADAM',
      PhoneNumber: 'ADAM'
    });
  }

  deleteUser(user){
    const key = user['key'];
    this.db.object('users/' + key).remove();
  }

  refreshDummyUserData() {
    this.userService.refreshListDummy();
  }
}
