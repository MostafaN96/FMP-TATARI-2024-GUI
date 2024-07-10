import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

import { ConfirmationService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { SellRequisitionWeService } from "src/app/services/main/we/sell-requisition-we.service";

@Component({
  selector: 'app-show-all-sell-requisition-we',
  templateUrl: './show-all-sell-requisition-we.component.html',
  styleUrls: ['./show-all-sell-requisition-we.component.css'],
  providers: [ConfirmationService]
})
export class ShowAllSellRequisitionWeComponent implements OnInit {


  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  titlePage = ""
  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'number', 
    'date', 
    'seller_name', 
    'delivery_car_name', 
    'note', 
    'confirm_approved', 
    'details', 
    'confirm'];
  filter = "";
  dataSourceSearchTabel: any;
  filterSelectObj = [
    {
      name: 'رقم الإذن',
      columnProp: 'number',
      options: []
    }, {
      name: 'العميل',
      columnProp: 'seller_name',
      options: []
    }, {
      name: 'اسم السائق',
      columnProp: 'delivery_car_name',
      options: []
    }
  ]
  filterValues = {};
  startDate: any
  endDate: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _sellRequisitionWeService: SellRequisitionWeService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
    private confirmationService: ConfirmationService,
    private router: Router

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
    if(this.router.url === '/dashboard/show-all-sell-requisition-direct-we') {
      this.titlePage = "إظهار جميع اذونات التسليم المباشر"
      this.getData("direct");
    }
    else {
      this.displayedColumns.pop()
      this.titlePage = "إظهار جميع اذونات بيع القماش"
      this.getData();
    }

  }

  ngOnInit(): void {
    this.sortColumns.sort(({ id: 'number', start: 'desc'}) as MatSortable);
  }

  getData(isDirect?:string) {
    this._sellRequisitionWeService.selectAll(isDirect).subscribe((response: any) => {
      this.fabrics = response
      this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);

      this.dataSourceSearchTabel.sort = this.sortColumns;

      // Setup Filter
      this._sharedComponentService.setupFilter(response, this.dataSourceSearchTabel, this.filterSelectObj)
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);
    this.dataSourceSearchTabel.sort = this.sortColumns;
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  // Reset table filters
  resetFilters(filterSelectObj) {
    this.filterValues = {}
    filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSourceSearchTabel.filter = "";
    this.startDate = null
    this.endDate = null
    this.getData();
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  confirmCancelReceived(event: Event, element, isApproved) {
    if(isApproved == "0") {
      this.popupReceived(event, element, 'تأكيد الأستلام', "1")
    } else if (isApproved == "1") {
      this.popupReceived(event, element, 'إلغاء الأستلام', "0")
    }
  }
  
popupReceived(event: Event, element, message, isApproved) {
  this.confirmationService.confirm({
      target: event.target!,
      message: message,
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.executeConfirmReceived(element, isApproved);
      },
      reject: () => {
      }
  });
}

executeConfirmReceived(data, isApproved) {
  this._constantsService.spinner.show()
  const formData = {
    isApproved: isApproved,
    personid: this._sessionManagerService.Person_ID,
    ipaddress: this._sessionManagerService.IP_ADDRESS
  }
  this._sellRequisitionWeService.confirmReceived(formData, data.id).subscribe((response: any) => {
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
