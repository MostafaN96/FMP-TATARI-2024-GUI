import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

@Component({
  selector: 'app-current-stock-form-dyeing-wd',
  templateUrl: './current-stock-form-dyeing-wd.component.html',
  styleUrls: ['./current-stock-form-dyeing-wd.component.css']
})
export class CurrentStockFormDyeingWdComponent implements OnInit {

  showDyeingServciesUpdate = false
  selectedDataToUpdate: any
  isShowCheckBox = false

  @Output() parentFun = new EventEmitter<any>();

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedFabrics: any[] = []
  selectedFabricCodes: any[] = []
  selectedColorCodes: any[] = []
  selectedColorCategories: any[] = []
  selectedColors: any[] = []
  selectedDyedFabrics: any[] = []
  selectedDyedFabricCodes: any[] = []
  selectedSellerOrdersNumbers: any[] = []
  selectedConsigmentNumber: any[] = []
  selection = new SelectionModel(true);
  selectArrayValues: any[] = [];

  ///////////////////////////////// General ////////////////////////////////////////////////
  formDyeingFabricsByDyer: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.customFilterForFabric();
    this.customFilterForFabricCode();
    this.customFilterForColorCode();
    this.customFilterForColorCategory();
    this.customFilterForColor();
    this.customFilterForDyedFabric();
    this.customFilterForDyedFabricCode();
    this.customFilterForSellerOrderNumber();
    this.customFilterForConsigmentNumber();
  }

  listen() {
    this.getData()
  }

  getData() {
    // PrimeNG Table
    this.primengConfig.ripple = true;
    this.loading = false;
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForFabric() {
    const customFilterName = "fabric-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabrics

      if (this.selectedFabrics[0] != null) {
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

  customFilterForFabricCode() {
    const customFilterName = "fabric-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricCodes

      if (this.selectedFabricCodes[0] != null) {
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

  customFilterForColorCode() {
    const customFilterName = "color-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCodes

      if (this.selectedColorCodes[0] != null) {
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

  customFilterForColorCategory() {
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
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].color_category_name) {
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

  customFilterForColor() {
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
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].color_name) {
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

  customFilterForDyedFabric() {
    const customFilterName = "dyed-fabric-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyedFabrics

      if (this.selectedDyedFabrics[0] != null) {
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
            if (value == filter[j].dyed_fabric_name) {
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

  customFilterForDyedFabricCode() {
    const customFilterName = "dyed-fabric-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyedFabricCodes

      if (this.selectedDyedFabricCodes[0] != null) {
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
            if (value == filter[j].dyed_fabric_code) {
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

  customFilterForSellerOrderNumber() {
    const customFilterName = "order-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedSellerOrdersNumbers

      if (this.selectedSellerOrdersNumbers[0] != null) {
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
            if (value == filter[j].order_number) {
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
    const customFilterName = "consigment-number-filter";
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
            if (value == filter[j].consigment_dyeing_number) {
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
    this.selectedFabrics = []
    this.selectedFabricCodes = []
    this.selectedColorCodes = []
    this.selectedColorCategories = []
    this.selectedColors = []
    this.selectedDyedFabrics = []
    this.selectedDyedFabricCodes = []
    this.selectedSellerOrdersNumbers = []
    this.selectedConsigmentNumber = []
  }

  onMultiselectedFabric(event) {
    this.selectedFabrics = event
    this.dt1?._filter()
  }

  onMultiselectedFabricCode(event) {
    this.selectedFabricCodes = event
    this.dt1?._filter()
  }

  onMultiselectedColorCode(event) {
    this.selectedColorCodes = event
    this.dt1?._filter()
  }

  onMultiselectedColorCategory(event) {
    this.selectedColorCategories = event
    this.dt1?._filter()
  }

  onMultiselectedColor(event) {
    this.selectedColors = event
    this.dt1?._filter()
  }

  onMultiselectedDyedFabric(event) {
    this.selectedDyedFabrics = event
    this.dt1?._filter()
  }

  onMultiselectedDyedFabricCode(event) {
    this.selectedDyedFabricCodes = event
    this.dt1?._filter()
  }

  onMultiselectedSellerOrderNumber(event) {
    this.selectedSellerOrdersNumbers = event
    this.dt1?._filter()
  }

  onMultiselectedConsigmentNumber(event) {
    this.selectedConsigmentNumber = event
    this.dt1?._filter()
  }

  getSelectedData(selectedData: any) {
    this.showDyeingServciesUpdate = true
    selectedData.wd_form_dyeing_requisition_details_id = selectedData.id
    this.selectedDataToUpdate = selectedData
  }

  goToRequisitionPage(typeOfRequisition, wdFormDyeingOrderRequisitionId) {
    if(wdFormDyeingOrderRequisitionId != null) {
      return `/dashboard/show-all-form-dyeing-order-requisition-wd/order-details`
    } else {
      return `/dashboard/show-all-form-dyeing-requisition-wd/details`
    }

    // if (typeOfRequisition == 'اذن تشكيل') {
      // return `/dashboard/show-all-form-dyeing-requisition-wd/details`
    // }
    // else if (typeOfRequisition == 'اذن صباغة') {
    //   return `/dashboard/show-all-dyeing-requisition-wd/details`
    // }
    return
  }
}
