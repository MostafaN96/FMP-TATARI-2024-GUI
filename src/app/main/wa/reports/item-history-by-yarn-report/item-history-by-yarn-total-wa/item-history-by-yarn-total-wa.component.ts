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

@Component({
  selector: 'app-item-history-by-yarn-total-wa',
  templateUrl: './item-history-by-yarn-total-wa.component.html',
  styleUrls: ['./item-history-by-yarn-total-wa.component.css']
})
export class ItemHistoryByYarnTotalWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []
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
  selectedCodes: any[] = []
  selectedNames: any[] = []
  selectedWarehouseName: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    // private _yarnService: YarnService,
    private _reportWaService: ReportWaService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
    this.getData();
  }

  ngOnInit(): void {
    this.customFilterForCode();  
    this.customFilterForName();  
    this.customFilterForWarehouseName();  
  }

  getData() {
    this.loading = true;
    this._reportWaService.selectInverntoryTotal({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.yarns = response
      
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getClosedBalances() {
    this.loading = true;
    this._reportWaService.selectInverntoryTotal({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.yarns = response
      
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForWarehouseName() {
    const customFilterName = "warehouse-name-filter-total";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehouseName

      if (this.selectedWarehouseName[0] != null) {
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

  customFilterForName() {
    const customFilterName = "name-filter-total";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedNames

      if (this.selectedNames[0] != null) {
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
              if (value == filter[j].name ) {
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
    const customFilterName = "code-filter-total";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCodes

      if (this.selectedCodes[0] != null) {
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
              if (value == filter[j].code ) {
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
    this.selectedCodes = []
    this.selectedNames = []
    this.selectedWarehouseName = []
  }

  onMultiselectedwarehouseTotal(event) {
    this.selectedWarehouseName = event
    this.dt1?._filter()
  }

  onMultiselectedCodesTotal(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedNamesTotal(event) {
    this.selectedNames = event
    this.dt1?._filter()
  }


  getTotalTotalAmountQuantityInput() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.yarns : this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getTotalAmountQuantityInput(yarn.details)
    });
    return sum
  }


  getTotalTotalAmountQuantityOutput() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.yarns : this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getTotalOutputQuantity(yarn.details)
    });
    return sum
  }


  getTotalCurrentQuantity() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.yarns : this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + yarn.current_quantity
    });
    return sum
  }


  getTotalItemAmount() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.yarns : this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getItemAmount(yarn.details)
    });
    return sum
  }


  getTotalAvgPrice() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.yarns : this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getAvgPrice(yarn.details)
    });
    return sum
  }


  getAvgInputesPrice(yarns){
    return this._sharedComponentService.getInputAmount(yarns.details) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(yarns.details))
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
