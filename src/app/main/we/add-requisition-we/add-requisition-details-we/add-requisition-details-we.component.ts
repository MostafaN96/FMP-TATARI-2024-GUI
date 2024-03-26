import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { WeAddRequisitionDetailsService } from "src/app/services/main/we/we-add-requisition-details.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-requisition-details-we',
  templateUrl: './add-requisition-details-we.component.html',
  styleUrls: ['./add-requisition-details-we.component.css']
})
export class AddRequisitionDetailsWeComponent implements OnInit {


  /////////////////// Variables ///////////////////
  addRequisitionDetails: any[] = []
  hideItemHistory = false
  selectedDataToUpdate: any
  showInputUpdate = false
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['index',
  'warehouse_name',
  'dyed_fabric_name','dyed_fabric_code',
  'color_category_name',
  'color_name',
  'color_code',
  'dyeing_code',
  'consigment_dyeing_number',
  'work_order_number_details',
  'quantity',
  'price',
  'price_dollar',
  'total', 
  'total_dollar', 
  'fabric_piece',
  'storage_place', 
  'document',
  'statement',
  'update',
  'report'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _weAddRequisitionDetailsService: WeAddRequisitionDetailsService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
    if(location.pathname.split('/')[2] == 'show-all-add-requisition-we') {
      this.hideItemHistory = true
      this.displayedColumns.pop()
    }    

  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._weAddRequisitionDetailsService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          
          this.addRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.addRequisitionDetails);

          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
    this.showInputUpdate = true
  }

  showAddDetailsFunc() {
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

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(function(a) {return parseFloat(a.quantity) * parseFloat(a['price'])}).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
