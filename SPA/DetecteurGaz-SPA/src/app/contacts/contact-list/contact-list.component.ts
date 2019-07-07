import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';
import { DetectorService } from 'src/app/_services/detector.service';
import { Contact } from 'src/app/models/contact';
import { ActivatedRoute } from '@angular/router';
import { User, UserContact } from 'src/app/models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  service: ContactService;
  user: User;
  contactEmail: string;
  users: User[];

  constructor(private serv: ContactService,
    private userService: UserService,
    private detectorService: DetectorService,
    private route: ActivatedRoute) { this.service = serv; }

  ngOnInit() {
    this.loadContactList();
  }

  populateForm(contact: Contact) {
    this.service.selectedContact = Object.assign({}, contact);
  }

  onEditcontact(contact) {
    this.service.selectedContact = Object.assign({}, contact);
  }

  loadContactList() {
    this.userService.refreshList();
    const idLiteral = 'id';
    const key = this.route.snapshot.params[idLiteral];
    this.users = this.userService.allItems;
    if (this.users) {
      const user = this.users.find(u => u.id === key);
      if (user) {
        this.user = user;
      }
      this.service.refreshList(user.contacts);
    }
  }

  updateContact() {
    this.service.updateSelectedContact();
  }

  addContact() {
    if (this.contactEmail) {
      const foundUser = this.users.find(o => o.email === this.contactEmail);
      if (foundUser && this.user) {
        const p = new UserContact();
        p.priority = 1;
        p.userId = foundUser.id;
        if (!this.user.contacts) {
          this.user.contacts = [];
        }
        this.user.contacts.push(p);
        this.userService.addUserAsContact(this.user);
      }
      this.loadContactList();
    }
  }
}
