import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { WdTransitionBetweenDyersRequisitionDetailsService } from "src/app/services/main/wd/wd-transition-between-dyers-requisition-details.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transition-between-dyers-details-wd',
  templateUrl: './transition-between-dyers-details-wd.component.html',
  styleUrls: ['./transition-between-dyers-details-wd.component.css']
})
export class TransitionBetweenDyersDetailsWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  transitionBetweenDyersDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'fabric_name', 
    'fabric_code',
    'dyeing_code',
    'consigment_dyeing_number',
    'quantity',
    'price',
    'total',
    'document',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _wdTransitionBetweenDyersRequisitionDetailsService: WdTransitionBetweenDyersRequisitionDetailsService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._wdTransitionBetweenDyersRequisitionDetailsService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          
          this.transitionBetweenDyersDetails = response
          
          this.dataSourceSearchTabel = new MatTableDataSource(this.transitionBetweenDyersDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  showAddDetailsFunc() {
    this.selectedDataToDetails = this.transitionBetweenDyersDetails
    this.showAddDetails = true;
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
    return this.dataSourceSearchTabel?.filteredData.map(function(a) {return parseFloat(a.quantity) * parseFloat(a['price'])}).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
