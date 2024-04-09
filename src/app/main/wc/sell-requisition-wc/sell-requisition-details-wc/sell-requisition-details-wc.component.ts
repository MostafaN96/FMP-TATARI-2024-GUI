import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { SellRequisitionDetailsWcService } from "src/app/services/main/wc/sell-requisition-details-wc.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sell-requisition-details-wc',
  templateUrl: './sell-requisition-details-wc.component.html',
  styleUrls: ['./sell-requisition-details-wc.component.css']
})
export class SellRequisitionDetailsWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  sellRequisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToAddDetails: any
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'fabric_name', 
    'fabric_code',
    'consigment_manufacturing_number',
    'fabric_piece',
    'quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'document',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _sellRequisitionDetailsWcService: SellRequisitionDetailsWcService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._sellRequisitionDetailsWcService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.sellRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.sellRequisitionDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  showAddDetailsFunc() {
    this.selectedDataToAddDetails = this.sellRequisitionDetails[0]
    this.showAddDetails = true;
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
