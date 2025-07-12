import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { ConstantsService } from 'src/app/services/constants.service';

// Call Service
import { WbTransportWaWbRequisitionDetailsService } from "src/app/services/main/wb/wb-transport-wa-wb-requisition-details.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transport-details-wa-wb-requisition-wb',
  templateUrl: './transport-details-wa-wb-requisition-wb.component.html',
  styleUrls: ['./transport-details-wa-wb-requisition-wb.component.css']
})
export class TransportDetailsWaWbRequisitionWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  transportWaWbDetails: any[] = []
  selectedDataToDetails: any
  selectedDataToUpdate: any
  internalSelectedDataToUpdate: any
  showAddDetails = false
  dyeingId: string = ""

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'from_wa_yarn_order_requisition_name',
    'wa_yarn_order_requisition_name',
    'yarn_name',
    'yarn_code',
    'yarn_lot_code',
    'from_consigment_yarn_number',
    'manufacturer_name',
    // 'transport_initial_quantity',
    'quantity',
    'current_quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'fabric_name',
    'fabric_code',
    'consigment_yarn_number',
    'yarn_order_requisitions',
    'document',
    'statement',
    'update',
    'update_fabric_to_be_manufactured'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _wbTransportWaWbRequisitionDetailsService: WbTransportWaWbRequisitionDetailsService,
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
        this._wbTransportWaWbRequisitionDetailsService.selectWithFabricManufacturedByRequisitionId(params['id']).subscribe((response: any) => {

          this.transportWaWbDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.transportWaWbDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;

          if(!this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[3])) {
            let index = this.displayedColumns.indexOf('price');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('price_dollar');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('total');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('total_dollar');
            this.displayedColumns.splice(index, 1);
          }
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  getInternalSelectedDataToUpdate(selectedData: any) {
    selectedData.consigment_yarn_id = selectedData.from_consigment_yarn_id
    this.internalSelectedDataToUpdate = selectedData
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  /** Gets the total quantity of all transactions. */
  getTotalQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.initial_quantity).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(function (a) { return parseFloat(a.initial_quantity) * parseFloat(a['price']) }).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, initial_quantity: string) {
    return parseFloat(price) * parseFloat(initial_quantity);
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////
  showAddDetailsFunc() {
    this.selectedDataToDetails = this.transportWaWbDetails
    this.showAddDetails = true;
  }
  
  goToRequisitionPage(typeOfRequisition, element) {
    if (typeOfRequisition == 'اذن اضافة' && element.is_order == "0") {
      return `/dashboard/show-all-add-requisition/details`
    }
    else if (typeOfRequisition == 'اذن اضافة' && element.is_order == "1") {
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
