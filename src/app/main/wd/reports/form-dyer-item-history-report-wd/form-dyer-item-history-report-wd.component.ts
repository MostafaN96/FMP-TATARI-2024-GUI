import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";
import { ExportDataService } from "../../../../services/export-data.service";

// Call Service
import { ReportWdService } from "../../../../services/main/wd/report-wd.service";

@Component({
  selector: 'app-form-dyer-item-history-report-wd',
  templateUrl: './form-dyer-item-history-report-wd.component.html',
  styleUrls: ['./form-dyer-item-history-report-wd.component.css']
})
export class FormDyerItemHistoryReportWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = [
    'index',
    'dyeing_name', 
    'code', 
    'dyeing_code', 
    'name', 
    'current_quantity', 
    'form_current_quantity',
    'dyeing_current_quantity',
    'now_current_quantity'
];
  filter = "";
  dataSourceSearchTabel: any;
  filterSelectObj = [
    {
      name: 'المصبغة',
      columnProp: 'dyeing_name',
      options: []
    }, {
      name: 'كود المادة',
      columnProp: 'code',
      options: []
    }, {
      name: 'كود المصبغة',
      columnProp: 'dyeing_code',
      options: []
    }
  ]
  filterValues = {};

  constructor(
    public _sharedComponentService: SharedComponentService,
    // private _yarnService: YarnService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
    this.getData();
  }

  ngOnInit(): void {
    
  }

  getData() {
    this._reportWdService.selectInverntoryFormFabricByDyeing().subscribe((response: any) => {
      this.fabrics = response
      
      this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);
      this.sortColumns.sort(({ id: 'code', start: 'asc'}) as MatSortable);
      this.dataSourceSearchTabel.sort = this.sortColumns;

      // Setup Filter
      this._sharedComponentService.setupFilter(response, this.dataSourceSearchTabel, this.filterSelectObj)
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  // Reset table filters
  resetFilters(filterSelectObj) {
    this.filterValues = {}
    filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSourceSearchTabel.filter = "";
    this.getData();
  }

  notZero(n) {
    n = +n;  // Coerce to number.
    if (!n) {  // Matches +0, -0, NaN
      n = 1
    }
    return n;
  }

  getTotalAmountQuantityInput(fabrics) {
    return fabrics.details?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getTotalAmountQuantityOutput(fabrics) {
    return fabrics.details?.map(function (a) { return (a.input_output == '0') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount(fabrics) {
    return fabrics.details?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getOutputAmount(fabrics) {
    return fabrics.details?.map(function (a) { return (a.input_output == '0') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }
  
  getItemAmount(fabrics) {
    return this.getInputAmount(fabrics) - this.getOutputAmount(fabrics)
  }

  getAvgPrice(fabrics) {
    return this.getItemAmount(fabrics) / this.notZero(fabrics.current_quantity)
 }



  getTotalTotalAmountQuantityInput() {
    let sum = 0;
    this.dataSourceSearchTabel?.filteredData.forEach(yarn => {
      sum = sum + this.getTotalAmountQuantityInput(yarn)
    });
    return sum
  }

  getTotalTotalAmountQuantityOutput() {
    let sum = 0;
    this.dataSourceSearchTabel?.filteredData.forEach(yarn => {
      sum = sum + this.getTotalAmountQuantityOutput(yarn)
    });
    return sum
  }

  getTotalItemAmount() {
    let sum = 0;
    this.dataSourceSearchTabel?.filteredData.forEach(yarn => {
      sum = sum + this.getItemAmount(yarn)
    });
    return sum
  }

  getTotalAvgPrice() {
    let sum = 0;
    this.dataSourceSearchTabel?.filteredData.forEach(yarn => {
      sum = sum + this.getAvgPrice(yarn)
    });
    return sum
  }


  getTotalInputesPrice(fabrics){
    return fabrics?.details?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice(fabrics){
    return this.getInputAmount(fabrics) / this.notZero(this.getTotalAmountQuantityInput(fabrics))
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  transferData(data) {
    this._sharedComponentService.setData(data)
  }
}
