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
import { TransitionBetweenOrdersRequisitionWcService } from "src/app/services/main/wc/transition-between-orders-requisition-wc.service";

@Component({
  selector: 'app-transition-between-orders-requisition-show-all-wc',
  templateUrl: './transition-between-orders-requisition-show-all-wc.component.html',
  styleUrls: ['./transition-between-orders-requisition-show-all-wc.component.css']
})
export class TransitionBetweenOrdersRequisitionShowAllWcComponent {

  /////////////////// Variables ///////////////////
    fabrics: any[] = []
    titlePage = ""
    //////////////////////////////////// PrimeNG /////////////////////////////////
    @ViewChild('dt1') dt1: Table | undefined;
    loading: boolean = true;
    selectedFromDyedFabricOrderName: any[] = []
    selectedToDyedFabricOrderName: any[] = []
    startDate: any
    endDate: any
    dateFilters: any
    
    constructor(
      public _sharedComponentService: SharedComponentService,
      private _transitionBetweenOrdersRequisitionWcService: TransitionBetweenOrdersRequisitionWcService,
      private router: Router,
      private primengConfig: PrimeNGConfig,
      private filterService: FilterService,
    
    ) {
      this._sharedComponentService.angularMaterialTableConfig()
    }
    
    ngOnInit(): void {
      this.getData()
    
      this.customFilterForFromDyedFabricOrderName();
      this.customFilterForToDyedFabricOrderName();
    }
    
    getData() {
    this.loading = true;
      this._transitionBetweenOrdersRequisitionWcService.selectAll().subscribe((response: any) => {
        this.fabrics = response
    
        // PrimeNG Table
           this.primengConfig.ripple = true;
           this.loading = false;
      })
    }
    
    ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
    
    customFilterForFromDyedFabricOrderName() {
      const customFilterName = "from-dyed-fabric-order-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedFromDyedFabricOrderName
    
        if (this.selectedFromDyedFabricOrderName[0] != null) {
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
              if (value == filter[j].from_we_dyed_fabric_order_requisition_name) {
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
    customFilterForToDyedFabricOrderName() {
      const customFilterName = "to-dyed-fabric-order-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedToDyedFabricOrderName
    
        if (this.selectedToDyedFabricOrderName[0] != null) {
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
              if (value == filter[j].to_we_dyed_fabric_order_requisition_name) {
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
      this.selectedFromDyedFabricOrderName = []
      this.selectedToDyedFabricOrderName = []
      this.dateFilters = []
    }
    
    onMultiselectedFromDyedFabricOrderName(event) {
      this.selectedFromDyedFabricOrderName = event
      this.dt1?._filter()
    }
    
    onMultiselectedToDyedFabricOrderName(event) {
      this.selectedToDyedFabricOrderName = event
      this.dt1?._filter()
    }
    ///////////////////// ----------- End Search Tabel ----------- /////////////////////
    
    }
    