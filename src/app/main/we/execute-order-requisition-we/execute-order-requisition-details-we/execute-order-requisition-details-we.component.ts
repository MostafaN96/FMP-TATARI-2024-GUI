import { Component, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ExecuteOrderRequisitionDetailsWeService } from "src/app/services/main/we/execute-order-requisition-details-we.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-execute-order-requisition-details-we',
  templateUrl: './execute-order-requisition-details-we.component.html',
  styleUrls: ['./execute-order-requisition-details-we.component.css']
})
export class ExecuteOrderRequisitionDetailsWeComponent implements OnInit {

  /////////////////// Variables ///////////////////
  requisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'dyed_fabric_name',
    'dyed_fabric_code',
    'color_category_name',
    'color_name',
    'consigment_dyeing_number',
    'quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'note',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _executeOrderRequisitionDetailsWeService: ExecuteOrderRequisitionDetailsWeService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._executeOrderRequisitionDetailsWeService.selectOne(params['id']).subscribe((response: any) => {
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


