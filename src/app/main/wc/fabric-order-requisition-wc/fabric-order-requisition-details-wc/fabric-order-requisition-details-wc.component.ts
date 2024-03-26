import { Component, OnInit, ViewChild,} from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';

// Call Service
import { FabricOrderRequisitionDetailsWcService } from "src/app/services/main/wc/fabric-order-requisition-details-wc.service";

// Route
import { ActivatedRoute, Router } from '@angular/router';

// Child Components
import { FabricOrderRequisitionUpdateWcComponent } from "../fabric-order-requisition-update-wc/fabric-order-requisition-update-wc.component";

@Component({
  selector: 'app-fabric-order-requisition-details-wc',
  templateUrl: './fabric-order-requisition-details-wc.component.html',
  styleUrls: ['./fabric-order-requisition-details-wc.component.css']
})
export class FabricOrderRequisitionDetailsWcComponent implements OnInit {

  // Child Components
  @ViewChild('updateOrder') updateOrder: FabricOrderRequisitionUpdateWcComponent | undefined;

  /////////////////// Variables ///////////////////
  fabricOrderDetails: any[] = []
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
    'completed_quantity',
    'current_quantity',
    'over_current_quantity',
    'fabric_width',
    'fabric_quantity_m2',
    'note2',
    'close_order',
    // 'open_order',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _fabricOrderRequisitionDetailsWcService: FabricOrderRequisitionDetailsWcService,
    public _exportDataService: ExportDataService,
    private _constantsService: ConstantsService,
    private router: Router

  ) {
    if(this.router.url.split('/')[2] + '/' + this.router.url.split('/')[3].split('?')[0] 
    === this._constantsService.ROUTING_LINKS[181]) {
      this.getData("closed")
    }
    else {
      this.getData()
    }
  }

  ngOnInit(): void {

  }

  getData(isClosed?:string) {
    this.route.queryParams
      .subscribe(params => {
        this._fabricOrderRequisitionDetailsWcService.select(params['id'], isClosed).subscribe((response: any) => {
          this.fabricOrderDetails = response
          
          this.dataSourceSearchTabel = new MatTableDataSource(this.fabricOrderDetails);
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
  }

  openOrder(data) {
    this.showInputUpdate = true
    this.updateOrder?.openOrder(data);
  }

  showAddDetailsFunc() {
    this.showAddDetails = true;
  }
}

