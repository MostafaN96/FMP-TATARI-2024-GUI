import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReturnRequisitionDetailsWeService } from "src/app/services/main/we/return-requisition-details-we.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-return-requisition-details-we',
  templateUrl: './return-requisition-details-we.component.html',
  styleUrls: ['./return-requisition-details-we.component.css']
})
export class ReturnRequisitionDetailsWeComponent implements OnInit {

  /////////////////// Variables ///////////////////
  returnRequisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showInputUpdate = false
  showAddDetails = false
  supplierId:string = ""

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'warehouse_name', 
    'dyed_fabric_name', 
    'dyed_fabric_code',
    'color_category_name',
    'color_name', 
    'color_code',
    'quantity',
    'price',
    'total',
    'fabric_piece',
    'work_order_number',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _returnRequisitionDetailsWeService: ReturnRequisitionDetailsWeService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._returnRequisitionDetailsWeService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.returnRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.returnRequisitionDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
    this.showInputUpdate = true
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

    /** Gets the total quantity of all transactions. */
    getTotalQuantity() {
      return this.dataSourceSearchTabel?.filteredData?.map(t => t.quantity).reduce((acc, value) => parseFloat(acc)  + parseFloat(value), 0);
    }
  
    getTotalPriceXQuantity() {
      return this.dataSourceSearchTabel?.filteredData?.map(function(a) {return parseFloat(a['quantity']) * parseFloat(a['price'])}).reduce((acc, value) => acc + value, 0);
    }
  
    getPriceXQuantity(price: string, quantity: string) {
      return parseFloat(price) * parseFloat(quantity);
    }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  showAddDetailsFunc() {
    this.showAddDetails = true;
    this.selectedDataToDetails = this.returnRequisitionDetails
  }
}
