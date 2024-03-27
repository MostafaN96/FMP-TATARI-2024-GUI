import { Component, OnInit, ViewChild,} from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { DyedFabricOrderRequisitionDetailsWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-details-we.service";
import { ConstantsService } from 'src/app/services/constants.service';

// Route
import { ActivatedRoute, Router } from '@angular/router';

// Child Components
import { DyedFabricOrderRequisitionUpdateWeComponent } from "../dyed-fabric-order-requisition-update-we/dyed-fabric-order-requisition-update-we.component";

@Component({
  selector: 'app-dyed-fabric-order-requisition-details-we',
  templateUrl: './dyed-fabric-order-requisition-details-we.component.html',
  styleUrls: ['./dyed-fabric-order-requisition-details-we.component.css']
})
export class DyedFabricOrderRequisitionDetailsWeComponent implements OnInit {

  // Child Components
  @ViewChild('updateOrder') updateOrder: DyedFabricOrderRequisitionUpdateWeComponent | undefined;


  /////////////////// Variables ///////////////////
  dyedFabricOrderDetails: any[] = []
  totalPriceXQuantityWithWast: any
  selectedDataToUpdate: any
  showInputUpdate = false
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'dyed_fabric_name',
    'dyed_fabric_code',
    'quantity',
    'completed_quantity',
    'current_quantity',
    'over_current_quantity',
    'color_category_name',
    'color_name',
    'fabric_width',
    'fabric_quantity_m2',
    'price',
    'price_dollar',
    'note2',
    'close_order',
    // 'open_order',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _dyedFabricOrderRequisitionDetailsWeService: DyedFabricOrderRequisitionDetailsWeService,
    public _exportDataService: ExportDataService,
    private _constantsService: ConstantsService,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    if(this.router.url.split('/')[2] + '/' + this.router.url.split('/')[3].split('?')[0] 
    === this._constantsService.ROUTING_LINKS[190]) {
      this.getData("closed")
    }
    else {
      this.getData()
    }
  }

  getData(isClosed?:string) {
    this.route.queryParams
      .subscribe(params => {
        this._dyedFabricOrderRequisitionDetailsWeService.select(params['id'], isClosed).subscribe((response: any) => {
          this.dyedFabricOrderDetails = response
          
          this.dataSourceSearchTabel = new MatTableDataSource(this.dyedFabricOrderDetails);
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
