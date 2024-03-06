import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";

// Call Service
import { TransitionBetweenRequisitionWdService } from "../../../../services/main/wd/transition-between-requisition-wd.service";

@Component({
  selector: 'app-show-all-transition-between-dyers-wd',
  templateUrl: './show-all-transition-between-dyers-wd.component.html',
  styleUrls: ['./show-all-transition-between-dyers-wd.component.css']
})
export class ShowAllTransitionBetweenDyersWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []

 //////////////////////////////////// PrimeNG /////////////////////////////////
 @ViewChild('dt1') dt1: Table | undefined;
 loading: boolean = true;
 selectedFromDyeing: any[] = []
 selectedToDyeing: any[] = []
 startDate: any
 endDate: any
 dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _transitionBetweenRequisitionWdService: TransitionBetweenRequisitionWdService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForFromDyeing();
    this.customFilterForToDyeing();
  }

  getData() {
    this.loading = true;

    this._transitionBetweenRequisitionWdService.selectAll().subscribe((response: any) => {
      this.fabrics = response
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

   ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
   customFilterForFromDyeing() {
    const customFilterName = "from-dyeing-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFromDyeing

      if (this.selectedFromDyeing[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].from_dyeing) {
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
   customFilterForToDyeing() {
    const customFilterName = "to-dyeing-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedToDyeing

      if (this.selectedToDyeing[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].to_dyeing) {
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
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
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
    this.selectedFromDyeing = []
    this.selectedToDyeing = []
    this.dateFilters = []
  }

  onMultiselectedFromDyeing(event) {
    this.selectedFromDyeing = event
    this.dt1?._filter()
  }

  onMultiselectedToDyeing(event) {
    this.selectedToDyeing = event
    this.dt1?._filter()
  }

}
