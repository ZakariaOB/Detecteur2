import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  service: ContactService;
  constructor(private serv: ContactService) { this.service = serv; }

  ngOnInit() {
    this.service.selectedContact = new Contact();
  }

}
