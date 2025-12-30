import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { TransitionBetweenWhRequisitionDetailsWaService } from "src/app/services/main/wa/transition-between-wh-requisition-details-wa.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transition-between-wh-requisition-details-wa',
  templateUrl: './transition-between-wh-requisition-details-wa.component.html',
  styleUrls: ['./transition-between-wh-requisition-details-wa.component.css']
})
export class TransitionBetweenWhRequisitionDetailsWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  transitionBetweenWhRequisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'from_warehouse_name', 
    'from_wa_yarn_order_requisition_name', 
    'wa_yarn_order_requisition_name', 
    'yarn_name', 
    'yarn_code',
    'yarn_lot_code',
    'consigment_yarn_number',
    'quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'from_consigment_yarn_number',
    'from_yarn_lot_code',
    'yarn_order_requisitions',
    'document',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _transitionBetweenWhRequisitionDetailsWaService: TransitionBetweenWhRequisitionDetailsWaService,
    public _exportDataService: ExportDataService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,

  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._transitionBetweenWhRequisitionDetailsWaService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.transitionBetweenWhRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.transitionBetweenWhRequisitionDetails);

          if(!this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[2])) {
            let index = this.displayedColumns.indexOf('price');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('price_dollar');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('total');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('total_dollar');
            this.displayedColumns.splice(index, 1);
          }

          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  showAddDetailsFunc() {
    this.selectedDataToDetails = this.transitionBetweenWhRequisitionDetails
    this.showAddDetails = true;
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  goToRequisitionPage(typeOfRequisition, element) {
    if (typeOfRequisition == 'اذن اضافة' && element?.is_order == "0") {
      return `/dashboard/show-all-add-requisition/details`
    }
    else if (typeOfRequisition == 'اذن اضافة' && element?.is_order == "1") {
      return `/dashboard/show-all-add-requisition/order-details`
    }
    else if (typeOfRequisition == 'اذن نقل من (A) الى (B)') {
      return `/dashboard/show-all-transport-wa-wb-requisition/details`
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `/dashboard/show-all-reconciliation-requisition/details`
    }
    else if (typeOfRequisition == 'اذن نقل من (B) الى (A)') {
      return `/dashboard/show-all-transport-wb-wa-requisition/details`
    }
    else if (typeOfRequisition == 'اذن نقل بين المخازن') {
      return `/dashboard/show-all-transition-between-wh-requisition-wa/details`
    }
    return
  }

}
