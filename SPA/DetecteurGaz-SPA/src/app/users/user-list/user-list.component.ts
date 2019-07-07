import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';
import { CapteurService } from 'src/app/_services/capteur.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  service: UserService;
  capteurService: CapteurService;
  userFireBaseData: any[];
  alertsMessage: string;

  constructor(private serv: UserService, private cp: CapteurService) {
    this.service = serv;
    this.capteurService = cp;
  }

  ngOnInit() {
    this.service.refreshList();
    this.capteurService.refresAlerts();
  }

  onDelete(id: number) {
    /*
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }*/
  }

  onEditUser(user) {
    this.service.selectedUser = Object.assign({}, user);
  }

  updateUser() {
    this.service.updateSelectedUser();
  }

  isNewAlerts() {
    if (this.capteurService.newAlerts && this.capteurService.newAlerts.length > 0) {
      this.alertsMessage = this.capteurService.newAlerts.length + ' nouvelles alertes détéctées';
      return true;
    }

    return false;
  }
}
