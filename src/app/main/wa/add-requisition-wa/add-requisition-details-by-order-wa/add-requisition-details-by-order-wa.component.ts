import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';// (PageEvent) get index of table page
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { WaAddRequisitionDetailsService } from "src/app/services/main/wa/wa-add-requisition-details.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-requisition-details-by-order-wa',
  templateUrl: './add-requisition-details-by-order-wa.component.html',
  styleUrls: ['./add-requisition-details-by-order-wa.component.css']
})
export class AddRequisitionDetailsByOrderWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  addRequisitionDetails: any[] = []
  hideItemHistory = false
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false
  
  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  displayedColumns: string[] = [
    'index',
    'warehouse_name',
    'yarn_name', 
    'yarn_code',
    'yarn_lot_code',
    'consigment_yarn_number',
    'quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'document',
    'statement',
    'update',
  'report'];
  filter = "";
  dataSourceSearchTabel: any;
  public searchValue: any = {};
  
  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _waAddRequisitionDetailsService: WaAddRequisitionDetailsService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
    if(location.pathname.split('/')[2] == 'show-all-add-requisition') {
      this.hideItemHistory = true
      this.displayedColumns.pop()
    }    

  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._waAddRequisitionDetailsService.selectByRequisitionIdForOrder(params['id']).subscribe((response: any) => {
          
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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  /** Gets the total quantity of all transactions. */
  getTotalQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.quantity).reduce((acc, value) => parseFloat(acc)  + parseFloat(value), 0);
  }

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(function(a) {return parseFloat(a['quantity']) * parseFloat(a['price'])}).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

  showAddDetailsFunc() {
    this.selectedDataToDetails = this.addRequisitionDetails
    this.showAddDetails = true;
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}

