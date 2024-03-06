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
import { DyeingOrderWdService } from "src/app/services/main/wd/dyeing-order-wd.service";
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { ConstantsService } from "src/app/services/constants.service";

@Component({
  selector: 'app-show-all-dyeing-order-wd',
  templateUrl: './show-all-dyeing-order-wd.component.html',
  styleUrls: ['./show-all-dyeing-order-wd.component.css'],
  providers: [ConfirmationService]
})
export class ShowAllDyeingOrderWdComponent implements OnInit {

  @Output() event_callback: EventEmitter<any> = new EventEmitter();
  /////////////////// Variables /////////////////// 
  fabrics: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedSellerName: any[] = []
  selectedNote: any[] = []
  selectedWorkOrderNumber: any[] = []
  startDate: any
  endDate: any
  dateFilters: any

  selectedData: any = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _dyeingOrderWdService: DyeingOrderWdService,
    private _reportWeService: ReportWeService,
    private _constantsService: ConstantsService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    private router: Router,
    private confirmationService: ConfirmationService

  ) {


  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForSellerName();
    this.customFilterForNote();
    this.customFilterForWorkOrderNumber();


    if (this.router.url === '/dashboard/show-all-closed-dyeing-order-wd') {
      this.getData("closed")
    }
    else {
      this.getData()
    }
  }

  getData(isClosed?: string) {
    this.loading = true;

    this._dyeingOrderWdService.selectAll(isClosed).subscribe((response: any) => {
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
  customFilterForWorkOrderNumber() {
    const customFilterName = "work-order-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWorkOrderNumber

      if (this.selectedWorkOrderNumber[0] != null) {
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
            if (value == filter[j].work_order_number) {
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
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
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
    this.selectedNote = []
    this.selectedWorkOrderNumber = []
    this.dateFilters = []
  }

  onMultiselectedSellerName(event) {
    this.selectedSellerName = event
    this.dt1?._filter()
  }

  onMultiselectedNote(event) {
    this.selectedNote = event
    this.dt1?._filter()
  }

  onMultiselectedWorkOrderNumber(event) {
    this.selectedWorkOrderNumber = event
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
    this._dyeingOrderWdService.closeOrderByRequisition(data.id).subscribe((response: any) => {
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
      return `/dashboard/${this._constantsService.ROUTING_LINKS[155]}`
    }
    else if (typeOfRequisition == 'show_all_yarn_order_requisition') {
      return `/dashboard/${this._constantsService.ROUTING_LINKS[156]}`
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
}
