import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Notification } from './notifications.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  notifications: Notification[];

  constructor(private notificationService: NotificationsService) {
    this.notifications = new Array<Notification>();

    notificationService.noteAdded.subscribe(note => {
      this.notifications.push(note);

      if (!note.lock) {
        setTimeout(() => { this.hide.bind(this)(note) }, 3000);
      }
    });
  }

  private hide(note: Notification): void {
    let index = this.notifications.indexOf(note);

    if (index >= 0) {
      this.notifications.splice(index, 1);
    }
  }
}
