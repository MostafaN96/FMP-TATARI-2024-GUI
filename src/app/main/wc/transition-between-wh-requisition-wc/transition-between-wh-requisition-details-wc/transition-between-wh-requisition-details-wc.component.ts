import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { TransitionBetweenWhRequisitionDetailsWcService } from "src/app/services/main/wc/transition-between-wh-requisition-details-wc.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transition-between-wh-requisition-details-wc',
  templateUrl: './transition-between-wh-requisition-details-wc.component.html',
  styleUrls: ['./transition-between-wh-requisition-details-wc.component.css']
})
export class TransitionBetweenWhRequisitionDetailsWcComponent implements OnInit {

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
  'fabric_name', 
  'fabric_code',
  'consigment_manufacturing_number',
  'fabric_piece',
  'quantity',
  'price',
  'price_dollar',
  'total',
  'total_dollar',
  'document',
  'statement',
  'update'];
filter = "";
dataSourceSearchTabel: any;

constructor(
  private route: ActivatedRoute,
  public _sharedComponentService: SharedComponentService,
  private _transitionBetweenWhRequisitionDetailsWcService: TransitionBetweenWhRequisitionDetailsWcService,
  public _exportDataService: ExportDataService,
  private _constantsService: ConstantsService,
  private _sessionManagerService: SessionManagerService,
) {
}

ngOnInit(): void {
  this.getData()
}

getData() {
  this.route.queryParams
    .subscribe(params => {
      this._transitionBetweenWhRequisitionDetailsWcService.selectByRequisitionId(params['id']).subscribe((response: any) => {
        this.transitionBetweenWhRequisitionDetails = response
        this.dataSourceSearchTabel = new MatTableDataSource(this.transitionBetweenWhRequisitionDetails);
        // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
        this.dataSourceSearchTabel.sort = this.sortColumns;

        if(!this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[13])) {
          let index = this.displayedColumns.indexOf('price');
          this.displayedColumns.splice(index, 1);
          index = this.displayedColumns.indexOf('price_dollar');
          this.displayedColumns.splice(index, 1);
          index = this.displayedColumns.indexOf('total');
          this.displayedColumns.splice(index, 1);
          index = this.displayedColumns.indexOf('total_dollar');
          this.displayedColumns.splice(index, 1);
        }

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

///////////////////// ----------- End Search Tabel ----------- /////////////////////

}

