import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { TransitionBetweenWhRequisitionDetailsWeService } from "src/app/services/main/we/transition-between-wh-requisition-details-we.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transition-between-wh-requisition-details-we',
  templateUrl: './transition-between-wh-requisition-details-we.component.html',
  styleUrls: ['./transition-between-wh-requisition-details-we.component.css']
})
export class TransitionBetweenWhRequisitionDetailsWeComponent {

/////////////////// Variables ///////////////////
transitionBetweenWhRequisitionDetails: any[] = []
selectedDataToUpdate: any
showInputUpdate = false
showAddDetails = false

//////////////////////////////////// Tabel Angular Material /////////////////////////////////
@ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
displayedColumns: string[] = [
  'index',
  'from_warehouse_name', 
  'dyed_fabric_name', 
  'dyed_fabric_code',
  'color_category_name',
  'color_name',
  'color_code',
  'consigment_dyeing_number',
  'quantity',
  'price',
  'price_dollar',
  'total',
  'total_dollar',
  'fabric_piece',
  'work_order_number',
  'grade_item_name',
  'document',
  'statement',
  'update'];
filter = "";
dataSourceSearchTabel: any;

constructor(
  private route: ActivatedRoute,
  public _sharedComponentService: SharedComponentService,
  private _transitionBetweenWhRequisitionDetailsWeService: TransitionBetweenWhRequisitionDetailsWeService,
  public _exportDataService: ExportDataService,
) {
}

ngOnInit(): void {
  this.getData()
}

getData() {
  this.route.queryParams
    .subscribe(params => {
      this._transitionBetweenWhRequisitionDetailsWeService.selectByRequisitionId(params['id']).subscribe((response: any) => {
        this.transitionBetweenWhRequisitionDetails = response
        this.dataSourceSearchTabel = new MatTableDataSource(this.transitionBetweenWhRequisitionDetails);
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

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
