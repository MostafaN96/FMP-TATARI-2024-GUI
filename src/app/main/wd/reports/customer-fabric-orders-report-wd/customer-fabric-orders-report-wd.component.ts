import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

@Component({
  selector: 'app-customer-fabric-orders-report-wd',
  templateUrl: './customer-fabric-orders-report-wd.component.html',
  styleUrls: ['./customer-fabric-orders-report-wd.component.css']
})
export class CustomerFabricOrdersReportWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  customerFabricOrder: any[] = []
  
  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedDyers: any[] = []
  selectedCodes: any[] = []
  selectedDyeingCodes: any[] = []
  selectedCustomers: any[] = []
  selectedWorkOrderNumbers: any[] = []
  selectedColorCategories: any[] = []
  selectedColors: any[] = []
  startDate:any
  endDate:any

  constructor(
    public _sharedComponentService: SharedComponentService,
    // private _yarnService: YarnService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    private _bussinessmanService: BussinessmanService
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
    this.getData();
  }

  ngOnInit(): void {
    this.customFilterForCode();
    this.customFilterForDyeingCode();
    this.customFilterForCustomers();
    this.customFilterForWorkOrderNumbers();
    this.customFilterForColorCategories();
    this.customFilterForColors();
  }

  getData() {
    this.loading = true;

    this._reportWdService.dyeingOrdersDetailsReport().subscribe((response: any) => {
      this.customerFabricOrder = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  customFilterForCode() {
    const customFilterName = "code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCodes
      
      if (this.selectedCodes[0] != null) {
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
  
  customFilterForDyeingCode() {
    const customFilterName = "dyeing-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingCodes
      
      if (this.selectedDyeingCodes[0] != null) {
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
              if (value == filter[j].dyeing_code ) {
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
  
  customFilterForCustomers() {
    const customFilterName = "customer-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCustomers
      
      if (this.selectedCustomers[0] != null) {
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
              if (value == filter[j].seller_name ) {
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

  customFilterForWorkOrderNumbers() {
    const customFilterName = "work-order-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWorkOrderNumbers
      
      if (this.selectedWorkOrderNumbers[0] != null) {
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
              if (value == filter[j].work_order_number ) {
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

  customFilterForColorCategories() {
    const customFilterName = "color-category-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCategories
      
      if (this.selectedColorCategories[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          let count = 0
          for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < filter.length; j++) {
              if (value == filter[j].color_category_name) {
                count++
                if(count == filter.length) {
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

  customFilterForColors() {
    const customFilterName = "color-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColors
      
      if (this.selectedColors[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          let count = 0
          for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < filter.length; j++) {
              if (value == filter[j].color_name) {
                count++
                if(count == filter.length) {
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

  clear(table: Table) {
    table.clear();
    table.reset();
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedDyeingCodes(event) {
    this.selectedDyeingCodes = event
    this.dt1?._filter()
  }

  onMultiselectedCustomers(event) {
    this.selectedCustomers = event
    this.dt1?._filter()
  }

  onMultiselectedWorkOrderNumbers(event) {
    this.selectedWorkOrderNumbers = event
    this.dt1?._filter()
  }

  onMultiselectedColorCategories(event) {
    this.selectedColorCategories = event
    this.dt1?._filter()
  }

  onMultiselectedColors(event) {
    this.selectedColors = event
    this.dt1?._filter()
  }
}
