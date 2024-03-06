import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";

@Component({
  selector: 'app-all-item-history-report-wd',
  templateUrl: './all-item-history-report-wd.component.html',
  styleUrls: ['./all-item-history-report-wd.component.css']
})
export class AllItemHistoryReportWdComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  @Input() selectedData: any
  
  /////////////////// Variables ///////////////////
  reportByFabricWdDetails: any[] = []
  balance:number = 0

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  form_balance = 0
  selectedTypeOfRequisition: any[] = []
  selectedConsigmentNumber: any[] = []
  selectedWorkOrderNumber: any[] = []
  selectedColorName: any[] = []
  selectedColorCode: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.customFilterForTypeOfRequisition();
    this.customFilterForConsigmentNumber();
    this.customFilterForWorkOrderNumber();
    this.customFilterForColorName();
    this.customFilterForColorCode();
  }

  ngOnChanges() {
    this.loading = true;

    this._reportWdService.selectInventoryTotalByDate(this.selectedData).subscribe((response: any) => {
      this.reportByFabricWdDetails = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }


  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForTypeOfRequisition() {
    const customFilterName = "type-of-requisition-wd-filter";
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

  customFilterForConsigmentNumber() {
    const customFilterName = "consigment-number-wd-filter";
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
              if (value == filter[j].consigment_number ) {
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
    const customFilterName = "work-order-number-wd-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWorkOrderNumber
      
      if (this.selectedWorkOrderNumber[0] != null) {
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
  
  customFilterForColorName() {
    const customFilterName = "color-name-wd-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorName
      
      if (this.selectedColorName[0] != null) {
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
    const customFilterName = "color-code-wd-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCode

      if (this.selectedColorCode[0] != null) {
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

  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedTypeOfRequisition = []
    this.selectedConsigmentNumber = []
    this.selectedWorkOrderNumber = []
    this.selectedColorName = []
    this.selectedColorCode = []
  }

  onMultiselectedTypeOfRequisition(event) {
    this.selectedTypeOfRequisition = event
    this.dt1?._filter()
  }

  onMultiselectedConsigmentNumber(event) {
    this.selectedConsigmentNumber = event
    this.dt1?._filter()
  }

  onMultiselectedWorkOrderNumber(event) {
    this.selectedWorkOrderNumber = event
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



  getWast(quantity: number, dyeingQuantity: number) {
    let result = quantity - dyeingQuantity
    return ((result / quantity) * 100) >= 0 ? ((result / quantity) * 100) : 0
  }

  getAvgWast() {
    let sum = 0;
    let counter = 0
    let data: any[] = this.dt1?.filteredValue == null ? this.reportByFabricWdDetails : this.dt1?.filteredValue
    data.forEach(fabric => {
      if (fabric.type_of_requisition == "اذن صباغة") {
        counter++
        let result = parseFloat(fabric.quantity) - parseFloat(fabric.dyeing_quantity)
        let eq = ((result / parseFloat(fabric.quantity)) * 100) >= 0 ? ((result / parseFloat(fabric.quantity)) * 100) : 0
        sum = sum + eq
      }
    });
    return sum / counter
  }


  goToRequisitionPage(typeOfRequisition = '', element?) {
    if (typeOfRequisition == 'اذن نقل من (C) الى (D)') {
      return `/dashboard/show-all-transport-wc-wd-requisition/details`
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `/dashboard/show-all-reconciliation-requisition-wd/details`
    }
    else if (typeOfRequisition == 'اذن تشكيل' && element?.is_order != '1') {
      return `/dashboard/show-all-form-dyeing-requisition-wd/details`
    }
    else if (typeOfRequisition == 'اذن تشكيل' && element?.is_order == '1') {
      return `/dashboard/show-all-form-dyeing-order-requisition-wd/order-details`
    }
    else if (typeOfRequisition == 'اذن صباغة') {
      return `/dashboard/show-all-dyeing-requisition-wd/details`
    }
    else if (typeOfRequisition == 'اذن نقل من (D) الى (C)') {
      return `/dashboard/show-all-transport-wd-wc-requisition/details`
    }
    else if (typeOfRequisition == 'اذن نقل الى مصبغة') {
      return `/dashboard/show-all-transport-between-dyers-requisition/details`
    }
    else if (typeOfRequisition == 'اذن نقل من مصبغة') {
      return `/dashboard/show-all-transport-between-dyers-requisition/details`
    }
    return ``
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
