import { Component, Inject, OnInit, ViewChild,} from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { FormDyeingRequisitionDetailsWdService } from "src/app/services/main/wd/form-dyeing-requisition-details-wd.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-dyeing-requisition-details-wd',
  templateUrl: './form-dyeing-requisition-details-wd.component.html',
  styleUrls: ['./form-dyeing-requisition-details-wd.component.css']
})
export class FormDyeingRequisitionDetailsWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  dyeingRequisitionDetails: any[] = []
  totalPriceXQuantityWithWast: any
  selectedDataToUpdate: any
  selectedDataToAddDetails: any
  showInputUpdate = false
  showDyeingServciesUpdate = false
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'fabric_name',
    'fabric_code',
    'fabric_dyeing_code',
    'consigment_dyeing_number',
    'quantity',
    'wd_current_quantity',
    // 'fabric_piece',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'color_category_name',
    'color_name',
    'color_code',
    'dyeing_services',
    'document',
    'update',
    'update_services'];
  displayedColumns2: string[] = [
    'index',
    'fabric_name',
    'fabric_code',
    'fabric_width',
    'fabric_quantity_m2'
  ];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _formDyeingRequisitionDetailsWdService: FormDyeingRequisitionDetailsWdService,
    public _exportDataService: ExportDataService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._formDyeingRequisitionDetailsWdService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.dyeingRequisitionDetails = response
          
          this.dataSourceSearchTabel = new MatTableDataSource(this.dyeingRequisitionDetails);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any , showUpdate:any) {
   if(showUpdate == 'showInputUpdate') {
     this.showInputUpdate = true
     this.showDyeingServciesUpdate = false
   }
   else if (showUpdate == 'showDyeingServciesUpdate') {
    this.showInputUpdate = false
     this.showDyeingServciesUpdate = true
   }
    this.selectedDataToUpdate = selectedData
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  showAddDetailsFunc() {
    this.selectedDataToAddDetails = this.dyeingRequisitionDetails[0]
    this.showAddDetails = true;
  }

  /** Gets the total quantity of all transactions. */
  getTotalQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.quantity).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalFormQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.wd_current_quantity).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(function (a) { return parseFloat(a['quantity']) * parseFloat(a['price']) }).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

  getWast(quantity: number, dyeingQuantity: number) {
    let result = quantity - dyeingQuantity
    return (result / quantity) * 100
  }

  getTotalDyeingQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.dyeing_quantity).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalFabricPiece() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.fabric_piece).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
