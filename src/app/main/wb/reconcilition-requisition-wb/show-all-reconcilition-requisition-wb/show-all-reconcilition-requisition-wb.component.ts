import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { ReconcilitionRequisitionWbService } from "src/app/services/main/wb/reconcilition-requisition-wb.service";

@Component({
  selector: 'app-show-all-reconcilition-requisition-wb',
  templateUrl: './show-all-reconcilition-requisition-wb.component.html',
  styleUrls: ['./show-all-reconcilition-requisition-wb.component.css']
})
export class ShowAllReconcilitionRequisitionWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []

     //////////////////////////////////// PrimeNG /////////////////////////////////
     @ViewChild('dt1') dt1: Table | undefined;
     loading: boolean = true;
     selectedIndustryName: any[] = []
     selectedCreatorId: any[] = []
     startDate: any
     endDate: any
     dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reconcilitionRequisitionWbService: ReconcilitionRequisitionWbService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForIndustryName();
    this.customFilterForCreatorId();

  }

  getData() {
    this.loading = true;
    this._reconcilitionRequisitionWbService.selectAll().subscribe((response: any) => {
      this.yarns = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;

    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForIndustryName() {
    const customFilterName = "industry-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedIndustryName

      if (this.selectedIndustryName[0] != null) {
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

    ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
    customFilterForCreatorId() {
      const customFilterName = "creator-id-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedCreatorId
  
        if (this.selectedCreatorId[0] != null) {
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
              if (value == filter[j].creator_id) {
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
    this.selectedIndustryName = []
    this.selectedCreatorId = []
    this.dateFilters = []
  }

  onMultiselectedIndustryName(event) {
    this.selectedIndustryName = event
    this.dt1?._filter()
  }

  onMultiselectedCreatorId(event) {
    this.selectedCreatorId = event
    this.dt1?._filter()
  }

}
