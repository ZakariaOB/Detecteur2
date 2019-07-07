import { Injectable } from '@angular/core';
import { PagerService } from './pager.service';
import { Contact } from '../models/contact';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Constants } from 'src/constantes';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends PagerService<User> {
  selectedContact: User;

  constructor(private userService: UserService, private db: AngularFireDatabase) {
    super();
  }

  refreshList(contactList) {
    if (!contactList) {
      this.allItems = [];
      this.pagedItems = [];
      return;
    }

    const contactIds = contactList.map(r => r.userId);
    let firsbasedata: any[];
    this.db.list(Constants.FireBaseDbUserNode)
      .snapshotChanges()
      .subscribe(changes => {
        firsbasedata = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.allItems = this.mapFromFireBase(firsbasedata)
                              .filter(h => contactIds.some(g => g === h.id));
        if (this.allItems) {
          this.selectedContact = this.allItems[0];
        }
        this.setPage(1);
      });
  }

  mapFromFireBase(contacts: any[]) {
    if (contacts) {
      return contacts.map(u => this.mapContact(u));
    }
    return new Array<Contact>();
  }

  mapContact(user) {
    const userMapped = new User();
    if (user) {
        userMapped.address = user[Constants.Address];
        userMapped.email = user[Constants.Email];
        userMapped.id = user[Constants.Key];
        userMapped.prenom = user[Constants.LastName];
        userMapped.nom = user[Constants.FirstName];
        userMapped.telephone = user[Constants.PhoneNumber];
    }
    return userMapped;
}

  updateSelectedContact() {
    /*
    if (this.selectedContact) {
      //const key = this.selectedContact.Key;
      this.db.object(Constants.FireBaseDbContactNode + '/' + key).update({
        FirstName: this.selectedContact.FirstName,
        LastName: this.selectedContact.LastName,
        Email: this.selectedContact.Email,
        PhoneNumber: this.selectedContact.PhoneNumber,
        Address: this.selectedContact.Address
      });
    }*/
  }
}
