import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { DyeingRequisitionWdService } from "src/app/services/main/wd/dyeing-requisition-wd.service";

@Component({
  selector: 'app-show-all-dyeing-requisition-wd',
  templateUrl: './show-all-dyeing-requisition-wd.component.html',
  styleUrls: ['./show-all-dyeing-requisition-wd.component.css']
})
export class ShowAllDyeingRequisitionWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedDyeingName: any[] = []
  selectedWarehouseName: any[] = []
  selectedReleaseProcess: any[] = []
  startDate: any
  endDate: any
  dateFilters: any
  dyeingDetails: any[] = []
  selectedWorkOrderNumberDetails: any[] = []


  constructor(
    public _sharedComponentService: SharedComponentService,
    private _dyeingRequisitionWdService: DyeingRequisitionWdService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForDyeingName();
    this.customFilterForWarehouseName();
    this.customFilterForReleaseProcess();
    this.customFilterForWorkOrderNumberDetails();
  }

  getData() {
    this.loading = true;
    this._dyeingRequisitionWdService.selectAll().subscribe((response: any) => {
      this.fabrics = response

      this.getDyeingDetails(this.fabrics)

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }


  getDyeingDetails(data) {
    let filter = [{}]
    for (let i = 0; i < data.length; i++) {
      const fabric = data[i];
      for (let j = 0; j < fabric.details.length; j++) {
        let element = fabric.details[j];
        if (filter.indexOf(element['work_order_number']) < 0) {
          filter.push(element['work_order_number'])
          this.dyeingDetails.push(element)
        }
      }
    }
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForDyeingName() {
    const customFilterName = "dyeing-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingName

      if (this.selectedDyeingName[0] != null) {
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
            if (value == filter[j].dyeing_name) {
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


  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForWarehouseName() {
    const customFilterName = "warehouse-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehouseName

      if (this.selectedWarehouseName[0] != null) {
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
            if (value == filter[j].warehouse_name) {
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
  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForReleaseProcess() {
    const customFilterName = "release-process-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedReleaseProcess

      if (this.selectedReleaseProcess[0] != null) {
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
            if (value == filter[j].release_process) {
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
  customFilterForWorkOrderNumberDetails() {
    const customFilterName = "work-order-number-details-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWorkOrderNumberDetails

      if (this.selectedWorkOrderNumberDetails[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          let count = 0
          for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < filter.length; j++) {
              if (value[i].work_order_number == filter[j].work_order_number) {
                count++
                if (count == filter.length) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      }
      else {
        return true;
      }
    });
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

        }
        return false;
      }
      else {
        return true;
      }
    })
    this.dt1?.filter(event, "date", "date-filter")
  }

  // Reset table filters
  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedDyeingName = []
    this.selectedWarehouseName = []
    this.selectedReleaseProcess = []
    this.selectedWorkOrderNumberDetails = []
    this.dateFilters = []
  }

  onMultiselectedDyeingName(event) {
    this.selectedDyeingName = event
    this.dt1?._filter()
  }

  onMultiselectedWarehouseName(event) {
    this.selectedWarehouseName = event
    this.dt1?._filter()
  }

  onMultiselectedReleaseProcess(event) {
    this.selectedReleaseProcess = event
    this.dt1?._filter()
  }

  onMultiselectedWorkOrderNumberDetails(event) {
    this.selectedWorkOrderNumberDetails = event
    this.dt1?._filter()
  }

}
