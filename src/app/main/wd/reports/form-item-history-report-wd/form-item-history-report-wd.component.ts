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
  selector: 'app-form-item-history-report-wd',
  templateUrl: './form-item-history-report-wd.component.html',
  styleUrls: ['./form-item-history-report-wd.component.css']
})
export class FormItemHistoryReportWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  isShowClosedBalances  = false

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedCodes: any[] = []
  selectedDyeingCodes: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForCode();
    this.customFilterForDyeingCode();
  }

  getData() {
    this.loading = true;
    this._reportWdService.formReportByFabric({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.fabrics = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  filterByDate() {
    this.loading = true;
    this._reportWdService.formReportByFabric({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.fabrics = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getClosedBalances() {
    this.loading = true;
    this._reportWdService.formReportByFabric({isShowClosedBalances: this.isShowClosedBalances}).subscribe((response: any) => {
      this.fabrics = response
      
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

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

  clear(table: Table) {
    table.clear();
    table.reset();
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedDyeingCodes(event) {
    this.selectedDyeingCodes = event
    this.dt1?._filter()
  }


  getCurrentQuantity(data) {
    let current = data.current_quantity
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
      current = parseFloat(data.current_quantity)
    }
    return current
  }

  getTotalCurrentQuantity() {
    let sum = 0.0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + this.getCurrentQuantity(yarn)
    });
    return sum
  }

  getTotalCurrentQuantityWithForm() {
    let sum = 0.0;
    let data:any[] = this.dt1?.filteredValue == null ? this.fabrics:  this.dt1?.filteredValue
    data.forEach(yarn => {
      sum = sum + yarn.current_quantity
    });
    return sum
  }

  getTotalFormQuantity() {
    return this.getTotalCurrentQuantity() - this.getTotalCurrentQuantityWithForm()
  }

  getTotalFormCurrentQuantity(data) {
    return data.details?.map(function (a) { return (parseFloat(a.form_current_quantity)) }).reduce((acc, value) => acc + value, 0.0);
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
