import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { WbManufacturingOutputService } from "src/app/services/main/wb/wb-manufacturing-output.service";

// Route
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manufacturing-requisition-output-details-wb',
  templateUrl: './manufacturing-requisition-output-details-wb.component.html',
  styleUrls: ['./manufacturing-requisition-output-details-wb.component.css']
})
export class ManufacturingRequisitionOutputDetailsWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  manufacturingRequisitionDetails: any[] = []
  @Input() data: any
  selectedDataToUpdate: any
  showOutputUpdate = false
  isShowOrder = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'fabric_name',
    'fabric_code',
    'quantity',
    'manufacturing_fee',
    'total_with_wast',
    'total_cost',
    'avg_price',
    // 'circular_knitting_machine_name',
    'consigment_number',
    'warehouse_name',
    'document',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _wbManufacturingOutputService: WbManufacturingOutputService,
    public _exportDataService: ExportDataService,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {

        if (this.router.url.split("?")[0] == '/dashboard/show-all-manufacturing-requisition-wb/order-details') {
          this.isShowOrder = true

          this._wbManufacturingOutputService.selectByRequisitionId(params['id']).subscribe((response: any) => {
            this.manufacturingRequisitionDetails = response
            this.dataSourceSearchTabel = new MatTableDataSource(this.manufacturingRequisitionDetails);
  
            // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
            this.dataSourceSearchTabel.sort = this.sortColumns;
          })
        }
        else if (this.router.url.split("?")[0] == '/dashboard/show-all-manufacturing-requisition-wb/details') {
          this.isShowOrder = false

          this._wbManufacturingOutputService.selectByRequisitionId(params['id']).subscribe((response: any) => {
            this.manufacturingRequisitionDetails = response
            this.dataSourceSearchTabel = new MatTableDataSource(this.manufacturingRequisitionDetails);
  
            // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
            this.dataSourceSearchTabel.sort = this.sortColumns;
          })
        } else {
          this.isShowOrder = false

          // this._manufacturingRequisitionDetailsWbService.selectManufacturingOutputForOrder(params['id'], params['manufacturingOrderRequisitionDetailsId']).subscribe((response: any) => {
          //   this.manufacturingRequisitionDetails = response
          //   this.dataSourceSearchTabel = new MatTableDataSource(this.manufacturingRequisitionDetails);
  
          //   this.dataSourceSearchTabel.sort = this.sortColumns;
          // })
        }
      });

  }

  getSelectedData(selectedData: any) {
    this.showOutputUpdate = true
    if (this.router.url.split("?")[0] == '/dashboard/show-all-manufacturing-requisition-wb/order-details') {
      selectedData.isOrder = "1"
      this.route.queryParams
        .subscribe(params => {
          selectedData.manufacturingOrderRequisitionDetailsId = params['manufacturingOrderRequisitionDetailsId']
        });
    }
    else {
      selectedData.isOrder = "0"
      selectedData.manufacturingOrderRequisitionDetailsId = ""
    }
    this.selectedDataToUpdate = selectedData
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  /** Gets the total quantity of all transactions. */
  totalCost(quantity: string, manufacturingFee: string) {
    return ((parseFloat(quantity) * parseFloat(manufacturingFee)) + this.data)
  }

  avgCost(quantity: string, manufacturingFee: string) {
    return (((parseFloat(quantity) * parseFloat(manufacturingFee)) + this.data) / parseFloat(quantity))
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
