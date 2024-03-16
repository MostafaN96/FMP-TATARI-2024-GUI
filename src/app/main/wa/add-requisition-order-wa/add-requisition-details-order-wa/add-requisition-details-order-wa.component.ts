import { Component, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ExecuteOrderRequisitionDetailsWaService } from "src/app/services/main/wa/execute-order-requisition-details-wa.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-requisition-details-order-wa',
  templateUrl: './add-requisition-details-order-wa.component.html',
  styleUrls: ['./add-requisition-details-order-wa.component.css']
})
export class AddRequisitionDetailsOrderWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  requisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'yarn_name',
    'yarn_code',
    'yarn_lot_code',
    'consigment_yarn_number',
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
    private _executeOrderRequisitionDetailsWaService: ExecuteOrderRequisitionDetailsWaService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._executeOrderRequisitionDetailsWaService.selectOne(params['id']).subscribe((response: any) => {
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

