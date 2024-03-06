import { Component, Inject, OnInit, ViewChild } from '@angular/core';

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
  selector: 'app-item-hostory-by-dyed-fabric',
  templateUrl: './item-hostory-by-dyed-fabric.component.html',
  styleUrls: ['./item-hostory-by-dyed-fabric.component.css']
})
export class ItemHostoryByDyedFabricComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  isShowTotalInput = true
  iShowTotalOutput = true
  iShowTotalBalance = true
  isShowTotalAmountInput = false
  iShowTotalAmountOutput = false
  iShowItemValue = false
  isShowAvgPrice = false
  isShowAvgInputes = false
  isShowLatestPrice = true
  isShowClosedBalances  = false

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedWarehouseNames: any[] = []
  selectedFabricNames: any[] = []
  selectedCodes: any[] = []
  selectedDyeingCodes: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWeService: ReportWeService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForWarehouseName();
    this.customFilterForFabricName();
    this.customFilterForCode();
    this.customFilterForDyeingCode();
  }

  getData() {
    this.loading = true;
    this._reportWeService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.fabrics = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getClosedBalances() {
    this.loading = true;
    this._reportWeService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.fabrics = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForWarehouseName() {
    const customFilterName = "warehouse-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehouseNames
      
      if (this.selectedWarehouseNames[0] != null) {
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

  customFilterForFabricName() {
    const customFilterName = "fabric-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricNames
      
      if (this.selectedFabricNames[0] != null) {
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
              if (value == filter[j].dyed_fabric_name ) {
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

  customFilterForCode() {
    const customFilterName = "code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCodes

      if (this.selectedCodes[0] != null) {
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
              if (value == filter[j].dyed_fabric_code ) {
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

  customFilterForDyeingCode() {
    const customFilterName = "dyeing-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingCodes

      if (this.selectedDyeingCodes[0] != null) {
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
              if (value == filter[j].dyeing_code ) {
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
    this.selectedWarehouseNames = []
    this.selectedFabricNames = []
    this.selectedCodes = []
    this.selectedDyeingCodes = []
  }

  onMultiselectedWarehouseNames(event) {
    this.selectedWarehouseNames = event
    this.dt1?._filter()
  }

  onMultiselectedFabricNames(event) {
    this.selectedFabricNames = event
    this.dt1?._filter()
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedDyeingCodes(event) {
    this.selectedDyeingCodes = event
    this.dt1?._filter()
  }

 //
  getTotalTotalAmountQuantityInput() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this._sharedComponentService.getTotalAmountQuantityInput(fabric.details)
    });
    return sum
  }

  //
  getTotalTotalAmountQuantityOutput() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this._sharedComponentService.getTotalOutputQuantity(fabric.details)
    });
    return sum
  }

  //
  getTotalCurrentQuantity() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + fabric.current_quantity
    });
    return sum
  }

  //
  getTotalItemAmount() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this._sharedComponentService.getItemAmount(fabric.details)
    });
    return sum
  }

  //
  getTotalAvgPrice() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this._sharedComponentService.getAvgPrice(fabric.details)
    });
    return sum
  }

  //
  getAvgInputesPrice(fabrics){
    return this._sharedComponentService.getInputAmount(fabrics.details) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(fabrics.details))
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
