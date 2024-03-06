import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";
import { ExportDataService } from "../../../../services/export-data.service";

// Call Service
import { TransportWdWcRequisitionDetailsWdService } from "../../../../services/main/wd/transport-wd-wc-requisition-details-wd.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transport-details-wd-wc-requisition-wd',
  templateUrl: './transport-details-wd-wc-requisition-wd.component.html',
  styleUrls: ['./transport-details-wd-wc-requisition-wd.component.css']
})
export class TransportDetailsWdWcRequisitionWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  transportWdWcRequisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToAddDetails: any
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'fabric_name', 
    'fabric_code',
    'dyeing_code',
    'consigment_manufacturing_number',
    'quantity',
    'price',
    'document',
    'statement',
  'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _transportWdWcRequisitionDetailsWdService: TransportWdWcRequisitionDetailsWdService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._transportWdWcRequisitionDetailsWdService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.transportWdWcRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.transportWdWcRequisitionDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  showAddDetailsFunc() {
    this.selectedDataToAddDetails = this.transportWdWcRequisitionDetails[0]
    this.showAddDetails = true;
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

    /** Gets the total quantity of all transactions. */
    getTotalQuantity() {
      return this.dataSourceSearchTabel?.filteredData.map(t => t.quantity).reduce((acc, value) => parseFloat(acc)  + parseFloat(value), 0);
    }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
