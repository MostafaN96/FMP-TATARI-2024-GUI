import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWeService } from "src/app/services/main/we/report-we.service";

@Component({
  selector: 'app-item-history-by-dyed-fabrics-report-we',
  templateUrl: './item-history-by-dyed-fabrics-report-we.component.html',
  styleUrls: ['./item-history-by-dyed-fabrics-report-we.component.css']
})
export class ItemHistoryByDyedFabricsReportWeComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  @Input() selectedData: any
  
  /////////////////// Variables ///////////////////
  reportByFabricWeDetails: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedFabricCodesWe: any[] = []
  selectedFabricNamesWe: any[] = []
  selectedWarehouses: any[] = []
  selectedWorkOrderNumber: any[] = []
  selectedTypeOfRequisition: any[] = []
  selectedSideOf: any[] = []
  selectedColorName: any[] = []
  selectedColorCode: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWeService: ReportWeService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.customFilterForFabricCodeWe();
    this.customFilterForFabricNameWe();
    this.customFilterForWarehouse();
    this.customFilterForWorkOrderNumber();
    this.customFilterForTypeOfRequisition();
    this.customFilterForSideOf();
    this.customFilterForColorName();
    this.customFilterForColorCode();
  }

  ngOnChanges() {
    this.loading = true;

    this._reportWeService.selectInventoryTotalByDate(this.selectedData).subscribe((response: any) => {
      this.reportByFabricWeDetails = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForFabricNameWe() {
    const customFilterName = "fabric-name-we-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricNamesWe

      if (this.selectedFabricNamesWe[0] != null) {
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
            if (value == filter[j].fabric_name) {
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

  customFilterForFabricCodeWe() {
    const customFilterName = "fabric-code-we-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricCodesWe

      if (this.selectedFabricCodesWe[0] != null) {
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
            if (value == filter[j].fabric_code) {
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

  customFilterForWarehouse() {
    const customFilterName = "warehouse-we-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehouses

      if (this.selectedWarehouses[0] != null) {
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

  customFilterForWorkOrderNumber() {
    const customFilterName = "work-order-number-we-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWorkOrderNumber
      
      if (this.selectedWorkOrderNumber[0] != null) {
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
  
  customFilterForTypeOfRequisition() {
    const customFilterName = "type-of-requisition-we-filter";
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
            if (value == filter[j].type_of_requisition) {
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

  customFilterForSideOf() {
    const customFilterName = "side-of-we-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedSideOf

      if (this.selectedSideOf[0] != null) {
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
            if (value == filter[j].side_of) {
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

  
  customFilterForColorName() {
    const customFilterName = "color-name-we-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorName
      
      if (this.selectedColorName[0] != null) {
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
              if (value == filter[j].color_name ) {
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

  customFilterForColorCode() {
    const customFilterName = "color-code-we-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCode

      if (this.selectedColorCode[0] != null) {
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
            if (value == filter[j].color_code) {
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

  // Reset table filters
  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedFabricNamesWe = []
    this.selectedFabricCodesWe = []
    this.selectedWarehouses = []
    this.selectedWorkOrderNumber = []
    this.selectedTypeOfRequisition = []
    this.selectedSideOf = []
    this.selectedColorName = []
    this.selectedColorCode = []
  }

  onMultiselectedFabricNamesWe(event) {
    this.selectedFabricNamesWe = event
    this.dt1?._filter()
  }

  onMultiselectedFabricCodesWe(event) {
    this.selectedFabricCodesWe = event
    this.dt1?._filter()
  }

  onMultiselectedWarehouses(event) {
    this.selectedWarehouses = event
    this.dt1?._filter()
  }

  onMultiselectedWorkOrderNumber(event) {
    this.selectedWorkOrderNumber = event
    this.dt1?._filter()
  }

  onMultiselectedTypeOfRequisition(event) {
    this.selectedTypeOfRequisition = event
    this.dt1?._filter()
  }

  onMultiselectedSideOf(event) {
    this.selectedSideOf = event
    this.dt1?._filter()
  }

  onMultiselectedColorName(event) {
    this.selectedColorName = event
    this.dt1?._filter()
  }
  onMultiselectedColorCode(event) {
    this.selectedColorCode = event
    this.dt1?._filter()
  }

  goToRequisitionPage(typeOfRequisition) {
    if (typeOfRequisition == 'اذن اضافة') {
      return `dashboard/show-all-add-requisition-we/details`;
    }
    else if (typeOfRequisition == 'اذن بيع') {
      return `dashboard/show-all-sell-requisition-we/details`;
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `dashboard/show-all-reconciliation-requisition-we/details`;
    }
    else if (typeOfRequisition == 'اذن مرتجع') {
      return `dashboard/show-all-return-requisition-we/details`;
    }
    else if (typeOfRequisition == 'اذن صباغة') {
      return `dashboard/show-all-dyeing-requisition-wd/details`;
    }
    else if (typeOfRequisition == 'اذن مرتجع صرف') {
      return `dashboard/show-all-return-sell-requisition-we/details`;
    }
    return ``
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}