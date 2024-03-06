import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";

@Component({
  selector: 'app-item-history-report-wd',
  templateUrl: './item-history-report-wd.component.html',
  styleUrls: ['./item-history-report-wd.component.css']
})

export class ItemHistoryReportWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  isShowTotalInput = true
  iShowTotalOutput = true
  iShowTotalBalance = true
  iShowTotalBalanceWithForm = true
  iShowTotalBalanceForm = true
  isShowTotalAmountInput = false
  iShowTotalAmountOutput = false
  iShowItemValue = false
  isShowAvgPrice = false
  isShowAvgInputes = false
  isShowAvgWast = true
  isShowLatestPrice = true
  isShowClosedBalances  = false

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedDyers: any[] = []
  selectedNames: any[] = []
  selectedCodes: any[] = []
  selectedDyeingCodes: any[] = []
  selectedConsigmentNumber: any[] = []
  startDate:any
  endDate:any

  constructor(
    public _sharedComponentService: SharedComponentService,
    // private _yarnService: YarnService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForDyers();
    this.customFilterForName();
    this.customFilterForCode();
    this.customFilterForDyeingCode();
    this.customFilterForConsigmentNumber();
  }

  getData() {
    this.loading = true;
    this._reportWdService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances, startDate:undefined, endDate:undefined}).subscribe((response: any) => {
      this.fabrics = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  filterByDate() {
    this.loading = true;
    this._reportWdService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances, startDate:this.startDate, endDate:this.endDate}).subscribe((response: any) => {
      this.fabrics = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getClosedBalances() {
    this.loading = true;
    this._reportWdService.selectInverntoryDetails({isShowClosedBalances: this.isShowClosedBalances, startDate:undefined, endDate:undefined}).subscribe((response: any) => {
      this.fabrics = response
      
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForDyers() {
    const customFilterName = "dyers-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyers
      
      if (this.selectedDyers[0] != null) {
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
              if (value == filter[j].dyeing_name ) {
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
    const customFilterName = "fabric-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedNames
      
      if (this.selectedNames[0] != null) {
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
              if (value == filter[j].fabric_name ) {
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
    const customFilterName = "fabric-code-filter";
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
              if (value == filter[j].fabric_code ) {
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
              if (value == filter[j].fabric_dyeing_code ) {
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
            if (value == filter[j].consigment_dyeing_number) {
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
    // this.getData();
    this.startDate = null
    this.endDate = null
    this.selectedDyers = []
    this.selectedNames = []
    this.selectedCodes = []
    this.selectedDyeingCodes = []
    this.selectedConsigmentNumber = []
  }

  onMultiselectedDyers(event) {
    this.selectedDyers = event
    this.dt1?._filter()
  }

  onMultiselectedNames(event) {
    this.selectedNames = event
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
  onMultiselectedConsigmentNumber(event) {
    this.selectedConsigmentNumber = event
    this.dt1?._filter()
  }

  notZero(n) {
    n = +n;  // Coerce to number.
    if (!n) {  // Matches +0, -0, NaN
      n = 1
    }
    return n;
  }

  getTotalTotalAmountQuantityInput() {
    let sum = 0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getTotalAmountQuantityInput(yarn.details)
    });
    return sum
  }

  getTotalTotalAmountQuantityOutput() {
    let sum = 0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getTotalOutputQuantity(yarn.details)
    });
    return sum
  }

  getCurrentQuantity(data) {
    let current = (data.current_quantity >= 0) ? data.current_quantity : 0
    let hasDyeingRequesition = false
    for (let index = 0; index < data.details.length; index++) {
      const element = data.details[index];
      if(element.type_of_requisition == 'اذن تشكيل') {
        hasDyeingRequesition = true
        current = current + parseFloat(element.form_quantity)
      }
      // else if (element.type_of_requisition == 'اذن صباغة' || 
      // element.type_of_requisition == 'اذن نقل من مصبغة') {
        else if (element.type_of_requisition == 'اذن صباغة') {
        hasDyeingRequesition = true        
        current = current - parseFloat(element.quantity)
      }
    }
    if(!hasDyeingRequesition) {
      current = parseFloat((data.current_quantity >= 0) ? data.current_quantity : 0)
    }
    return current
  }

  getTotalCurrentQuantity() {
    let sum = 0.0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this.getCurrentQuantity(fabric)
    });
    return sum
  }

  getTotalCurrentQuantityWithForm() {
    let sum = 0.0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + ((fabric.current_quantity >= 0) ? fabric.current_quantity : 0)
    });
    return sum
  }

  getTotalTotalTransportBetweenQuantity() {
    let sum = 0.0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(fabric => {
      sum = sum + this.getTotalTransportBetweenQuantity(fabric)
    });
    return sum
  }

  getTotalFormQuantity() {
    return (this.getTotalCurrentQuantity() + this.getTotalTotalTransportBetweenQuantity()) - this.getTotalCurrentQuantityWithForm()
  }

  getTotalFormCurrentQuantity(data) {
    return data.details?.map(function (a) { return (parseFloat(a.form_current_quantity)) }).reduce((acc, value) => acc + value, 0.0);
  }

  getTotalQuantity(fabrics) {
    return fabrics.details?.map(function (a) { return (a.input_output == '0' && a.type_of_requisition == 'اذن صباغة') ? (parseFloat(a['quantity'])) : 0.0 }).reduce((acc, value) => acc + value, 0.0);
  }

  getTotalTransportBetweenQuantity(fabrics) {
    return fabrics?.details.map(function (a) { return (a.input_output == '1' && a.type_of_requisition == 'اذن نقل الى مصبغة') ? (parseFloat(a['quantity']) - parseFloat(a['current_quantity'])) : 0.0 }).reduce((acc, value) => acc + value, 0.0);
  }

  getTotalItemAmount() {
    let sum = 0.0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getItemAmount(yarn.details)
    });
    return sum
  }

  getTotalAvgPrice() {
    let sum = 0.0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this._sharedComponentService.getAvgPrice(yarn.details)
    });
    return sum
  }


  getTotalInputesPrice(fabrics){
    return fabrics?.details?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice(fabrics){
    return this._sharedComponentService.getInputAmount(fabrics.details) / this.notZero(this._sharedComponentService.getTotalAmountQuantityInput(fabrics.details))
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  transferData(data) {
    this._sharedComponentService.setData(data)
  }
}
