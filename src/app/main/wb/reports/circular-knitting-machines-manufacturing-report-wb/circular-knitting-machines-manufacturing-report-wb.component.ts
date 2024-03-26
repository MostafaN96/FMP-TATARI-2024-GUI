import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import * as moment from 'moment';

@Component({
  selector: 'app-circular-knitting-machines-manufacturing-report-wb',
  templateUrl: './circular-knitting-machines-manufacturing-report-wb.component.html',
  styleUrls: ['./circular-knitting-machines-manufacturing-report-wb.component.css']
})
export class CircularKnittingMachinesManufacturingReportWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedCodes: any[] = []
  selectedIndustry: any[] = []
  dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWbService: ReportWbService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForCode();
    this.customFilterForIndustry();
  }

  getData() {
    this.loading = true;
    this._reportWbService.circularKnittingMachinesManufacturingReport().subscribe((response: any) => {
      this.yarns = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  selectedDate(event) {
    this.filterService.register("date-filter", (value: any, filter: any[]): boolean => {
      filter = this.dateFilters

      if (event != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0
          if (filter[0] != null && filter[1] != null) {

            if (moment(value).format('YYYY-MM-DD') >= moment(filter[0]).format('YYYY-MM-DD') &&
              moment(value).format('YYYY-MM-DD') <= moment(filter[1]).format('YYYY-MM-DD')) {
              return true;
            }

          } else if (filter[0] != null && filter[1] == null) {

            if (moment(value).format('YYYY-MM-DD') > moment(filter[0]).format('YYYY-MM-DD')) {
              return false;
            } else if (moment(value).format('YYYY-MM-DD') < moment(filter[0]).format('YYYY-MM-DD')) {
              return false;
            } else {
              return true;
            }
          }

          // for (let i = 0; i < value.length; i++) {
          // for (let j = 0; j < filter.length; j++) {
          // if (value == filter[j].dyed_fabric_code ) {
          // count++
          // if (count == filter.length) {
          // return true;
          // }
          // }
          // }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    })
    this.dt1?.filter(event, "date", "date-filter")
  }

  customFilterForCode() {
    const customFilterName = "code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCodes

      if (this.selectedCodes[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].fabric_code) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForIndustry() {
    const customFilterName = "industry-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedIndustry

      if (this.selectedIndustry[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].industry_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  // Reset table filters
  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedCodes = []
    this.selectedIndustry = []
    this.dateFilters = []
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedIndustry(event) {
    this.selectedIndustry = event
    this.dt1?._filter()
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
