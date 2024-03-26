import { Component, OnInit, ViewChild,} from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { YarnOrderRequisitionDetailsWaService } from "src/app/services/main/wa/yarn-order-requisition-details-wa.service";
import { ConstantsService } from 'src/app/services/constants.service';

// Route
import { ActivatedRoute, Router } from '@angular/router';

// Child Components
import { YarnOrderRequisitionUpdateWaComponent } from "../yarn-order-requisition-update-wa/yarn-order-requisition-update-wa.component";

@Component({
  selector: 'app-yarn-order-requisition-details-wa',
  templateUrl: './yarn-order-requisition-details-wa.component.html',
  styleUrls: ['./yarn-order-requisition-details-wa.component.css']
})
export class YarnOrderRequisitionDetailsWaComponent implements OnInit {

  // Child Components
  @ViewChild('updateOrder') updateOrder: YarnOrderRequisitionUpdateWaComponent | undefined;

  /////////////////// Variables ///////////////////
  manufacturingOrderDetails: any[] = []
  totalPriceXQuantityWithWast: any
  selectedDataToUpdate: any
  showInputUpdate = false
  showAddDetails = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'yarn_name',
    'yarn_code',
    'quantity',
    'completed_quantity',
    'current_quantity',
    'over_current_quantity',
    'note2',
    'close_order',
    // 'open_order',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _yarnOrderRequisitionDetailsWaService: YarnOrderRequisitionDetailsWaService,
    public _exportDataService: ExportDataService,
    private _constantsService: ConstantsService,
    private router: Router

  ) {    
    if(this.router.url.split('/')[2] + '/' + this.router.url.split('/')[3].split('?')[0] 
    === this._constantsService.ROUTING_LINKS[175]) {
      
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
        this._yarnOrderRequisitionDetailsWaService.select(params['id'], isClosed).subscribe((response: any) => {
          this.manufacturingOrderDetails = response
          
          this.dataSourceSearchTabel = new MatTableDataSource(this.manufacturingOrderDetails);
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

