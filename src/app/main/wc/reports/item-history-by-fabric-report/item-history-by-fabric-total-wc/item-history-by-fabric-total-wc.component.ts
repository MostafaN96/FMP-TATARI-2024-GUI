import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";

@Component({
  selector: 'app-item-history-by-fabric-total-wc',
  templateUrl: './item-history-by-fabric-total-wc.component.html',
  styleUrls: ['./item-history-by-fabric-total-wc.component.css']
})
export class ItemHistoryByFabricTotalWcComponent implements OnInit {

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
  isShowLatestPriceDollar = true
  isShowLatestManufacturingPrice = true
  isShowClosedBalances = false

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedCodesTotal: any[] = []
  selectedNamesTotal: any[] = []
  selectedDyeingCodes: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    // private _yarnService: YarnService,
    private _reportWcService: ReportWcService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForCodeTotal();
    this.customFilterForNameTotal();
    this.customFilterForDyeingCodeTotal();
  }

  getData() {
    this.loading = true;
    this._reportWcService.selectInverntoryTotal({ isShowClosedBalances: this.isShowClosedBalances }).subscribe((response: any) => {
      this.fabrics = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getClosedBalances() {
    this.loading = true;
    this._reportWcService.selectInverntoryTotal({ isShowClosedBalances: this.isShowClosedBalances }).subscribe((response: any) => {
      this.fabrics = response
      
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  customFilterForCodeTotal() {
    const customFilterName = "code-total-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCodesTotal

      if (this.selectedCodesTotal[0] != null) {
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

  customFilterForNameTotal() {
    const customFilterName = "name-total-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedNamesTotal

      if (this.selectedNamesTotal[0] != null) {
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

  customFilterForDyeingCodeTotal() {
    const customFilterName = "dyeing-code-total-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingCodes

      if (this.selectedDyeingCodes[0] != null) {
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
    this.selectedCodesTotal = []
    this.selectedNamesTotal = []
    this.selectedDyeingCodes = []
  }

  onMultiselectedCodesTotal(event) {
    this.selectedCodesTotal = event
    this.dt1?._filter()
  }

  onMultiselectedNamesTotal(event) {
    this.selectedNamesTotal = event
    this.dt1?._filter()
  }

  onMultiselectedDyeingCodesTotal(event) {
    this.selectedDyeingCodes = event
    this.dt1?._filter()
  }

  getTotalTotalAmountQuantityInput() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this._sharedComponentService.getTotalAmountQuantityInput(fabric.details)
    });
    return sum
  }

  getTotalTotalAmountQuantityOutput() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this._sharedComponentService.getTotalOutputQuantity(fabric.details)
    });
    return sum
  }

  getTotalItemAmount() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this._sharedComponentService.getItemAmount(fabric.details)
    });
    return sum
  }

  getTotalAvgPrice() {
    let sum = 0;
    let data: any[] = this.dt1?.filteredValue == null ? this.fabrics : this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this._sharedComponentService.getAvgPrice(fabric.details)
    });
    return sum
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
