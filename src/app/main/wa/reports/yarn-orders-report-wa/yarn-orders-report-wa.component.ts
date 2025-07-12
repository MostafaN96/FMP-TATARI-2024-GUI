import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";

import * as moment from 'moment';

@Component({
  selector: 'app-yarn-orders-report-wa',
  templateUrl: './yarn-orders-report-wa.component.html',
  styleUrls: ['./yarn-orders-report-wa.component.css']
})
export class YarnOrdersReportWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
    results: any[] = []
  
    //////////////////////////////////// PrimeNG /////////////////////////////////
    @ViewChild('dt1') dt1: Table | undefined;
    loading: boolean = true;
    selectedSellerNames: any[] = []
    selectedYarnNames: any[] = []
    selectedYarnOrderNames: any[] = []
    selectedYarnCodes: any[] = []
    selectedTypeOfRequisition: any[] = []
    dateFilters: any
    
    constructor(
      public _sharedComponentService: SharedComponentService,
      private _reportWaService: ReportWaService,
      public _exportDataService: ExportDataService,
      private primengConfig: PrimeNGConfig,
      private filterService: FilterService,
      
    ) {
      this._sharedComponentService.angularMaterialTableConfig()
    }
  
    ngOnInit(): void {
      this.getData();
  
      this.customFilterForSellerName();
      this.customFilterForYarnName();
      this.customFilterForYarnOrderName();
      this.customFilterForYarnCode();
      this.customFilterForTypeOfRequisition();
    }
  
    getData() {
      this.loading = true;
      this._reportWaService.yarnOrdersReport().subscribe((response: any) => {
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
  
    customFilterForYarnName() {
      const customFilterName = "yarn-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedYarnNames
  
        if (this.selectedYarnNames[0] != null) {
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
                if (value == filter[j].yarn_name ) {
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
  
    customFilterForYarnOrderName() {
      const customFilterName = "yarn-order-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedYarnOrderNames
  
        if (this.selectedYarnOrderNames[0] != null) {
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
                if (value == filter[j].wa_yarn_order_requisition_name ) {
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
  
    customFilterForYarnCode() {
      const customFilterName = "yarn-code-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedYarnCodes
  
        if (this.selectedYarnCodes[0] != null) {
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
                if (value == filter[j].yarn_code ) {
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
                // if (value == filter[j].yarn_code ) {
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
      this.selectedYarnNames = []
      this.selectedYarnOrderNames = []
      this.selectedYarnCodes = []
      this.selectedTypeOfRequisition = []
    }
  
    onMultiselectedSellerNames(event) {
      this.selectedSellerNames = event
      this.dt1?._filter()
    }
  
    onMultiselectedYarnNames(event) {
      this.selectedYarnNames = event
      this.dt1?._filter()
    }
  
    onMultiselectedYarnOrderNames(event) {
      this.selectedYarnOrderNames = event
      this.dt1?._filter()
    }
  
    onMultiselectedYarnCodes(event) {
      this.selectedYarnCodes = event
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
  