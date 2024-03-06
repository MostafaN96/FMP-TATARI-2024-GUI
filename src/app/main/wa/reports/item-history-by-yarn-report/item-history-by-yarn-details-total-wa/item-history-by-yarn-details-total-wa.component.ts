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

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-history-by-yarn-details-total-wa',
  templateUrl: './item-history-by-yarn-details-total-wa.component.html',
  styleUrls: ['./item-history-by-yarn-details-total-wa.component.css']
})
export class ItemHistoryByYarnDetailsTotalWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  reportByYranWaDetails: any[] = []
  balance:number = 0
  warehouseName:string = ""
  yarnCode:string = ""
  yarnName:string = ""
  yarnLotCode:string = ""

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedWarehouses: any[] = []
  selectedYarnLotCode: any[] = []
  selectedTypeOfRequisition: any[] = []
  selectedSideOf: any[] = []
  selectedDocument: any[] = []
  selectedConsigmentYarn: any[] = []

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reportWaService: ReportWaService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void { 
    this.getData()
    this.customFilterForWarehouse();  
    this.customFilterForYarnLotCode();  
    this.customFilterForTypeOfRequisition();  
    this.customFilterForSideOf();  
    this.customFilterForDocument();  
    this.customFilterForConsigmentYarn();  
  }

 

  getData() {
    
    this.loading = true;
    this.route.queryParams
      .subscribe(params => {
        this.warehouseName = params['warehouseName']
        this.yarnCode = params['code']
        this.yarnName = params['name']
        this.yarnLotCode = params['yarnLotCode']
        this._reportWaService.selectInventoryTotalByYarnByWarehouse(params['id'], params['warehouseId']).subscribe((response: any) => {
          this.reportByYranWaDetails = response
          
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

  customFilterForYarnLotCode() {
    const customFilterName = "yarn-lot-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedYarnLotCode

      if (this.selectedYarnLotCode[0] != null) {
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
              if (value == filter[j].yarn_lot_code ) {
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

  customFilterForConsigmentYarn() {
    const customFilterName = "consigment-yarn-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedConsigmentYarn

      if (this.selectedConsigmentYarn[0] != null) {
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
              if (value == filter[j].consigment_yarn_number ) {
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

  customFilterForSideOf() {
    const customFilterName = "side-of-filter";
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
              if (value == filter[j].side_of ) {
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
              if (value == filter[j].document ) {
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
    this.selectedYarnLotCode = []
    this.selectedTypeOfRequisition = []
    this.selectedSideOf = []
    this.selectedDocument = []
    this.selectedConsigmentYarn = []
  }

  onMultiselectedWarehouses(event) {
    this.selectedWarehouses = event
    this.dt1?._filter()
  }

  onMultiselectedYarnLotCodes(event) {
    this.selectedYarnLotCode = event
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

  onMultiselectedDocument(event) {
    this.selectedDocument = event
    this.dt1?._filter()
  }

  onMultiselectedConsigmentYarn(event) {
    this.selectedConsigmentYarn = event
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

  getAvgInputesPrice(){
    return this._sharedComponentService.getInputAmount(this.reportByYranWaDetails) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(this.reportByYranWaDetails))
  }

  goToRequisitionPage(typeOfRequisition) {
    if(typeOfRequisition == 'اذن اضافة') {
      return `/dashboard/show-all-add-requisition/details`
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
    return
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
