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
  selector: 'app-transport-short-details-wa-wb-requisition-wb',
  templateUrl: './transport-short-details-wa-wb-requisition-wb.component.html',
  styleUrls: ['./transport-short-details-wa-wb-requisition-wb.component.css']
})
export class TransportShortDetailsWaWbRequisitionWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  transportWaWbDetails: any[] = []

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'yarn_name',
    'yarn_code',
    'yarn_lot_code',
    'consigment_yarn_number',
    'manufacturer_name',
    // 'transport_initial_quantity',
    'quantity',
    // 'current_quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'document',
    'statement'];
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
        this._wbTransportWaWbRequisitionDetailsService.selectByRequisitionId(params['id']).subscribe((response: any) => {

          this.transportWaWbDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.transportWaWbDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }
}
