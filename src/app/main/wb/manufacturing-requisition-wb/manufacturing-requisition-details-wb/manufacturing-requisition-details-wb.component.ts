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
import { WbManufacturingInputService } from "src/app/services/main/wb/wb-manufacturing-input.service";

// Route
import { ActivatedRoute, Router } from '@angular/router';

// Child Component
import { ManufacturingRequisitionOutputDetailsWbComponent } from './manufacturing-requisition-output-details-wb/manufacturing-requisition-output-details-wb.component';

@Component({
  selector: 'app-manufacturing-requisition-details-wb',
  templateUrl: './manufacturing-requisition-details-wb.component.html',
  styleUrls: ['./manufacturing-requisition-details-wb.component.css']
})
export class ManufacturingRequisitionDetailsWbComponent implements OnInit {

  // Child Component
  @ViewChild('ManufacturingRequisitionOutputDetailsWb')ManufacturingRequisitionOutputDetailsWb!:ManufacturingRequisitionOutputDetailsWbComponent;
  
  /////////////////// Variables ///////////////////
  manufacturingRequisitionDetails: any[] = []
  totalPriceXQuantityWithWast: any
  totalPriceXQuantityWithWastDollar: any
  selectedDataToUpdate: any
  showInputUpdate = false
  showAddDetails = false
  parentData: any = []
  AddedYarns: any = []
  AddedYarnLots: any = []
  AddedConsigmentsYarn: any = []
  sellerName = ""
  orderNumber = ""
  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'yarn_name',
    'yarn_code',
    'yarn_lot_code',
    'consigment_yarn_number',
    'percent_quantity',
    'quantity',
    'quantity_with_waste',
    'price',
    'price_dollar',
    'total',
    'total_dollar',
    'wast_ratio',
    'total_with_wast',
    'total_with_wast_dollar',
    'statement',
    'update'];
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
    private _wbManufacturingInputService: WbManufacturingInputService,
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
        this._wbManufacturingInputService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          
          this.manufacturingRequisitionDetails = response
          this.dataSourceSearchTabel = new MatTableDataSource(this.manufacturingRequisitionDetails);
          this.manufacturingRequisitionDetails.forEach(element => {
            this.AddedYarns.push(element.yarn_id)
            this.AddedYarnLots.push(element.yarn_lot_id)
            this.AddedConsigmentsYarn.push(element.consigment_yarn_id)
          });

          this.dataSourceSearchTabel.sort = this.sortColumns;


          if(!this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[9])) {
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

  getTotalQuantityWithWast() {
    return this.dataSourceSearchTabel?.filteredData.map(t => t.quantity_with_waste).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabel?.filteredData.map(function (a) { return parseFloat(a['quantity']) * parseFloat(a['price']) }).reduce((acc, value) => acc + value, 0);
  }

  getTotalPriceXQuantityWithWast() {
    this.totalPriceXQuantityWithWast = this.dataSourceSearchTabel?.filteredData.map(function (a) { return (parseFloat(a['quantity']) * parseFloat(a['price'])) + (((parseFloat(a['price']) * parseFloat(a['quantity'])) * parseFloat(a.wast_ratio)) / 100) }).reduce((acc, value) => acc + value, 0);
    return this.totalPriceXQuantityWithWast
  }

  getTotalPriceXQuantityWithWastDollar() {
    this.totalPriceXQuantityWithWastDollar = this.dataSourceSearchTabel?.filteredData.map(function (a) { return (parseFloat(a['quantity']) * parseFloat(a['price_dollar'])) + (((parseFloat(a['price_dollar']) * parseFloat(a['quantity'])) * parseFloat(a.wast_ratio)) / 100) }).reduce((acc, value) => acc + value, 0);
    return this.totalPriceXQuantityWithWastDollar
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }


  getTotalWithWast(price: string, quantity: string, wastRatio: string) {
    return (parseFloat(price) * parseFloat(quantity)) + ((parseFloat(price) * parseFloat(quantity)) * parseFloat(wastRatio) / 100);
  }

  getPercentOfQuantity(quantity) {
    return (parseFloat(quantity) / this.getTotalQuantity()) * 100
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////
  showAddDetailsFunc() {
    this.showAddDetails = true;
    this.parentData = [this.manufacturingRequisitionDetails[0].manufacturer_id,
    this.ManufacturingRequisitionOutputDetailsWb.manufacturingRequisitionDetails[0].fabric_id,
    this.ManufacturingRequisitionOutputDetailsWb.manufacturingRequisitionDetails[0].id,
    this.AddedYarns,
    this.AddedYarnLots,
    this.manufacturingRequisitionDetails[0].is_order,
    this.AddedConsigmentsYarn
    ]
  }
}
