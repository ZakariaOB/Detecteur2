import { Component } from '@angular/core';
import { CapteurService } from './_services/capteur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DetecteurGaz-SPA';
  alertsMessage: string;
  capteurService: CapteurService;

  constructor(private cp: CapteurService) {
    this.capteurService = cp;
  }

  isNewAlerts() {
    if (this.capteurService.newAlerts && this.capteurService.newAlerts.length > 0) {
      this.alertsMessage = this.capteurService.newAlerts.length + ' nouvelles alertes détéctées';
      return true;
    }

    return false;
  }
}
