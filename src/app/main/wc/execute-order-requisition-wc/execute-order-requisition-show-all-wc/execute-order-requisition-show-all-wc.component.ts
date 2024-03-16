import { Component, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { ExecuteOrderRequisitionWcService } from "src/app/services/main/wc/execute-order-requisition-wc.service";

@Component({
  selector: 'app-execute-order-requisition-show-all-wc',
  templateUrl: './execute-order-requisition-show-all-wc.component.html',
  styleUrls: ['./execute-order-requisition-show-all-wc.component.css']
})
export class ExecuteOrderRequisitionShowAllWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []

   //////////////////////////////////// PrimeNG /////////////////////////////////
   @ViewChild('dt1') dt1: Table | undefined;
   loading: boolean = true;
   selectedOrderName: any[] = []
   selectedWarehouseName: any[] = []
   startDate: any
   endDate: any
   dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _executeOrderRequisitionWcService: ExecuteOrderRequisitionWcService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForOrderName();
    this.customFilterForWarehouseName();
  }

  getData() {
    this.loading = true;
    this._executeOrderRequisitionWcService.selectAll().subscribe((response: any) => {
      this.yarns = response

         // PrimeNG Table
         this.primengConfig.ripple = true;
         this.loading = false;
      
    })
  }

    ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
    customFilterForOrderName() {
      const customFilterName = "order-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedOrderName
  
        if (this.selectedOrderName[0] != null) {
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
              if (value == filter[j].fabric_order_name) {
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
      this.selectedOrderName = []
      this.selectedWarehouseName = []
      this.dateFilters = []
    }
  
    onMultiselectedOrderName(event) {
      this.selectedOrderName = event
      this.dt1?._filter()
    }

    onMultiselectedWarehouseName(event) {
      this.selectedWarehouseName = event
      this.dt1?._filter()
    }

 

}

