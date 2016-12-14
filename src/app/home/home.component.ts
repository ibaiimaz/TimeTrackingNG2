import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MomentModule } from 'angular2-moment/moment.module';

import { TrackingService } from '../tracking.service';
import { TimeRecord, Localization } from '../activity/model/timerecord';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification } from '../notifications/notifications.model';
import { GeolocationService } from '../geolocation.service';
import { ModalService } from '../modal.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activity: string;
  lastRecord: TimeRecord;
  //canStartTracking: boolean = true;
  timeRecords: TimeRecord[];
  //timeRecordsObservable: Observable<TimeRecord[]>;

  modalStartLocalization: Localization;// = new Localization(1, 1);
  modalEndLocalization: Localization;// = new Localization(1, 1);
  MODAL_ID: string;

  constructor(private trackingService: TrackingService,
    private notificationService: NotificationsService,
    private geolocationService: GeolocationService,
    private modal: ModalService) {
    this.MODAL_ID = "activity-map";
  }

  ngOnInit() {
    //this.timeRecordsObservable = this.trackingService.getTimeRecords(10);
    this.trackingService.getTimeRecords(10).subscribe(
      timeRecords => {
        this.timeRecords = timeRecords;
        if (timeRecords.length > 0) {
          //let lastRecord = timeRecords[0];
          this.lastRecord = timeRecords[0];
          if (!this.lastRecord.isCompleted) {
            this.activity = this.lastRecord.activity;
          }
          //this.canStartTracking = lastRecord.isCompleted;
        }
        console.log(this.lastRecord);
      },
      err => {
        // Log errors if any
        this.notificationService.add(new Notification('error', err, true));
      });

  }

  canStartTracking() {
    if (!this.lastRecord) {
      return true;
    }
    return this.lastRecord.isCompleted;
  }

  startActivity() {
    let newTimeRecord = {
      IsCompleted: false,
      Activity: this.activity,
      StartLocalization: {}
    };

    this.geolocationService.getLocation(null).subscribe(
      location => {
        newTimeRecord.StartLocalization = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        this.trackingService.setTimeRecord(newTimeRecord).subscribe(
          timeRecord => {
            this.lastRecord = timeRecord;
            this.timeRecords.unshift(timeRecord);
            this.notificationService.add(new Notification('success', 'You just started to track your time!'));
          },
          err => {
            // Log errors if any
            this.notificationService.add(new Notification('error', err, true));
          })
      },
      err => {
        // Log errors if any
        this.notificationService.add(new Notification('error', err, true));
      });
  }

  endActivity() {
    this.geolocationService.getLocation(null).subscribe(
      location => {
        this.lastRecord.endLocalization = new Localization(location.coords.longitude, location.coords.latitude, null);
        this.trackingService.setTimeRecord(this.lastRecord).subscribe(
          timeRecord => {
            let currentRecordIndex = this.timeRecords.findIndex(c => c.id === timeRecord.id);
            this.timeRecords[currentRecordIndex] = timeRecord;
            this.lastRecord = timeRecord;
            this.activity = "";
            this.notificationService.add(new Notification('success', 'You just stopped!'));
          },
          err => {
            // Log errors if any
            this.notificationService.add(new Notification('error', 'Error al detener la actividad.', true));
          })
      },
      err => {
        // Log errors if any
        this.notificationService.add(new Notification('error', err, true));
      });
  }

  showModal(activity: TimeRecord): void {
    this.modalStartLocalization = activity.startLocalization;
    this.modalEndLocalization = activity.endLocalization;

    this.modal.open(this.MODAL_ID);
  }

  private getPropertyValue(prop: string): string {
        return this[prop];
    }
}
