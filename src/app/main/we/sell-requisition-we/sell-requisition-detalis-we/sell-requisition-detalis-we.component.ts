import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { SellRequisitionDetalisWeService } from "src/app/services/main/we/sell-requisition-detalis-we.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sell-requisition-detalis-we',
  templateUrl: './sell-requisition-detalis-we.component.html',
  styleUrls: ['./sell-requisition-detalis-we.component.css']
})
export class SellRequisitionDetalisWeComponent implements OnInit {


  /////////////////// Variables ///////////////////
  sellRequisitionDetails: any[] = []
  selectedDataToUpdate: any
  showInputUpdate = false
  showAddDetails = false
  
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
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._sellRequisitionDetalisWeService.selectByRequisitionId(params['id']).subscribe((response: any) => {
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
  
    getPriceXQuantity(price: string, quantity: string) {
      return parseFloat(price) * parseFloat(quantity);
    }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
