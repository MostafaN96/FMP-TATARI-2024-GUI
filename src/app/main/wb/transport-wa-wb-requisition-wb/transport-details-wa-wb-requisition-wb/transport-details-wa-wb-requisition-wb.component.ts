import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

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
}
