import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { WbManufacturingOutputService } from "src/app/services/main/wb/wb-manufacturing-output.service";
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { FabricService } from "src/app/services/main/fabric.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-fabric-by-consigment-manufacturing-report-wb',
  templateUrl: './fabric-by-consigment-manufacturing-report-wb.component.html',
  styleUrls: ['./fabric-by-consigment-manufacturing-report-wb.component.css']
})
export class FabricByConsigmentManufacturingReportWbComponent implements OnInit {

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;
  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "القماش المراد تصنيعه"

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    predicate = predicate.or('dyeing_code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

  // --------------- Consigment --------------
  // maps the appropriate column to fields property
  public fieldsConsigment: Object = { value: "consigment_manufacturing_id", text: "consigment_number" };
  // set the placeholder to the AutoComplete input
  public textConsigment: string = "رقم الرسالة"

  public onFilteringConsigment(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('consigment_number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigmentsManufacturing, query);
  }

  /////////////////// Variables ///////////////////
  fabrics: any = []
  consigmentsManufacturing: any = []
  data: any = []
  manufacturingRequisitionDetails: any[] = []
  totalPriceXQuantityWithWast: any
  AddedYarns: any = []
  AddedYarnLots: any = []
  sellerName = ""
  orderNumber = ""
  fabricName = ""
  consigmentNumber = ""
  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'yarn_name',
    'yarn_code',
    'yarn_lot_code',
    'percent_quantity',
    'quantity',
    'quantity_with_waste',
    'price',
    'total',
    'wast_ratio',
    'total_with_wast'];
  filter = "";
  dataSourceSearchTabelInput: any;
  dataSourceSearchTabelOutput: any;
  displayedColumns2: string[] = [
    'index',
    'fabric_name',
    'fabric_code',
    'quantity',
    'total_with_wast',
    'total_cost',
    'avg_price',
    'wast_ratio',
    'consigment_number'];
  constructor(
    public _sharedComponentService: SharedComponentService,
    private _wbManufacturingOutputService: WbManufacturingOutputService,
    public _exportDataService: ExportDataService,
    private _fabricService: FabricService,
    private _reportWbService: ReportWbService,

  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._fabricService.selectManufacturedFabricWb().subscribe((response: any) => {
      this.fabrics = response
    })

    // this._wbManufacturingInputService.selectByRequisitionId(params['id']).subscribe((response: any) => {

    //   this.manufacturingRequisitionDetails = response
    //   this.dataSourceSearchTabelInput = new MatTableDataSource(this.manufacturingRequisitionDetails);
    //   this.manufacturingRequisitionDetails.forEach(element => {
    //     this.AddedYarns.push(element.yarn_id)
    //     this.AddedYarnLots.push(element.yarn_lot_id)
    //   });

    //   this.dataSourceSearchTabelInput.sort = this.sortColumns;
    // })

  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  selectFabric(event: { itemData: any; }) {
    let indexData = this.fabrics.indexOf(event.itemData)
    if (this.fabrics[indexData] !== event.itemData) {
      this.fabricName = ""
      this.consigmentsManufacturing = []
    }
    else {
      this.fabricName = event.itemData.name
      this._wbManufacturingOutputService.selectConsigmentManufacturingByFabric(event.itemData.id).subscribe((response: any) => {
        this.consigmentsManufacturing = response
      })
    }
  }

  //  consigmentManufacturing
  selectConsigment(event: { itemData: any; }) {
    let indexData = this.consigmentsManufacturing.indexOf(event.itemData)
    if (this.consigmentsManufacturing[indexData] !== event.itemData) {
      this.consigmentNumber = ""
    } else {
      this.consigmentNumber = event.itemData.consigment_number
      this._reportWbService.selectByFabricByConsigmentManufacturing(event.itemData.fabric_id, event.itemData.consigment_manufacturing_id).subscribe((response: any) => {        
        this.data = response
        console.log("this.data :::: ", this.data);
        
        this.dataSourceSearchTabelInput = new MatTableDataSource(this.data[0]);
        this.dataSourceSearchTabelOutput = new MatTableDataSource(this.data[1]);
      })
    }
  }

  /** Gets the total quantity of all transactions. */
  getRatio(quantity, quantityWithWaste) {
    return ((quantityWithWaste - quantity) / quantity) * 100
  }
  getTotalQuantity() {
    return this.dataSourceSearchTabelInput?.filteredData.map(t => t.quantity).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalQuantityWithWast() {
    return this.dataSourceSearchTabelInput?.filteredData.map(t => t.quantity_with_waste).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalPriceXQuantity() {
    return this.dataSourceSearchTabelInput?.filteredData.map(function (a) { return parseFloat(a['quantity']) * (parseFloat(a['price']) / parseFloat(a['length'])) }).reduce((acc, value) => acc + value, 0);
  }

  getTotalPriceXQuantityWithWast() {
    this.totalPriceXQuantityWithWast = this.dataSourceSearchTabelInput?.filteredData.map(function (a) { return (parseFloat(a['quantity']) * (parseFloat(a['price']) / parseFloat(a['length']))) + ((((parseFloat(a['price']) / parseFloat(a['length'])) * parseFloat(a['quantity'])) * parseFloat(a.wast_ratio)) / 100) }).reduce((acc, value) => acc + value, 0);
    return this.totalPriceXQuantityWithWast
  }

  getPriceXQuantity(price: string, length: string, quantity: string) {
    return (parseFloat(price) / parseFloat(length)) * parseFloat(quantity);
  }


  getTotalWithWast(price: string, length: string, quantity: string, wastRatio: string) {
    return ((parseFloat(price) / parseFloat(length)) * parseFloat(quantity)) + (((parseFloat(price) / parseFloat(length)) * parseFloat(quantity)) * parseFloat(wastRatio) / 100);
  }

  getPercentOfQuantity(quantity) {
    return (parseFloat(quantity) / this.getTotalQuantity()) * 100
  }

  totalCost(quantity: string, manufacturingFee: string) {
    return ((parseFloat(quantity) * parseFloat(manufacturingFee)) + this.totalPriceXQuantityWithWast)
  }

  avgCost(quantity: string, manufacturingFee: string) {
    return (((parseFloat(quantity) * parseFloat(manufacturingFee)) + this.totalPriceXQuantityWithWast) / parseFloat(quantity))
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
