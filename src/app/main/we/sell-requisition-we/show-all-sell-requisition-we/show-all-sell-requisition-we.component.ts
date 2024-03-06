import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { SellRequisitionWeService } from "src/app/services/main/we/sell-requisition-we.service";

@Component({
  selector: 'app-show-all-sell-requisition-we',
  templateUrl: './show-all-sell-requisition-we.component.html',
  styleUrls: ['./show-all-sell-requisition-we.component.css']
})
export class ShowAllSellRequisitionWeComponent implements OnInit {


  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  titlePage = ""
  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['number', 'date', 'seller_name', 'delivery_car_name', 'note', 'details', 'confirm'];
  filter = "";
  dataSourceSearchTabel: any;
  filterSelectObj = [
    {
      name: 'رقم الإذن',
      columnProp: 'number',
      options: []
    }, {
      name: 'العميل',
      columnProp: 'seller_name',
      options: []
    }, {
      name: 'اسم السائق',
      columnProp: 'delivery_car_name',
      options: []
    }
  ]
  filterValues = {};
  startDate: any
  endDate: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _sellRequisitionWeService: SellRequisitionWeService,
    private router: Router

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
    if(this.router.url === '/dashboard/show-all-sell-requisition-direct-we') {
      this.titlePage = "إظهار جميع اذونات التسليم المباشر"
      this.getData("direct");
    }
    else {
      this.displayedColumns.pop()
      this.titlePage = "إظهار جميع اذونات بيع القماش"
      this.getData();
    }

  }

  ngOnInit(): void {
    this.sortColumns.sort(({ id: 'number', start: 'desc'}) as MatSortable);
  }

  getData(isDirect?:string) {
    this._sellRequisitionWeService.selectAll(isDirect).subscribe((response: any) => {
      this.fabrics = response
      this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);

      this.dataSourceSearchTabel.sort = this.sortColumns;

      // Setup Filter
      this._sharedComponentService.setupFilter(response, this.dataSourceSearchTabel, this.filterSelectObj)
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);
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
