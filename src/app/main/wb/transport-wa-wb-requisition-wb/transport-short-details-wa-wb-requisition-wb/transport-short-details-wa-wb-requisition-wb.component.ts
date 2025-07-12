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
    'from_wa_yarn_order_requisition_name',
    'wa_yarn_order_requisition_name',
    'yarn_name',
    'yarn_code',
    'yarn_lot_code',
    'from_consigment_yarn_number',
    'manufacturer_name',
    // 'transport_initial_quantity',
    'quantity',
    // 'current_quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'consigment_yarn_number',
    'document',
    'statement'];
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
        this._wbTransportWaWbRequisitionDetailsService.selectByRequisitionId(params['id']).subscribe((response: any) => {

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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }
}
