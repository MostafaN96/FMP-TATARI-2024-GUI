import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReturnRequisitionDetailsWaService } from "src/app/services/main/wa/return-requisition-details-wa.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-return-requisition-details-wa',
  templateUrl: './return-requisition-details-wa.component.html',
  styleUrls: ['./return-requisition-details-wa.component.css']
})
export class ReturnRequisitionDetailsWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  returnRequisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false
  childData = ""

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
    private _returnRequisitionDetailsWaService: ReturnRequisitionDetailsWaService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._returnRequisitionDetailsWaService.selectOne(params['id']).subscribe((response: any) => {
          this.returnRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.returnRequisitionDetails);

          this.childData = params['supplierId']

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  showAddDetailsFunc() {
    this.selectedDataToDetails = this.returnRequisitionDetails
    this.showAddDetails = true;
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

}
