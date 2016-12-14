import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import {MomentModule} from 'angular2-moment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { TrackingService } from './tracking.service';
import { routing } from './app.routes';
import { NotfoundComponent } from './notfound/notfound.component';
import { ClickLoadingDirective } from './click-loading.directive';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './notifications/notifications.service';
import { GeolocationService } from './geolocation.service';
import { ModalService } from './modal.service';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapsComponent } from './maps/maps.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivityComponent,
    NotfoundComponent,
    ClickLoadingDirective,
    NotificationsComponent,
    MapsComponent,
    ModalComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4nhRMraaxBise1pJLmezfv6oFUOTvx7s'
    })
  ],
  providers: [TrackingService, NotificationsService, GeolocationService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
