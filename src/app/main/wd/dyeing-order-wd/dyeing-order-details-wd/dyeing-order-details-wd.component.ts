import { Component, OnInit, ViewChild,} from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { DyeingOrderDetailsWdService } from "src/app/services/main/wd/dyeing-order-details-wd.service";

// Route
import { ActivatedRoute, Router } from '@angular/router';

// Child Components
import { UpdateDyeingOrderWdComponent } from "../update-dyeing-order-wd/update-dyeing-order-wd.component";

@Component({
  selector: 'app-dyeing-order-details-wd',
  templateUrl: './dyeing-order-details-wd.component.html',
  styleUrls: ['./dyeing-order-details-wd.component.css']
})
export class DyeingOrderDetailsWdComponent implements OnInit {

  // Child Components
  @ViewChild('updateOrder') updateOrder: UpdateDyeingOrderWdComponent | undefined;


  /////////////////// Variables ///////////////////
  dyeingOrderDetails: any[] = []
  totalPriceXQuantityWithWast: any
  selectedDataToUpdate: any
  showInputUpdate = false
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'fabric_name',
    'fabric_code',
    'quantity',
    'current_quantity',
    'dyeing_current_quantity',
    'completed_quantity',
    'color_category_name',
    'color_name',
    'fabric_width',
    'fabric_quantity_m2',
    'details_note',
    'close_order',
    // 'open_order',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _dyeingOrderDetailsWdService: DyeingOrderDetailsWdService,
    public _exportDataService: ExportDataService,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    if(this.router.url.split('/')[3].split('?')[0] === 'closed-details') {
      this.getData("closed")
    }
    else {
      this.getData()
    }
  }

  getData(isClosed?:string) {
    this.route.queryParams
      .subscribe(params => {
        this._dyeingOrderDetailsWdService.select(params['id'], isClosed).subscribe((response: any) => {
          this.dyeingOrderDetails = response
          
          this.dataSourceSearchTabel = new MatTableDataSource(this.dyeingOrderDetails);
          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.showInputUpdate = true
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

  getTotalFormQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.wd_current_quantity).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(function (a) { return parseFloat(a['quantity']) * parseFloat(a['price']) }).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

  // getTotalCost(price: number, quantity: number, services: any, dyeingFee: number, fabricPiece: number) {
  //   let sum = 0

  //   for (let index = 0; index < services.length; index++) {
  //     const element = services[index];
  //     if (element.is_fabric_piece) {
  //       sum = sum + (element.price * fabricPiece)
  //     }
  //     else {
  //       sum = sum + (quantity * element.price)
  //     }
  //   }
  //   sum = sum + (dyeingFee * quantity)
  //   return sum + (price * quantity)
  // }

  // getSumTotalCost() {
  //   let sum = 0
  //   for (let index = 0; index < this.dataSourceSearchTabel?.filteredData.length; index++) {
  //     const element = this.dataSourceSearchTabel?.filteredData[index];
  //     sum = sum + this.getTotalCost(element.price, element.quantity, element.dyeingServices,
  //       element.dyeing_fee, element.fabric_piece)
  //   }
  //   return sum
  // }

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

  closeOrder(data) {
    this.showInputUpdate = true
    this.updateOrder?.closeOrder(data);
    setTimeout(() => {
      this.showInputUpdate = false
    }, 1000);
  }

  openOrder(data) {
    this.showInputUpdate = true
    this.updateOrder?.openOrder(data);
    setTimeout(() => {
      this.showInputUpdate = false
    }, 1000);
  }

  showAddDetailsFunc() {
    this.showAddDetails = true;
  }
}
