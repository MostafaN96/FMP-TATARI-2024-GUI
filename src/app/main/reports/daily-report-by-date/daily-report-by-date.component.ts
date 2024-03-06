import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import * as moment from 'moment';

@Component({
  selector: 'app-daily-report-by-date',
  templateUrl: './daily-report-by-date.component.html',
  styleUrls: ['./daily-report-by-date.component.css']
})
export class DailyReportByDateComponent implements OnInit {

  /////////////////// Variables ///////////////////
  selectedDataToUpdate: any
  startDate: any 
  endDate: any 
  
  constructor(
    public _sharedComponentService: SharedComponentService,
    public _exportDataService: ExportDataService,
  ) { }

  ngOnInit(): void {
  }

  dateFunc() {
    this.selectedDataToUpdate = { startDate: this.startDate, endDate: this.endDate }
  }

}
