import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-history-by-fabric-details-total-wc',
  templateUrl: './item-history-by-fabric-details-total-wc.component.html',
  styleUrls: ['./item-history-by-fabric-details-total-wc.component.css']
})
export class ItemHistoryByFabricDetailsTotalWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  reportByFabricWcDetails: any[] = []
  balance:number = 0
  fabricCode:string | undefined
  fabricName:string | undefined

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedWarehouses: any[] = []
  selectedConsigmentNumber: any[] = []
  selectedTypeOfRequisition: any[] = []
  selectedSideOf: any[] = []
  dateFilters: any

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reportWcService: ReportWcService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
    this.customFilterForWarehouse();  
    this.customFilterForConsigmentNumber();  
    this.customFilterForTypeOfRequisition();  
    this.customFilterForSideOf();  
  }

  getData() {
this.loading = true;
    this.route.queryParams
      .subscribe(params => {
        this.fabricCode = params['code']
        this.fabricName = params['name']
        this._reportWcService.selectInventoryTotalByFabric(params['id']).subscribe((response: any) => {
          this.reportByFabricWcDetails = response          

          // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
        })
      });

  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForWarehouse() {
    const customFilterName = "warehouse-filter";
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
  

  /** Gets the total quantity of all transactions. */
  getInputQuantity(index) {
    let balance = parseFloat(this.reportByFabricWcDetails[0]?.quantity)
    for (let i = 0; i < index; i++) {
      let quantity = parseFloat(this.reportByFabricWcDetails[i + 1].quantity);
      if(this.reportByFabricWcDetails[i + 1].input_output == '1') {
        balance = balance + quantity
      }
      else {
        balance = balance - quantity
      }
    }
    return balance
  }

  
  getInputFabricPiece(index) {
    let balanceFabricPiece = parseFloat(this.reportByFabricWcDetails[0]?.fabric_piece)
    for (let i = 0; i < index; i++) {
      let fabricPiece = parseFloat(this.reportByFabricWcDetails[i + 1].fabric_piece);
      if (this.reportByFabricWcDetails[i + 1].input_output == '1') {
        balanceFabricPiece = balanceFabricPiece + fabricPiece
      }
      else {
        balanceFabricPiece = balanceFabricPiece - fabricPiece
      }
    }
    return balanceFabricPiece
  }

  getTotalBalanceFabricPiece() {
    let data = this.dt1?.filteredValue == null ? this.reportByFabricWcDetails: this.dt1?.filteredValue
    return this._sharedComponentService.getTotalQuantityWithCondition(data,
      "fabric_piece", "input_output", "1") - this._sharedComponentService.getTotalQuantityWithCondition(data,
        "fabric_piece", "input_output", "0")
  }

  getAvgInputesPrice(){
    return this._sharedComponentService.getInputAmount(this.reportByFabricWcDetails) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(this.reportByFabricWcDetails))
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
    else if (typeOfRequisition == 'اذن نقل بين المخازن') {
      return `/dashboard/show-all-transition-between-wh-requisition-wc/details`
    }
    return
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
