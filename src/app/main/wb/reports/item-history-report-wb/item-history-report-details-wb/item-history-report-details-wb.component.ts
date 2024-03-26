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
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-history-report-details-wb',
  templateUrl: './item-history-report-details-wb.component.html',
  styleUrls: ['./item-history-report-details-wb.component.css']
})
export class ItemHistoryReportDetailsWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  reportByYranWbDetails: any[] = []
  balance:number = 0
  yarnCode:string = ""
  yarnName:string = ""
  yarnLotCode:string  = ""
  manufacturerId:string = ""
  manufacturerName:string = ""
  consigmentYarnNumber:string = ""
  
  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedTypeOfRequisition: any[] = []
  selectedFabricCode: any[] = []
  selectedFabricName: any[] = []
  selectedSideOf: any[] = []
  dateFilters: any

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reportWbService: ReportWbService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.getData()

    this.customFilterForTypeOfRequisition();
    this.customFilterForFabricCode();
    this.customFilterForFabricName();
    this.customFilterForSideOf();
  }

  getData() {
    this.loading = true;
    this.route.queryParams
      .subscribe(params => {
        this.yarnCode = params['code']
        this.yarnName = params['name']
        this.manufacturerId = params['manufacturerId']
        this.manufacturerName = params['manufacturerName']
        this.yarnLotCode = params['yarnLotCode']
        this.consigmentYarnNumber = params['consigmentYarnNumber']
        this._reportWbService.selectInverntoryDetailsByIndustryByYarnByLot(
          params['manufacturerId'], 
          params['id'], 
          params['yarnLotId'],
          params['consigmentYarnId']
          ).subscribe((response: any) => {
          this.reportByYranWbDetails = response

          // PrimeNG Table
          this.primengConfig.ripple = true;
          this.loading = false;
        })
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

  customFilterForFabricCode() {
    const customFilterName = "fabric-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricCode

      if (this.selectedFabricCode[0] != null) {
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

  customFilterForFabricName() {
    const customFilterName = "fabric-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricName

      if (this.selectedFabricName[0] != null) {
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

  customFilterForSideOf() {
    const customFilterName = "side-of-filter";
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
          if (filter[0] != null && filter[1] != null) {

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
    this.selectedFabricCode = []
    this.selectedFabricName = []
    this.selectedSideOf = []
  }

  onMultiselectedTypeOfRequisition(event) {
    this.selectedTypeOfRequisition = event
    this.dt1?._filter()
  }

  onMultiselectedFabricCode(event) {
    this.selectedFabricCode = event
    this.dt1?._filter()
  }

  onMultiselectedFabricName(event) {
    this.selectedFabricName = event
    this.dt1?._filter()
  }

  onMultiselectedSideOf(event) {
    this.selectedSideOf = event
    this.dt1?._filter()
  }

  /** Gets the total quantity of all transactions. */
  getInputQuantity(index) {
    let balance = parseFloat(this.reportByYranWbDetails[0]?.quantity)
    for (let i = 0; i < index; i++) {
      let quantity = parseFloat(this.reportByYranWbDetails[i + 1].quantity);
      if(this.reportByYranWbDetails[i + 1].input_output == '1') {
        balance = balance + quantity
      }
      else {
        balance = balance - quantity
      }
    }
    return balance
  }

  getAvgInputesPrice(){
    return this._sharedComponentService.getInputAmount(this.reportByYranWbDetails) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(this.reportByYranWbDetails))
  }


  goToRequisitionPage(typeOfRequisition, element?) {
    if (typeOfRequisition == 'اذن نقل من (A) الى (B)') {
      return `/dashboard/show-all-transport-wa-wb-requisition/details`
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `/dashboard/show-all-reconciliation-requisition-wb/details`
    }
    else if (typeOfRequisition == 'اذن تصنيع' && element?.is_order != '1') {
      return `/dashboard/show-all-manufacturing-requisition-wb/details`
    }
    else if (typeOfRequisition == 'اذن تصنيع' && element?.is_order == '1') {
      return `/dashboard/show-all-manufacturing-order-requisition-wb/order-details`
    }
    else if (typeOfRequisition == 'اذن نقل من (B) الى (A)') {
      return `/dashboard/show-all-transport-wb-wa-requisition/details`
    }
    else if (typeOfRequisition == 'اذن نقل بين المصانع') {
      return `/dashboard/show-all-transport-between-industries-requisition/details`
    }
    return
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
