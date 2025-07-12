import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { WbTransitionBetweenIndustriesRequisitionDetailsService } from "src/app/services/main/wb/wb-transition-between-industries-requisition-details.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transition-between-industries-details-wb',
  templateUrl: './transition-between-industries-details-wb.component.html',
  styleUrls: ['./transition-between-industries-details-wb.component.css']
})
export class TransitionBetweenIndustriesDetailsWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  transitionBetweenIndustriesDetails: any[] = []
  selectedDataToUpdate: any
  showInputUpdate = false
  showAddDetails = false
  parentData:any = []
  addedYarnsLots:any = []

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'yarn_name', 
    'yarn_code',
    'yarn_lot_code',
    'consigment_yarn_number',
    'quantity',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'yarn_order_requisitions',
    'document',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _wbTransitionBetweenIndustriesRequisitionDetailsService: WbTransitionBetweenIndustriesRequisitionDetailsService,
    public _exportDataService: ExportDataService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._wbTransitionBetweenIndustriesRequisitionDetailsService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          
          this.transitionBetweenIndustriesDetails = response
          this.transitionBetweenIndustriesDetails.forEach(element => {
            this.addedYarnsLots.push(element.yarn_lot_id)
          });

          this.dataSourceSearchTabel = new MatTableDataSource(this.transitionBetweenIndustriesDetails);

          // this.sortColumns.sort(({ id: 'number', start: 'asc' }) as MatSortable);
          this.dataSourceSearchTabel.sort = this.sortColumns;

          if(!this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[7])) {
            let index = this.displayedColumns.indexOf('price');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('price_dollar');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('total');
            this.displayedColumns.splice(index, 1);
            index = this.displayedColumns.indexOf('total_dollar');
            this.displayedColumns.splice(index, 1);
          }
          
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
    this.showInputUpdate = true;
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  /** Gets the total quantity of all transactions. */
  getTotalQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.quantity).reduce((acc, value) => parseFloat(acc)  + parseFloat(value), 0);
  }

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(function(a) {return parseFloat(a.quantity) * parseFloat(a['price'])}).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  showAddDetailsFunc() {
    this.showAddDetails = true;
    this.parentData = [this.transitionBetweenIndustriesDetails[0].from_industry_id,
    this.transitionBetweenIndustriesDetails[0].to_industry_id,
  this.addedYarnsLots]
  }

  
  goToRequisitionPage(typeOfRequisition, element?) {
    if (typeOfRequisition == 'اذن نقل من (A) الى (B)') {
      return `/dashboard/show-all-transport-wa-wb-requisition/details`
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `/dashboard/show-all-reconciliation-requisition-wb/details`
    }
    else if (typeOfRequisition == 'اذن تصنيع' && element?.is_order != '1') {
      return `/dashboard/show-all-manufacturing-requisition-wb/details`
    }
    else if (typeOfRequisition == 'اذن تصنيع' && element?.is_order == '1') {
      return `/dashboard/show-all-manufacturing-order-requisition-wb/order-details`
    }
    else if (typeOfRequisition == 'اذن نقل بين المصانع') {
      return `/dashboard/show-all-transport-between-industries-requisition/details`
    }
    return
  }
}
