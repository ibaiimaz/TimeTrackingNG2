import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Localization } from '../activity/model/timerecord';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() startLocalization: Localization;
  @Input() endLocalization: Localization;
  
  startLocal: Localization;
  endLocal: Localization;
  startTitle: string;
  endTitle: string;

  ngOnInit() {
    this.startTitle = 'Start point';
    this.endTitle = 'End point';
    this.startLocal = this.startLocalization;
    this.endLocal = this.endLocalization;
  }

  ngOnChanges(){
    this.startLocal = this.startLocalization;
    this.endLocal = this.endLocalization;
  }

}
