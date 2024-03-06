import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "../../../../../services/shared-component.service";
import { ExportDataService } from "../../../../../services/export-data.service";

// Call Service
import { ReportWaService } from "../../../../../services/main/wa/report-wa.service";

@Component({
  selector: 'app-item-history-by-yarn',
  templateUrl: './item-history-by-yarn.component.html',
  styleUrls: ['./item-history-by-yarn.component.css']
})
export class ItemHistoryByYarnComponent implements OnInit {

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
  selectedWarehouses: any[] = []
  selectedYarnLotCode: any[] = []
  selectedYarnNames: any[] = []
  selectedConsigmentYarn: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    // private _yarnService: YarnService,
    private _reportWaService: ReportWaService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForCode();  
    this.customFilterForWarehouse();  
    this.customFilterForYarnLotCode();  
    this.customFilterForYarnName();  
    this.customFilterForConsigmentYarn();  
  }

  getData() {
    this.loading = true;
    this._reportWaService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.yarns = response
      
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getClosedBalances() {
    this.loading = true;
    this._reportWaService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.yarns = response
      
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForYarnName() {
    const customFilterName = "yarn-name-filter-total";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedYarnNames

      if (this.selectedYarnNames[0] != null) {
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
              if (value == filter[j].yarn_name ) {
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
              if (value == filter[j].yarn_code ) {
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

  // Reset table filters
  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedYarnNames = []
    this.selectedCodes = []
    this.selectedWarehouses = []
    this.selectedYarnLotCode = []
    this.selectedConsigmentYarn = []
  }

  onMultiselectedYarnNames(event) {
    this.selectedYarnNames = event
    this.dt1?._filter()
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedWarehouses(event) {
    this.selectedWarehouses = event
    this.dt1?._filter()
  }

  onMultiselectedYarnLotCodes(event) {
    this.selectedYarnLotCode = event
    this.dt1?._filter()
  }

  onMultiselectedConsigmentYarn(event) {
    this.selectedConsigmentYarn = event
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
