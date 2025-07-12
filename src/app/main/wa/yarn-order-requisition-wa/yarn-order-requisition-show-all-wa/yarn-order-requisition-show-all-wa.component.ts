import { Component, OnInit, ViewChild } from '@angular/core';

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
import { YarnOrderRequisitionWaService } from "src/app/services/main/wa/yarn-order-requisition-wa.service";
import { ConstantsService } from "src/app/services/constants.service";

@Component({
  selector: 'app-yarn-order-requisition-show-all-wa',
  templateUrl: './yarn-order-requisition-show-all-wa.component.html',
  styleUrls: ['./yarn-order-requisition-show-all-wa.component.css'],
  providers: [ConfirmationService]
})
export class YarnOrderRequisitionShowAllWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []

   //////////////////////////////////// PrimeNG /////////////////////////////////
   @ViewChild('dt1') dt1: Table | undefined;
   loading: boolean = true;
   selectedSellerName: any[] = []
   selectedOrderName: any[] = []
   startDate: any
   endDate: any
   dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _yarnOrderRequisitionWaService: YarnOrderRequisitionWaService,
    private router: Router,
    private _constantsService: ConstantsService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

    
  }

  ngOnInit(): void {
    if(this.router.url === '/dashboard/show-all-closed-yarn-order-requisition-wa') {
      this.getData("closed")
    }
    else {
      this.getData()
    }
    this.customFilterForSellerName();
    this.customFilterForOrderNumber();

  }

  getData(isClosed?:string) {
    this._yarnOrderRequisitionWaService.selectAll(isClosed).subscribe((response: any) => {
      this.yarns = response

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
  
  customFilterForOrderNumber() {
    const customFilterName = "order-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedOrderName

      if (this.selectedOrderName[0] != null) {
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
          if(filter[0] != null && filter[1] != null) {
            
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
    this.selectedOrderName = []
    this.dateFilters = []
  }


  onMultiselectedSellerName(event) {
    this.selectedSellerName = event
    this.dt1?._filter()
  }

  onMultiselectedOrderName(event) {
    this.selectedOrderName = event
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
    this._yarnOrderRequisitionWaService.closeOrderByRequisition(data.id).subscribe((response: any) => {
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

