import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";

@Component({
  selector: 'app-item-history-by-fabrics-report-wc',
  templateUrl: './item-history-by-fabrics-report-wc.component.html',
  styleUrls: ['./item-history-by-fabrics-report-wc.component.css']
})
export class ItemHistoryByFabricsReportWcComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  @Input() selectedData: any
  
  /////////////////// Variables ///////////////////
  reportByFabricWcDetails: any[] = []
  balance:number = 0

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedWarehouses: any[] = []
  selectedConsigmentNumber: any[] = []
  selectedTypeOfRequisition: any[] = []
  selectedSideOf: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWcService: ReportWcService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.customFilterForWarehouse();  
    this.customFilterForConsigmentNumber();  
    this.customFilterForTypeOfRequisition();  
    this.customFilterForSideOf();
  }

  ngOnChanges() {
    this.loading = true;

    this._reportWcService.selectInventoryTotalByDate(this.selectedData).subscribe((response: any) => {
      this.reportByFabricWcDetails = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

 ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
 customFilterForWarehouse() {
  const customFilterName = "warehouse-wc-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedWarehouses

    if (this.selectedWarehouses[0] != null) {
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
            if (value == filter[j].warehouse_name ) {
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

customFilterForConsigmentNumber() {
  const customFilterName = "consigment-number-wc-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedConsigmentNumber

    if (this.selectedConsigmentNumber[0] != null) {
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
            if (value == filter[j].consigment_manufacturing_number ) {
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
  const customFilterName = "type-of-requisition-wc-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedTypeOfRequisition

    if (this.selectedTypeOfRequisition[0] != null) {
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
  const customFilterName = "side-of-wc-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedSideOf

    if (this.selectedSideOf[0] != null) {
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

// Reset table filters
clear(table: Table) {
  table.clear();
  table.reset();
  this.selectedWarehouses = []
  this.selectedConsigmentNumber = []
  this.selectedTypeOfRequisition = []
  this.selectedSideOf = []
}

onMultiselectedWarehouses(event) {
  this.selectedWarehouses = event
  this.dt1?._filter()
}

onMultiselectedConsigmentNumber(event) {
  this.selectedConsigmentNumber = event
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


goToRequisitionPage(typeOfRequisition, element?) {
  if(typeOfRequisition == 'اذن اضافة') {
    return `/dashboard/show-all-add-requisition-wc/details`
  }
  else if (typeOfRequisition == 'اذن نقل') {
    return `/dashboard/show-all-transport-wa-wb-requisition/details`
  }
  else if (typeOfRequisition == 'اذن بيع') {
    return `/dashboard/show-all-sell-requisition-wc/details`
  }
  else if (typeOfRequisition == 'اذن تسوية') {
    return `/dashboard/show-all-reconciliation-requisition-wc/details`
  }
  else if (typeOfRequisition == 'اذن مرتجع') {
    return `/dashboard/show-all-return-requisition-wc/details`
  }
  else if (typeOfRequisition == 'اذن تصنيع' && element?.is_order != '1') {
    return `/dashboard/show-all-manufacturing-requisition-wb/details`
  }
  else if (typeOfRequisition == 'اذن تصنيع' && element?.is_order == '1') {
    return `/dashboard/show-all-manufacturing-order-requisition-wb/order-details`
  }
  else if (typeOfRequisition == 'اذن نقل من (C) الى (D)') {
    return `/dashboard/show-all-transport-wc-wd-requisition/details`
  }
  else if (typeOfRequisition == 'اذن نقل من (D) الى (C)') {
    return `/dashboard/show-all-transport-wd-wc-requisition/details`
  }
  return
}
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
