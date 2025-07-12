import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { WdTransportWcWdRequisitionDetailsService } from "src/app/services/main/wc/wd-transport-wc-wd-requisition-details.service";
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { ConstantsService } from 'src/app/services/constants.service';

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transport-wc-wd-requisition-details-wc',
  templateUrl: './transport-wc-wd-requisition-details-wc.component.html',
  styleUrls: ['./transport-wc-wd-requisition-details-wc.component.css']
})
export class TransportWcWdRequisitionDetailsWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  transportWcWdDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToAddDetails: any
  showAddDetails = false
  showInputUpdate = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'wc_fabric_order_requisition_name', 
    'fabric_name', 
    'fabric_code',
    'consigment_manufacturing_number',
    'dyer_name',
    'quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'fabric_order_requisitions',
    'document',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _wdTransportWcWdRequisitionDetailsService: WdTransportWcWdRequisitionDetailsService,
    public _exportDataService: ExportDataService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._wdTransportWcWdRequisitionDetailsService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          
          this.transportWcWdDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.transportWcWdDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

      if(!this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[0])) {
        let index = this.displayedColumns.indexOf('price');
        this.displayedColumns.splice(index, 1);
        index = this.displayedColumns.indexOf('price_dollar');
        this.displayedColumns.splice(index, 1);
        index = this.displayedColumns.indexOf('total');
        this.displayedColumns.splice(index, 1);
        index = this.displayedColumns.indexOf('total_dollar');
        this.displayedColumns.splice(index, 1);
      }

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
    this.showInputUpdate = true;
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  showAddDetailsFunc() {
    this.selectedDataToAddDetails = this.transportWcWdDetails[0]
    this.showAddDetails = true;
  }
  
  goToRequisitionPage(typeOfRequisition, element?) {
    if (typeOfRequisition == 'اذن اضافة') {
      return `/dashboard/show-all-add-requisition-wc/details`
    }
    else if (typeOfRequisition == 'اذن تصنيع' && element?.is_order != '1') {
      return `/dashboard/show-all-manufacturing-requisition-wb/details`
    }
    else if (typeOfRequisition == 'اذن تصنيع' && element?.is_order == '1') {
      return `/dashboard/show-all-manufacturing-order-requisition-wb/order-details`
    }
    else if (typeOfRequisition == 'اذن نقل من (D) الى (C)') {
      return `/dashboard/show-all-transport-wd-wc-requisition/details`
    }
    else if (typeOfRequisition == 'اذن نقل بين المخازن') {
      return `/dashboard/show-all-transition-between-wh-requisition-wc/details`
    }
    return
  }
}
