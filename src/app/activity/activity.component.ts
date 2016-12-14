import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TrackingService } from '../tracking.service';
import { TimeRecord } from '../activity/model/timerecord';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification } from '../notifications/notifications.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  private activityId: number;
  activity: TimeRecord;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, 
  private trackingService: TrackingService,
  private notificationService: NotificationsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activityId = +params['id']; // (+) converts string 'id' to a number

      this.trackingService.getTimeRecord(this.activityId)
        .subscribe(timeRecord => {
          this.activity = timeRecord;
          console.log(timeRecord);
          this.loading = false;
        },
          err => {
            // Log errors if any
            this.notificationService.add(new Notification('error', err, true));
          });
    });
  }

}
