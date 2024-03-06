import { Component, Input, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";

@Component({
  selector: 'app-item-history-by-yarns-report-wa',
  templateUrl: './item-history-by-yarns-report-wa.component.html',
  styleUrls: ['./item-history-by-yarns-report-wa.component.css']
})
export class ItemHistoryByYarnsReportWaComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  @Input() selectedData: any

  /////////////////// Variables ///////////////////
  reportByYranWaDetails: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedWarehousesWa: any[] = []
  selectedYarnLotCodeWa: any[] = []
  selectedTypeOfRequisitionWa: any[] = []
  selectedSideOfWa: any[] = []
  selectedDocumentWa: any[] = []
  selectedConsigmentYarnWa: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWaService: ReportWaService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.customFilterForWarehouseWa();  
    this.customFilterForYarnLotCodeWa();  
    this.customFilterForTypeOfRequisitionWa();  
    this.customFilterForSideOfWa();  
    this.customFilterForDocumentWa();  
    this.customFilterForConsigmentYarnWa();  
  }

  ngOnChanges() {
    this.loading = true;

    this._reportWaService.selectInventoryTotalByDate(this.selectedData).subscribe((response: any) => {
      this.reportByYranWaDetails = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  customFilterForWarehouseWa() {
    const customFilterName = "warehouse-wa-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehousesWa

      if (this.selectedWarehousesWa[0] != null) {
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

  customFilterForYarnLotCodeWa() {
    const customFilterName = "yarn-lot-code-wa-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedYarnLotCodeWa

      if (this.selectedYarnLotCodeWa[0] != null) {
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

  customFilterForConsigmentYarnWa() {
    const customFilterName = "consigment-yarn-number-wa-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedConsigmentYarnWa

      if (this.selectedConsigmentYarnWa[0] != null) {
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

  customFilterForTypeOfRequisitionWa() {
    const customFilterName = "type-of-requisition-wa-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedTypeOfRequisitionWa

      if (this.selectedTypeOfRequisitionWa[0] != null) {
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

  customFilterForSideOfWa() {
    const customFilterName = "side-of-wa-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedSideOfWa

      if (this.selectedSideOfWa[0] != null) {
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

  customFilterForDocumentWa() {
    const customFilterName = "document-wa-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDocumentWa

      if (this.selectedDocumentWa[0] != null) {
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
    this.selectedWarehousesWa = []
    this.selectedYarnLotCodeWa = []
    this.selectedTypeOfRequisitionWa = []
    this.selectedSideOfWa = []
    this.selectedDocumentWa = []
    this.selectedConsigmentYarnWa = []
  }

  onMultiselectedWarehousesWa(event) {
    this.selectedWarehousesWa = event
    this.dt1?._filter()
  }

  onMultiselectedYarnLotCodesWa(event) {
    this.selectedYarnLotCodeWa = event
    this.dt1?._filter()
  }

  onMultiselectedTypeOfRequisitionWa(event) {
    this.selectedTypeOfRequisitionWa = event
    this.dt1?._filter()
  }

  onMultiselectedSideOfWa(event) {
    this.selectedSideOfWa = event
    this.dt1?._filter()
  }

  onMultiselectedDocumentWa(event) {
    this.selectedDocumentWa = event
    this.dt1?._filter()
  }

  onMultiselectedConsigmentYarnWa(event) {
    this.selectedConsigmentYarnWa = event
    this.dt1?._filter()
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
