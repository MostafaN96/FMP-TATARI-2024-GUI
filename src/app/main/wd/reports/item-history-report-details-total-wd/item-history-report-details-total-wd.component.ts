import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-history-report-details-total-wd',
  templateUrl: './item-history-report-details-total-wd.component.html',
  styleUrls: ['./item-history-report-details-total-wd.component.css']
})
export class ItemHistoryReportDetailsTotalWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  reportByFabricWdDetails: any[] = []
  balance: number = 0
  fabricCode: string | undefined
  fabricName: string | undefined
  dyerName: string | undefined

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  form_balance = 0
  selectedTypeOfRequisition: any[] = []
  selectedConsigmentNumber: any[] = []
  selectedWorkOrderNumber: any[] = []
  selectedGradeItemName: any[] = []
  selectedColorName: any[] = []
  selectedColorCode: any[] = []
  selectedPrepareDyeingName: any[] = []
  dateFilters: any

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.getData()

    this.customFilterForTypeOfRequisition();
    this.customFilterForConsigmentNumber();
    this.customFilterForWorkOrderNumber();
    this.customFilterForGradeItemName();
    this.customFilterForColorName();
    this.customFilterForColorCode();
    this.customFilterForPrepareDyeingName();
  }

  getData() {
    this.loading = true;
    this.route.queryParams
      .subscribe(params => {
        
        this.fabricCode = params['code']
        this.fabricName = params['name']
        this.dyerName = params['dyeingName']
        this._reportWdService.selectByDyeingByFabricTotal({ fabricId: params['id'], dyeingId: params['dyeingId'] }).subscribe((response: any) => {
          this.reportByFabricWdDetails = response

          // PrimeNG Table
          this.primengConfig.ripple = true;
          this.loading = false;
        })
      });

  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
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

  customFilterForConsigmentNumber() {
    const customFilterName = "consigment-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedConsigmentNumber
      
      if (this.selectedConsigmentNumber[0] != null) {
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
    const customFilterName = "work-order-number-filter";
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

  customFilterForGradeItemName() {
    const customFilterName = "grade-item-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedGradeItemName
      
      if (this.selectedGradeItemName[0] != null) {
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
              if (value == filter[j].grade_item_name ) {
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
    const customFilterName = "color-name-filter";
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
    const customFilterName = "color-code-filter";
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

  customFilterForPrepareDyeingName() {
    const customFilterName = "prepare-dyeing-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedPrepareDyeingName

      if (this.selectedPrepareDyeingName[0] != null) {
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
            if (value == filter[j].is_prepare_dyeing_name) {
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
  
        }
        return false;
      }
      else {
        return true;
      }
    })
    this.dt1?.filter(event, "date", "date-filter")
  }

  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedTypeOfRequisition = []
    this.selectedConsigmentNumber = []
    this.selectedWorkOrderNumber = []
    this.selectedGradeItemName = []
    this.selectedColorName = []
    this.selectedColorCode = []
    this.selectedPrepareDyeingName = []
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

  onMultiselectedGradeItemName(event) {
    this.selectedGradeItemName = event
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

  onMultiselectedPrepareDyeingName(event) {
    this.selectedPrepareDyeingName = event
    this.dt1?._filter()
  }

  /** Gets the total quantity of all transactions. */
  getInputQuantity(index) {
    let balance = parseFloat(this.reportByFabricWdDetails[0]?.quantity)
    for (let i = 0; i < index; i++) {
      let quantity = parseFloat(this.reportByFabricWdDetails[i + 1].quantity);
      if (this.reportByFabricWdDetails[i + 1].input_output == '1') {
        balance = balance + quantity
      }
      // else if (this.reportByFabricWdDetails[i + 1].input_output == '2') {
      //   balance = balance + quantity
      // }
      else {
        balance = balance - quantity
      }
    }
    return balance
  }

  getFormInputQuantity(index) {
    let balance = parseFloat(this.reportByFabricWdDetails[0]?.quantity)
    for (let i = 0; i < index; i++) {
      let quantity = parseFloat(this.reportByFabricWdDetails[i + 1].quantity);
      let formQuantity = parseFloat(this.reportByFabricWdDetails[i + 1].form_quantity);
      if (this.reportByFabricWdDetails[i + 1].type_of_requisition == 'اذن نقل' ||
      (this.reportByFabricWdDetails[i + 1].type_of_requisition == 'اذن نقل الى مصبغة' &&
      this.reportByFabricWdDetails[i + 1].input_output == 1) ||
        (this.reportByFabricWdDetails[i + 1].type_of_requisition == 'اذن تسوية' &&
          this.reportByFabricWdDetails[i + 1].input_output == 1)) {
        balance = balance + quantity
      }
      else {
        balance = balance - ((this.reportByFabricWdDetails[i + 1].type_of_requisition == 'اذن تسوية' &&
          this.reportByFabricWdDetails[i + 1].input_output == 0) ||
          this.reportByFabricWdDetails[i + 1].type_of_requisition == 'اذن نقل من مصبغة' ||
          this.reportByFabricWdDetails[i + 1].type_of_requisition == 'اذن نقل (D) الى (C)'
          ? quantity : formQuantity)
      }
    }
    return balance
  }

  getAvgInputesPrice() {
    return this._sharedComponentService.getInputAmount(this.reportByFabricWdDetails) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(this.reportByFabricWdDetails))
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
