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
  selector: 'app-item-history-report-wb',
  templateUrl: './item-history-report-wb.component.html',
  styleUrls: ['./item-history-report-wb.component.css'],
  providers: [SharedComponentService]
})
export class ItemHistoryReportWbComponent implements OnInit {

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
  selectedCodes: any[] = []
  selectedNames: any[] = []
  selectedLotCodes: any[] = []
  selectedConsigmentNumber: any[] = []

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
    this.customFilterForManufacturers();
    this.customFilterForCode();
    this.customFilterForName();
    this.customFilterForLotCode();
    this.customFilterForConsigmentNumber();
  }

  getData() {
    this.loading = true;
    this.codes = []

    this._reportWbService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.yarns = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getClosedBalances() {
    this.codes = []
    this.loading = true;
    this._reportWbService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
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
  customFilterForManufacturers() {
    const customFilterName = "manufacturers-filter";
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

  customFilterForCode() {
    const customFilterName = "code-filter";
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

  customFilterForName() {
    const customFilterName = "name-filter";
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

  customFilterForLotCode() {
    const customFilterName = "lot-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedLotCodes
      
      if (this.selectedLotCodes[0] != null) {
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
            if (value == filter[j].consigment_yarn_number) {
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
    this.selectedCodes = []
    this.selectedNames = []
    this.selectedLotCodes = []
    this.selectedConsigmentNumber = []
    // this.getData();
  }

  onMultiselectedManufacturers(event) {
    this.selectedManufacturers = event
    this.dt1?._filter()
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedNames(event) {
    this.selectedNames = event
    this.dt1?._filter()
  }

  onMultiselectedLotCodes(event) {
    this.selectedLotCodes = event
    this.dt1?._filter()
  }

  onMultiselectedConsigmentNumber(event) {
    this.selectedConsigmentNumber = event
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
