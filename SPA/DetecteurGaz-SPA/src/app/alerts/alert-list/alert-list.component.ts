import { Component, OnInit } from '@angular/core';
import { CapteurService } from 'src/app/_services/capteur.service';
import { Capteur } from 'src/app/models/capteur';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {

  service: CapteurService;
  capteur: Capteur;
  user: User;

  constructor(private userService: UserService,
              private capt: CapteurService,
              private route: ActivatedRoute) { this.service = capt; }

  ngOnInit() {
    this.loadCapteurList();
  }

  loadCapteurList() {
    this.userService.refreshList();
    const idLiteral = 'id';
    const key = this.route.snapshot.params[idLiteral];
    const users = this.userService.allItems;
    console.log(users);
    if (users) {
      const user = users.find(u => u.id === key);
      if (user) {
        this.user = user;
      }
    }

    this.service.refreshList(key);
  }
}
