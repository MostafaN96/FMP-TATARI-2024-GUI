import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";

// Call Service
import { TransportWdWcRequisitionWdService } from "../../../../services/main/wd/transport-wd-wc-requisition-wd.service";

@Component({
  selector: 'app-show-all-transport-wd-wc-requisition-wd',
  templateUrl: './show-all-transport-wd-wc-requisition-wd.component.html',
  styleUrls: ['./show-all-transport-wd-wc-requisition-wd.component.css']
})
export class ShowAllTransportWdWcRequisitionWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedDyeingName: any[] = []
  startDate: any
  endDate: any
  dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _transportWdWcRequisitionWdService: TransportWdWcRequisitionWdService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForDyeingName();
  }
  getData() {
    this.loading = true;
    this._transportWdWcRequisitionWdService.selectAll().subscribe((response: any) => {
      this.fabrics = response

        // PrimeNG Table
        this.primengConfig.ripple = true;
        this.loading = false;
    })
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
          if(filter[0] != null && filter[1] != null) {
            
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
    this.dateFilters = []
  }


  onMultiselectedDyeingName(event) {
    this.selectedDyeingName = event
    this.dt1?._filter()
  }


}

