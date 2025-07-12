import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { WcAddRequisitionDetailsService } from "src/app/services/main/wc/wc-add-requisition-details.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-requisition-details-by-order-wc',
  templateUrl: './add-requisition-details-by-order-wc.component.html',
  styleUrls: ['./add-requisition-details-by-order-wc.component.css']
})
export class AddRequisitionDetailsByOrderWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  addRequisitionDetails: any[] = []
  hideItemHistory = false
  selectedDataToUpdate: any
  selectedDataToAddDetails: any
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'warehouse_name',
    'fabric_name', 
    'fabric_code',
    'fabric_piece',
    'quantity',
    'price',
    'total',
    'consigment_number',
    'document',
    'statement',
    'update',
  'report'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _wcAddRequisitionDetailsService: WcAddRequisitionDetailsService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
    if(location.pathname.split('/')[2] == 'show-all-add-requisition-wc') {
      this.hideItemHistory = true
      this.displayedColumns.pop()
    }    

  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._wcAddRequisitionDetailsService.selectByRequisitionIdForOrder(params['id']).subscribe((response: any) => {
          
          this.addRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.addRequisitionDetails);
          
          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  showAddDetailsFunc() {
    this.showAddDetails = true;
    this.selectedDataToAddDetails = this.addRequisitionDetails[0]
  }
  
  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}

