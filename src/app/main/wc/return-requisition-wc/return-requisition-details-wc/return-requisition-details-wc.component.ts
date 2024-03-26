import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';// (PageEvent) get index of table page
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReturnRequisitionDetailsWcService } from "src/app/services/main/wc/return-requisition-details-wc.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-return-requisition-details-wc',
  templateUrl: './return-requisition-details-wc.component.html',
  styleUrls: ['./return-requisition-details-wc.component.css']
})
export class ReturnRequisitionDetailsWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  returnRequisitionDetailsWC: any[] = []
  selectedDataToUpdate: any
  selectedDataToAddDetails: any
  showAddDetails = false
  childData = ""

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  displayedColumns: string[] = [
    'index',
    'fabric_name', 
    'fabric_code',
    'consigment_number',
    'quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _returnRequisitionDetailsWcService: ReturnRequisitionDetailsWcService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._returnRequisitionDetailsWcService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.returnRequisitionDetailsWC = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.returnRequisitionDetailsWC);

          this.childData = this.returnRequisitionDetailsWC[0].supplier_id

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  showAddDetailsFunc() {
    this.selectedDataToAddDetails = this.returnRequisitionDetailsWC[0]
    this.showAddDetails = true;
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

}
