import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { ConstantsService } from "src/app/services/constants.service";

@Component({
  selector: 'app-dyed-fabric-order-requisition-show-all-we',
  templateUrl: './dyed-fabric-order-requisition-show-all-we.component.html',
  styleUrls: ['./dyed-fabric-order-requisition-show-all-we.component.css'],
  providers: [ConfirmationService]
})
export class DyedFabricOrderRequisitionShowAllWeComponent implements OnInit {

  @Output() event_callback: EventEmitter<any> = new EventEmitter();
  /////////////////// Variables /////////////////// 
  fabrics: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedSellerName: any[] = []
  selectedOrderNumber: any[] = []
  selectedNote: any[] = []
  startDate: any
  endDate: any
  dateFilters: any

  selectedData: any = []
  selectedMirgedOrders: any = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    private _reportWeService: ReportWeService,
    private _constantsService: ConstantsService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    private router: Router,
    private confirmationService: ConfirmationService

  ) {


  }

  ngOnInit(): void {
    // this.getData();
    this.customFilterForSellerName();
    this.customFilterForOrderNumber();
    this.customFilterForNote();

    if (this.router.url === '/dashboard/show-all-closed-dyed-fabric-order-requisition-we') {
      this.getData("closed")
    }
    else {
      this.getData()
    }
  }

  getData(isClosed?: string) {
    this.loading = true;

    this._dyedFabricOrderRequisitionWeService.selectAll(isClosed).subscribe((response: any) => {
      this.fabrics = response
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
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
  customFilterForNote() {
    const customFilterName = "note-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedNote

      if (this.selectedNote[0] != null) {
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
                if (value == filter[j].name) {
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
    this.selectedOrderNumber = []
    this.selectedNote = []
    this.dateFilters = []
  }

  onMultiselectedSellerName(event) {
    this.selectedSellerName = event
    this.dt1?._filter()
  }

  onMultiselectedOrderNumber(event) {
    this.selectedOrderNumber = event
    this.dt1?._filter()
  }

  onMultiselectedNote(event) {
    this.selectedNote = event
    this.dt1?._filter()
  }

  confirm(event: Event, element) {
    console.log("dfgsdffdsf");

    this.confirmationService.confirm({
      target: event.target!,
      message: 'تأكيد إغلاق الطلبية؟',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.closeOrder(element);
      },
      reject: () => {
      }
    });
  }

  closeOrder(data) {
    this._constantsService.spinner.show()
    this._dyedFabricOrderRequisitionWeService.closeOrderByRequisition(data.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage()
        this.getData()
      }
      else {
        this._constantsService.userErrorMessage()
      }
    })
  }

  goToRequisitionPage(typeOfRequisition, element?) {
    if (typeOfRequisition == 'add_yarn_order_requisition') {
      return `/dashboard/${this._constantsService.ROUTING_LINKS[163]}`
    }
    else if (typeOfRequisition == 'show_all_opened_yarn_order_requisition') {
      return `/dashboard/${this._constantsService.ROUTING_LINKS[164]}`
    }
    else if (typeOfRequisition == 'show_all_closed_yarn_order_requisition') {
      return `/dashboard/${this._constantsService.ROUTING_LINKS[175]}`
    }
    else if (typeOfRequisition == 'add_fabric_order_requisition') {
      return `/dashboard/${this._constantsService.ROUTING_LINKS[177]}`
    }
    else if (typeOfRequisition == 'show_all_opened_fabric_order_requisition') {
      return `/dashboard/${this._constantsService.ROUTING_LINKS[179]}`
    }
    else if (typeOfRequisition == 'show_all_closed_fabric_order_requisition') {
      return `/dashboard/${this._constantsService.ROUTING_LINKS[181]}`
    }
    else if (typeOfRequisition == 'add_manufacturing_order_requisition') {
      return `/dashboard/${this._constantsService.ROUTING_LINKS[131]}`
    }
    return
  }

  inquireReport() {
    // this.event_callback.emit(dyeingOrderRequisitionIds);
    // this._sharedComponentService.setData(dyeingOrderRequisitionIds)

    let dyeingOrderRequisitionIds = this.selectedData.map(({ id }) => id)
    localStorage.setItem('dyeingOrderRequisitionIds', JSON.stringify(dyeingOrderRequisitionIds))
    this._sharedComponentService.openPageNewTabWithoutParams(this._constantsService.ROUTING_MAIN_LINKS[0]+this._constantsService.ROUTING_LINKS[159])
    

  }

  selectedMirgeOrders() {
    this.selectedMirgedOrders = this.selectedData.map(item => ({
  id: item.id,
  orders_requisitions_id: item.orders_requisitions_id
}))
  }

  mirgeOrders() {
    console.log(this.selectedMirgedOrders);
    
    this._constantsService.spinner.show()
    this._dyedFabricOrderRequisitionWeService.mirgeOrders(this.selectedMirgedOrders).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage()
        this.getData()
      }
      else {
        this._constantsService.userErrorMessage()
      }
    })
    
  }
}
