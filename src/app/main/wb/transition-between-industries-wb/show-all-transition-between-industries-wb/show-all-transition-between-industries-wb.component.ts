import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";

// Call Service
import { TransitionBetweenRequisitionWbService } from "../../../../services/main/wb/transition-between-requisition-wb.service";

@Component({
  selector: 'app-show-all-transition-between-industries-wb',
  templateUrl: './show-all-transition-between-industries-wb.component.html',
  styleUrls: ['./show-all-transition-between-industries-wb.component.css']
})
export class ShowAllTransitionBetweenIndustriesWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []

       //////////////////////////////////// PrimeNG /////////////////////////////////
       @ViewChild('dt1') dt1: Table | undefined;
       loading: boolean = true;
       selectedFromIndustryName: any[] = []
       selectedToIndustryName: any[] = []
       startDate: any
       endDate: any
       dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _transitionBetweenRequisitionWbService: TransitionBetweenRequisitionWbService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForFromIndustryName();
    this.customFilterForToIndustryName();
  }

  getData() {
    this.loading = true;
    this._transitionBetweenRequisitionWbService.selectAll().subscribe((response: any) => {
      this.yarns = response
    
       // PrimeNG Table
       this.primengConfig.ripple = true;
       this.loading = false;

    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForFromIndustryName() {
    const customFilterName = "from-industry-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFromIndustryName

      if (this.selectedFromIndustryName[0] != null) {
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
            if (value == filter[j].from_industry_name) {
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
    customFilterForToIndustryName() {
      const customFilterName = "to-industry-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedToIndustryName
  
        if (this.selectedToIndustryName[0] != null) {
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
              if (value == filter[j].to_industry_name) {
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
    this.selectedFromIndustryName = []
    this.selectedToIndustryName = []
    this.dateFilters = []
  }

  onMultiselectedFromIndustryName(event) {
    this.selectedFromIndustryName = event
    this.dt1?._filter()
  }

  onMultiselectedToIndustryName(event) {
    this.selectedToIndustryName = event
    this.dt1?._filter()
  }


}
