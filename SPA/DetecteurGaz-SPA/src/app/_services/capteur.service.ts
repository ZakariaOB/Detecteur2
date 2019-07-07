import { Injectable } from '@angular/core';
import { PagerService } from './pager.service';
import { Capteur } from '../models/capteur';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Constants } from 'src/constantes';

@Injectable({
  providedIn: 'root'
})
export class CapteurService extends PagerService<Capteur> {

  newAlerts: any[];
  constructor(private userService: UserService, private db: AngularFireDatabase) {
    super();
  }

  refreshList(userKey) {
    let firsbasedata: any[];
    this.db.list(Constants.FireBaseDbCapteurNode)
      .snapshotChanges()
      .subscribe(changes => {
        firsbasedata = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.allItems = this.mapFromFireBase(firsbasedata).filter(h => h.userKey === userKey);
        this.setPage(1);
      });
  }

  refresAlerts() {
    let firsbasedata: any[];
    this.db.list(Constants.FireBaseDbCapteurNode)
      .snapshotChanges()
      .subscribe(changes => {
        firsbasedata = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.newAlerts = this.mapFromFireBase(firsbasedata);
        this.userService.refreshList();
        if (this.userService.pagedItems && this.userService.pagedItems.length > 0) {
          for (const u of this.userService.pagedItems) {
            console.log(this.newAlerts.some(f => f.userKey === u.id));
            u.hasAlerts = this.newAlerts && this.newAlerts.some(f => f.userKey === u.id);
          }
        }
      });
  }

  mapFromFireBase(capteurs: any[]) {
    if (capteurs) {
      return capteurs.map(u => this.mapCapteur(u));
    }
    return new Array<Capteur>();
  }

  mapCapteur(capteur) {
    const result = new Capteur();
    if (capteur) {
      result.sensorValue = capteur[Constants.SensorValue];
      result.userKey = capteur['userKey'];
      result.dateValue = capteur['dateValue'];
    }
    return result;
  }
}
