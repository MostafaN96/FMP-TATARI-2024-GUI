import { Component, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ExecuteOrderRequisitionDetailsWcService } from "src/app/services/main/wc/execute-order-requisition-details-wc.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-execute-order-requisition-details-wc',
  templateUrl: './execute-order-requisition-details-wc.component.html',
  styleUrls: ['./execute-order-requisition-details-wc.component.css']
})
export class ExecuteOrderRequisitionDetailsWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  requisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'fabric_name',
    'fabric_code',
    'consigment_manufacturing_number',
    'quantity',
    'price',
    'total',
    'note',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _executeOrderRequisitionDetailsWcService: ExecuteOrderRequisitionDetailsWcService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._executeOrderRequisitionDetailsWcService.selectOne(params['id']).subscribe((response: any) => {
          this.requisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.requisitionDetails);

          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  showAddDetailsFunc() {
    this.selectedDataToDetails = this.requisitionDetails
    this.showAddDetails = true;
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }
  
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}

