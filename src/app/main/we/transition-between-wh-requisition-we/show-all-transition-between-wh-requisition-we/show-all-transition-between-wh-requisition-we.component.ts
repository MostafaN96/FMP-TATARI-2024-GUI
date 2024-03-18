import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { TransitionBetweenWhRequisitionWeService } from "src/app/services/main/we/transition-between-wh-requisition-we.service";

@Component({
  selector: 'app-show-all-transition-between-wh-requisition-we',
  templateUrl: './show-all-transition-between-wh-requisition-we.component.html',
  styleUrls: ['./show-all-transition-between-wh-requisition-we.component.css']
})
export class ShowAllTransitionBetweenWhRequisitionWeComponent {

/////////////////// Variables ///////////////////
fabrics: any[] = []
titlePage = ""
//////////////////////////////////// PrimeNG /////////////////////////////////
@ViewChild('dt1') dt1: Table | undefined;
loading: boolean = true;
selectedFromWarehouseName: any[] = []
selectedToWarehouseName: any[] = []
startDate: any
endDate: any
dateFilters: any

constructor(
  public _sharedComponentService: SharedComponentService,
  private _transitionBetweenWhRequisitionWeService: TransitionBetweenWhRequisitionWeService,
  private router: Router,
  private primengConfig: PrimeNGConfig,
  private filterService: FilterService,

) {
  this._sharedComponentService.angularMaterialTableConfig()
}

ngOnInit(): void {
  this.getData()

  this.customFilterForFromWarehouseName();
  this.customFilterForToWarehouseName();
}

getData() {
this.loading = true;
  this._transitionBetweenWhRequisitionWeService.selectAll().subscribe((response: any) => {
    this.fabrics = response

    // PrimeNG Table
       this.primengConfig.ripple = true;
       this.loading = false;
  })
}

///////////////////// ----------- Start Search Tabel ----------- /////////////////////

customFilterForFromWarehouseName() {
  const customFilterName = "from-warehouse-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedFromWarehouseName

    if (this.selectedFromWarehouseName[0] != null) {
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
customFilterForToWarehouseName() {
  const customFilterName = "to-warehouse-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedToWarehouseName

    if (this.selectedToWarehouseName[0] != null) {
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
          if (value == filter[j].to_warehouse_name) {
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
  this.selectedFromWarehouseName = []
  this.selectedToWarehouseName = []
  this.dateFilters = []
}

onMultiselectedFromWarehouseName(event) {
  this.selectedFromWarehouseName = event
  this.dt1?._filter()
}

onMultiselectedToWarehouseName(event) {
  this.selectedToWarehouseName = event
  this.dt1?._filter()
}
///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
