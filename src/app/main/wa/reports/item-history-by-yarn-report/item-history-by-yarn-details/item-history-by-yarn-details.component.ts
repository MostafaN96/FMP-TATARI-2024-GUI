import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-history-by-yarn-details',
  templateUrl: './item-history-by-yarn-details.component.html',
  styleUrls: ['./item-history-by-yarn-details.component.css']
})
export class ItemHistoryByYarnDetailsComponent implements OnInit {

  /////////////////// Variables ///////////////////
  reportByYranWaDetails: any[] = []
  balance: number = 0
  warehouseName: string = ""
  yarnCode: string = ""
  yarnName: string = ""
  yarnLotCode: string = ""

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedTypeOfRequisition: any[] = []
  selectedToConsigmentYarn: any[] = []
  selectedSideOf: any[] = []
  orderPurchaseName: any[] = []
  selectedDocument: any[] = []

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reportWaService: ReportWaService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
    this.customFilterForTypeOfRequisition();
    this.customFilterForToConsigmentYarn();  
    this.customFilterForSideOf();
    this.customFilterForOrderPurchaseName();  
    this.customFilterForDocument();
  }



  getData() {
    this.loading = true;
    this.route.queryParams
      .subscribe(params => {
        this.warehouseName = params['warehouseName']
        this.yarnCode = params['code']
        this.yarnName = params['name']
        this.yarnLotCode = params['yarnLotCode']
        this._reportWaService.selectInverntoryDetailsByWarehouseByYarnByLot(
          params['warehouseId'], 
          params['id'], 
          params['yarnLotId'],
          params['consigmentYarnId'],
          params['yarnOrderId']
        ).subscribe((response: any) => {
          this.reportByYranWaDetails = response
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

  customFilterForToConsigmentYarn() {
    const customFilterName = "to-consigment-yarn-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedToConsigmentYarn

      if (this.selectedToConsigmentYarn[0] != null) {
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
              if (value == filter[j].to_consigment_yarn_number ) {
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

  customFilterForOrderPurchaseName() {
    const customFilterName = "order-purchase-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.orderPurchaseName

      if (this.orderPurchaseName[0] != null) {
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
              if (value == filter[j].order_purchase_name ) {
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

  customFilterForDocument() {
    const customFilterName = "document-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDocument

      if (this.selectedDocument[0] != null) {
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
            if (value == filter[j].document) {
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
    this.selectedTypeOfRequisition = []
    this.selectedToConsigmentYarn = []
    this.selectedSideOf = []
    this.orderPurchaseName = []
    this.selectedDocument = []
  }

  onMultiselectedTypeOfRequisition(event) {
    this.selectedTypeOfRequisition = event
    this.dt1?._filter()
  }

  onMultiselectedToConsigmentYarn(event) {
    this.selectedToConsigmentYarn = event
    this.dt1?._filter()
  }

  onMultiselectedSideOf(event) {
    this.selectedSideOf = event
    this.dt1?._filter()
  }

  onMultiselectedOrderPurchaseName(event) {
    this.orderPurchaseName = event
    this.dt1?._filter()
  }

  onMultiselectedDocument(event) {
    this.selectedDocument = event
    this.dt1?._filter()
  }

  /** Gets the total quantity of all transactions. */
  getInputQuantity(index, typeQuantity) {
    let balance = parseFloat(this.reportByYranWaDetails[0][typeQuantity])
    for (let i = 0; i < index; i++) {
      let quantity = parseFloat(this.reportByYranWaDetails[i + 1][typeQuantity]);
      if(this.reportByYranWaDetails[i + 1].input_output == '1') {
        balance = balance + quantity
      }
      else {
        balance = balance - quantity
      }
    }
    return balance
  }

  getAvgInputesPrice() {
    return this._sharedComponentService.getInputAmount(this.reportByYranWaDetails) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(this.reportByYranWaDetails))
  }

  goToRequisitionPage(typeOfRequisition, isOrder = "0") {
    if (typeOfRequisition == 'اذن اضافة' && isOrder == "0") {
      return `/dashboard/show-all-add-requisition/details`
    }
    else if (typeOfRequisition == 'اذن اضافة' && isOrder == "1") {
      return `/dashboard/show-all-add-requisition/order-details`
    }
    else if (typeOfRequisition == 'اذن نقل من (A) الى (B)') {
      return `/dashboard/show-all-transport-wa-wb-requisition/details`
    }
    else if (typeOfRequisition == 'اذن بيع') {
      return `/dashboard/show-all-sell-requisition/details`
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `/dashboard/show-all-reconciliation-requisition/details`
    }
    else if (typeOfRequisition == 'اذن مرتجع') {
      return `/dashboard/show-all-return-requisition/details`
    }
    else if (typeOfRequisition == 'اذن نقل من (B) الى (A)') {
      return `/dashboard/show-all-transport-wb-wa-requisition/details`
    }
    else if (typeOfRequisition == 'اذن تنفيذ طلبية') {
      return `/dashboard/show-all-execute-order-requisition-wa/details`
    }
    else if (typeOfRequisition == 'اذن نقل بين المخازن') {
      return `/dashboard/show-all-transition-between-wh-requisition-wa/details`
    }
    return
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
