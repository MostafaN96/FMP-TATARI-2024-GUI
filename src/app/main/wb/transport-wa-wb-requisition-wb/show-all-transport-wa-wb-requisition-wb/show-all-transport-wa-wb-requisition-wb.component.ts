import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";

// Call Service
import { TransportWaWbService } from "../../../../services/main/wb/transport-wa-wb-requisition-wb.service";

@Component({
  selector: 'app-show-all-transport-wa-wb-requisition-wb',
  templateUrl: './show-all-transport-wa-wb-requisition-wb.component.html',
  styleUrls: ['./show-all-transport-wa-wb-requisition-wb.component.css']
})
export class ShowAllTransportWaWbRequisitionWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['number', 'date', 'warehouse_name', 'note', 'details'];
  filter = "";
  dataSourceSearchTabel: any;
  filterSelectObj = [
    {
      name: 'رقم الإذن',
      columnProp: 'number',
      options: []
    }
  ]
  filterValues = {};
  startDate: any
  endDate: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _transportWaWbService: TransportWaWbService,
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.sortColumns.sort(({ id: 'number', start: 'desc'}) as MatSortable);
  }

  getData() {
    this._transportWaWbService.selectAll().subscribe((response: any) => {
      this.yarns = response
      this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);

      this.dataSourceSearchTabel.sort = this.sortColumns;

      // Setup Filter
      this._sharedComponentService.setupFilter(response, this.dataSourceSearchTabel, this.filterSelectObj)
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);
    this.sortColumns.sort(({ id: 'number', start: 'desc'}) as MatSortable);
    this.dataSourceSearchTabel.sort = this.sortColumns;
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  // Reset table filters
  resetFilters(filterSelectObj) {
    this.filterValues = {}
    filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSourceSearchTabel.filter = "";
    this.startDate = null
    this.endDate = null
    this.getData();
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
