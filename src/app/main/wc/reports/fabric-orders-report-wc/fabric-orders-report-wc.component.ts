import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";

import * as moment from 'moment';

@Component({
  selector: 'app-fabric-orders-report-wc',
  templateUrl: './fabric-orders-report-wc.component.html',
  styleUrls: ['./fabric-orders-report-wc.component.css']
})
export class FabricOrdersReportWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
    results: any[] = []
  
    //////////////////////////////////// PrimeNG /////////////////////////////////
    @ViewChild('dt1') dt1: Table | undefined;
    loading: boolean = true;
    selectedSellerNames: any[] = []
    selectedFabricNames: any[] = []
    selectedFabricOrderNames: any[] = []
    selectedFabricCodes: any[] = []
    selectedTypeOfRequisition: any[] = []
    dateFilters: any
    
    constructor(
      public _sharedComponentService: SharedComponentService,
      private _reportWcService: ReportWcService,
      public _exportDataService: ExportDataService,
      private primengConfig: PrimeNGConfig,
      private filterService: FilterService,
      
    ) {
      this._sharedComponentService.angularMaterialTableConfig()
    }
  
    ngOnInit(): void {
      this.getData();
  
      this.customFilterForSellerName();
      this.customFilterForFabricName();
      this.customFilterForFabricOrderName();
      this.customFilterForFabricCode();
      this.customFilterForTypeOfRequisition();
    }
  
    getData() {
      this.loading = true;
      this._reportWcService.fabricOrdersReport().subscribe((response: any) => {
        this.results = response
  
        // PrimeNG Table
        this.primengConfig.ripple = true;
        this.loading = false;
      })
    }
  
    ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
    customFilterForSellerName() {
      const customFilterName = "sellers-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedSellerNames
  
        if (this.selectedSellerNames[0] != null) {
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
                if (value == filter[j].bussiness_man_name ) {
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
  
    customFilterForFabricName() {
      const customFilterName = "fabric-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedFabricNames
  
        if (this.selectedFabricNames[0] != null) {
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
                if (value == filter[j].fabric_name ) {
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
  
    customFilterForFabricOrderName() {
      const customFilterName = "fabric-order-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedFabricOrderNames
  
        if (this.selectedFabricOrderNames[0] != null) {
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
                if (value == filter[j].wc_fabric_order_requisition_name ) {
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
  
    customFilterForFabricCode() {
      const customFilterName = "fabric-code-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedFabricCodes
  
        if (this.selectedFabricCodes[0] != null) {
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
                if (value == filter[j].dyed_fabric_code ) {
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
  
    customFilterForTypeOfRequisition() {
      const customFilterName = "type-of-requisition-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedTypeOfRequisition
        
        if (this.selectedTypeOfRequisition[0] != null) {
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
                if (value == filter[j].type_of_requisition ) {
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
  
    // Reset table filters
    clear(table: Table) {
      table.clear();
      table.reset();
      this.selectedSellerNames = []
      this.selectedFabricNames = []
      this.selectedFabricOrderNames = []
      this.selectedFabricCodes = []
      this.selectedTypeOfRequisition = []
    }
  
    onMultiselectedSellerNames(event) {
      this.selectedSellerNames = event
      this.dt1?._filter()
    }
  
    onMultiselectedFabricNames(event) {
      this.selectedFabricNames = event
      this.dt1?._filter()
    }
  
    onMultiselectedFabricOrderNames(event) {
      this.selectedFabricOrderNames = event
      this.dt1?._filter()
    }
  
    onMultiselectedFabricCodes(event) {
      this.selectedFabricCodes = event
      this.dt1?._filter()
    }
  
    onMultiselectedTypeOfRequisition(event) {
      this.selectedTypeOfRequisition = event
      this.dt1?._filter()
    }
  
    ///////////////////// ----------- End Search Tabel ----------- /////////////////////
    getQuantity(index) {
      let data = this.dt1?.filteredValue == null ? this.results: this.dt1?.filteredValue
      let balance = parseFloat(data[0]?.quantity)
      for (let i = 0; i < index; i++) {
        let quantity = parseFloat(data[i + 1].quantity);
        if(data[i + 1].input_output == '1') {
          balance = balance + quantity
        }
        else {
          balance = balance - quantity
        }
      }
      return balance
    }
  
  }
  