import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  service: UserService;

  constructor(private serv: UserService) { this.service = serv; }

  ngOnInit() {
    this.service.selectedUser = new User();
  }

}
