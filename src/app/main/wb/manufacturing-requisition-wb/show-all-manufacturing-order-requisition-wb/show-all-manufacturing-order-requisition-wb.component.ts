import { Component, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { ManufacturingRequisitionWbService } from "src/app/services/main/wb/manufacturing-requisition-wb.service";

@Component({
  selector: 'app-show-all-manufacturing-order-requisition-wb',
  templateUrl: './show-all-manufacturing-order-requisition-wb.component.html',
  styleUrls: ['./show-all-manufacturing-order-requisition-wb.component.css']
})
export class ShowAllManufacturingOrderRequisitionWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []
  circularKnittingMachineNames: any[] = new Array()

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedSellerName: any[] = []
  selectedManufactureName: any[] = []
  selectedCircularKnittingMachineName: any[] = []
  selectedFabricCode: any[] = []
  selectedFabricName: any[] = []
  selectedOrderNumber: any[] = []
  selectedRequisitionNote: any[] = []
  startDate: any
  endDate: any
  dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _manufacturingRequisitionWbService: ManufacturingRequisitionWbService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForSellerName();
    this.customFilterForManufactureName();
    this.customFilterForCircularKnittingMachineName();
    this.customFilterForFabricCode();
    this.customFilterForFabricName();
    this.customFilterForOrderNumber();
    this.customFilterForRequisitionNote();

  }

  getData() {
    this.loading = true;
    this._manufacturingRequisitionWbService.selectOrders().subscribe((response: any) => {
      this.yarns = response
      this.getCircularKnittingMachineName(this.yarns)

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;

    })
  }

  getCircularKnittingMachineName(data) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i].details;
      this.circularKnittingMachineNames.push(element)
    }    
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForSellerName() {
    const customFilterName = "seller-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedSellerName

      if (this.selectedSellerName[0] != null) {
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
            if (value == filter[j].seller_name) {
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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForManufactureName() {
    const customFilterName = "manufacture-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedManufactureName

      if (this.selectedManufactureName[0] != null) {
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
            if (value == filter[j].manufacture_name) {
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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForCircularKnittingMachineName() {
    const customFilterName = "circular-knitting-machine-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCircularKnittingMachineName

      if (this.selectedCircularKnittingMachineName[0] != null) {
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
            console.log("value :::: ", value);
            console.log("filter[j] :::: ", filter[j]);

            if (value == filter[j].circular_knitting_machine_name) {
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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForFabricCode() {
    const customFilterName = "fabric-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricCode

      if (this.selectedFabricCode[0] != null) {
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
            if (value == filter[j].fabric_code) {
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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForFabricName() {
    const customFilterName = "fabric-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricName

      if (this.selectedFabricName[0] != null) {
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
            if (value == filter[j].fabric_name) {
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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForOrderNumber() {
    const customFilterName = "order-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedOrderNumber

      if (this.selectedOrderNumber[0] != null) {
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
            if (value == filter[j].order_number) {
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

  customFilterForRequisitionNote() {
    const customFilterName = "requisition-note-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedRequisitionNote

      if (this.selectedRequisitionNote[0] != null) {
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
            if (value == filter[j].note) {
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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  selectedDate(event) {
    this.filterService.register("date-filter", (value: any, filter: any[]): boolean => {
      filter = this.dateFilters

      if (event != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0
          if (filter[0] != null && filter[1] != null) {

            if (moment(value).format('YYYY-MM-DD') >= moment(filter[0]).format('YYYY-MM-DD') &&
              moment(value).format('YYYY-MM-DD') <= moment(filter[1]).format('YYYY-MM-DD')) {
              return true;
            }

          } else if (filter[0] != null && filter[1] == null) {

            if (moment(value).format('YYYY-MM-DD') > moment(filter[0]).format('YYYY-MM-DD')) {
              return false;
            } else if (moment(value).format('YYYY-MM-DD') < moment(filter[0]).format('YYYY-MM-DD')) {
              return false;
            } else {
              return true;
            }
          }

        }
        return false;
      }
      else {
        return true;
      }
    })
    this.dt1?.filter(event, "date", "date-filter")
  }

  // Reset table filters
  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedSellerName = []
    this.selectedManufactureName = []
    this.selectedCircularKnittingMachineName = []
    this.selectedFabricCode = []
    this.selectedFabricName = []
    this.selectedOrderNumber = []
    this.selectedRequisitionNote = []
    this.dateFilters = []
  }

  onMultiselectedSellerName(event) {
    this.selectedSellerName = event
    this.dt1?._filter()
  }

  onMultiselectedManufactureName(event) {
    this.selectedManufactureName = event
    this.dt1?._filter()
  }

  onMultiselectedCircularKnittingMachineName(event) {
    this.selectedCircularKnittingMachineName = event
    this.dt1?._filter()
  }

  onMultiselectedFabricCode(event) {
    this.selectedFabricCode = event
    this.dt1?._filter()
  }

  onMultiselectedFabricName(event) {
    this.selectedFabricName = event
    this.dt1?._filter()
  }

  onMultiselectedOrderNumber(event) {
    this.selectedOrderNumber = event
    this.dt1?._filter()
  }

  onMultiselectedRequisitionNote(event) {
    this.selectedRequisitionNote = event
    this.dt1?._filter()
  }

}
