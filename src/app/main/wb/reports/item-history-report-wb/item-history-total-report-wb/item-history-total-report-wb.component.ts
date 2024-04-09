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
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";

@Component({
  selector: 'app-item-history-total-report-wb',
  templateUrl: './item-history-total-report-wb.component.html',
  styleUrls: ['./item-history-total-report-wb.component.css']
})
export class ItemHistoryTotalReportWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []
  codes: any[] = []
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
  isShowClosedBalances  = false

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedManufacturers: any[] = []
  selectedCodesTotal: any[] = []
  selectedNamesTotal: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWbService: ReportWbService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForManufacturersTotal();
    this.customFilterForCodeTotal();
    this.customFilterForNameTotal();
  }

  getData() {
    this.loading = true;
    this.codes = []

    this._reportWbService.selectInverntoryTotal({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.yarns = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getClosedBalances() {
    this.codes = []
    this.loading = true;
    this._reportWbService.selectInverntoryTotal({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.yarns = response

      for (let i = 0; i < this.yarns.length; i++) {
        const yarn = this.yarns[i];
        if(!this.codes.includes(yarn.code)) {
          this.codes.push(yarn)
        }
      }

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForManufacturersTotal() {
    const customFilterName = "manufacturers-total-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedManufacturers
      
      if (this.selectedManufacturers[0] != null) {
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
              if (value == filter[j].manufacturer_name ) {
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

  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedManufacturers = []
    this.selectedCodesTotal = []
    this.selectedNamesTotal = []
    // this.getData();
  }

  onMultiselectedManufacturersTotal(event) {
    this.selectedManufacturers = event
    this.dt1?._filter()
  }

  onMultiselectedCodesTotal(event) {
    this.selectedCodesTotal = event
    this.dt1?._filter()
  }

  onMultiselectedNamesTotal(event) {
    this.selectedNamesTotal = event
    this.dt1?._filter()
  }

  getTotalTotalAmountQuantityInput() {
    let sum = 0;
    let data:any[] = this.dt1?.filteredValue == null ? this.yarns:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getTotalAmountQuantityInput(yarn.details)
    });
    return sum
  }

  getTotalTotalAmountQuantityOutput() {
    let sum = 0;
    let data:any[] = this.dt1?.filteredValue == null ? this.yarns:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getTotalOutputQuantity(yarn.details)
    });
    return sum
  }

  getTotalCurrentQuantity() {
    let sum = 0;
    let data:any[] = this.dt1?.filteredValue == null ? this.yarns:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + yarn.current_quantity
    });
    return sum
  }

  getTotalItemAmount() {
    let sum = 0;
    let data:any[] = this.dt1?.filteredValue == null ? this.yarns:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getItemAmount(yarn.details)
    });
    return sum
  }

  getTotalAvgPrice() {
    let sum = 0;
    let data:any[] = this.dt1?.filteredValue == null ? this.yarns:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getAvgPrice(yarn.details)
    });
    return sum
  }

  getAvgInputesPrice(yarns){
    return this._sharedComponentService.getInputAmount(yarns.details) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(yarns.details))
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  transferData(data) {
    this._sharedComponentService.setData(data)
  }
}
