import { Component, Inject, OnInit, ViewChild, } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { DyeingRequisitionDetailsWdService } from "src/app/services/main/wd/dyeing-requisition-details-wd.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dyeing-requisition-details-wd',
  templateUrl: './dyeing-requisition-details-wd.component.html',
  styleUrls: ['./dyeing-requisition-details-wd.component.css']
})

export class DyeingRequisitionDetailsWdComponent implements OnInit {

  dyeingId: string = ""
  selectedDataToAddDetails: any

  /////////////////// Variables ///////////////////
  dyeingRequisitionDetails: any[] = []
  totalPriceXQuantityWithWast: any
  selectedDataToUpdate: any
  showInputUpdate = false
  showDyeingServciesUpdate = false
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'we_fabric_order_requisition_name',
    'fabric_name',
    'fabric_code',
    'fabric_dyeing_code',
    'consigment_dyeing_number',
    'quantity',
    'dyeing_quantity',
    'fabric_piece',
    'price',
    'total',
    'color_category_name',
    'color_name',
    'color_code',
    'dyeing_fee',
    'added_cost',
    'dyeing_services',
    'dyeing_cost',
    'total_cost',
    'work_order_number',
    'form_dyeing_requisition',
    'update',
    'update_services'];
  displayedColumns2: string[] = [
    'index',
    'fabric_name',
    'fabric_code',
    'dyeing_quantity',
    'total_cost',
    'avg_price',
    'wast',
    'fabric_width',
    'fabric_quantity_m2',
    'grade_item_name',

  ];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _dyeingRequisitionDetailsWdService: DyeingRequisitionDetailsWdService,
    public _exportDataService: ExportDataService,
    private _constantsService: ConstantsService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._dyeingRequisitionDetailsWdService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.dyeingRequisitionDetails = response

          this.dataSourceSearchTabel = new MatTableDataSource(this.dyeingRequisitionDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any, showUpdate: any) {
    if (showUpdate == 'showInputUpdate') {
      this.showInputUpdate = true
      this.showDyeingServciesUpdate = false
    }
    else if (showUpdate == 'showDyeingServciesUpdate') {

      this.showInputUpdate = false
      this.showDyeingServciesUpdate = true
      selectedData.wd_dyeing_requisition_details_id = selectedData?.wd_dyeing_requisition_details_id
      selectedData.id = selectedData?.wd_form_dyeing_requisition_details_id
    }
    this.selectedDataToUpdate = selectedData
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  /** Gets the total quantity of all transactions. */
  getTotalQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.quantity).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabel?.filteredData?.map(function (a) { return parseFloat(a['quantity']) * parseFloat(a['price']) }).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

  getWast(quantity: number, dyeingQuantity: number) {
    let result = quantity - dyeingQuantity
    return (result / quantity) * 100
  }

  getTotalDyeingQuantity() {
    return this.dataSourceSearchTabel?.filteredData?.map(t => t.dyeing_quantity).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalFabricPiece() {
    return this.dataSourceSearchTabel?.filteredData?.map(t => t.fabric_piece).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////
  showAddDetailsFunc() {
    this.route.queryParams
      .subscribe(params => {
        this.selectedDataToAddDetails = (this.dyeingRequisitionDetails[0] == undefined) ? { dyeing_id: params['dyeingid'] } : this.dyeingRequisitionDetails[0]
      });
    this.showAddDetails = true;
  }
}
