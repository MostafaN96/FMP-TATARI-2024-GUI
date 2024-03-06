import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";
import { ExportDataService } from "../../../../services/export-data.service";

// Call Service
import { SellRequisitionDetalisWeService } from "../../../../services/main/we/sell-requisition-detalis-we.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sell-requisition-direct-details-we',
  templateUrl: './sell-requisition-direct-details-we.component.html',
  styleUrls: ['./sell-requisition-direct-details-we.component.css']
})
export class SellRequisitionDirectDetailsWeComponent implements OnInit {

  /////////////////// Variables ///////////////////
  sellRequisitionDetails: any[] = []
  selectedDataToUpdate: any
  showAddDetails = false
  showInputUpdate = false

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
    // 'price',
    // 'total',
    'fabric_piece',
    'work_order_number',
    'document',
    'statement',
  'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _sellRequisitionDetalisWeService: SellRequisitionDetalisWeService,
    public _exportDataService: ExportDataService,
  ) {
    this.getData()
  }

  ngOnInit(): void {

  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._sellRequisitionDetalisWeService.selectByRequisitionId(params['id'], "direct").subscribe((response: any) => {
          
          this.sellRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.sellRequisitionDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
    this.showInputUpdate = true;
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
  
    // getTotalPriceXQuantity() {
    //   return this.dataSourceSearchTabel?.filteredData.map(function(a) {return parseFloat(a['quantity']) * parseFloat(a['price'])}).reduce((acc, value) => {acc + value}, 0);
    // }
  
    // getPriceXQuantity(price: string, quantity: string) {
    //   return parseFloat(price) * parseFloat(quantity);
    // }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
