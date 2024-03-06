import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

@Component({
  selector: 'app-show-all-supplier',
  templateUrl: './show-all-supplier.component.html',
  styleUrls: ['./show-all-supplier.component.css']
})
export class ShowAllSupplierComponent implements OnInit {

 /////////////////// Variables ///////////////////
 suppliers: any[] = []
 selectedData:any = []
 selectedDataToUpdate: any
 selectArrayValues: any[] = [];

 //////////////////////////////////// Tabel Angular Material /////////////////////////////////
 @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
 displayedColumns: string[] = ['select', 'name', 'phone', 'address', 'supplier',
 'seller',
 'manufacturer',
 'dyer',
 'is_stock',
 'update'];
 selection = new SelectionModel(true);
 filter = "";
 dataSourceSearchTabel: any;
 filterSelectObj = [
  {
    name: 'الموردين',
    columnProp: 'is_supplier',
    options: [""]
  }, {
    name: 'العملاء',
    columnProp: 'is_seller',
    options: [""]
  }, {
    name: 'الصناعيين',
    columnProp: 'is_manufacturer',
    options: [""]
  }, {
    name: 'المصابغ',
    columnProp: 'is_dyer',
    options: [""]
  }, {
    name: 'عميل ستوك',
    columnProp: 'is_stock',
    options: [""]
  }
]
filterValues = {};

 constructor(
   public _sharedComponentService: SharedComponentService,
   private _constantsService: ConstantsService,
   private _supplierService: BussinessmanService,
   

 ) {
   this._sharedComponentService.angularMaterialTableConfig()
 }

 ngOnInit(): void {
   this.getData();
 }

 getData() {
   this._supplierService.selectAll().subscribe((response: any) => {
     this.suppliers = response
     this.dataSourceSearchTabel = new MatTableDataSource(this.suppliers);

     this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
     this.dataSourceSearchTabel.sort = this.sortColumns;

// Setup Filter
this._sharedComponentService.setupFilter(response, this.dataSourceSearchTabel, this.filterSelectObj)
this.filterSelectObj = [
  {
    name: 'الموردين',
    columnProp: 'is_supplier',
    options: ["1"]
  }, {
    name: 'العملاء',
    columnProp: 'is_seller',
    options: ["1"]
  }, {
    name: 'الصناعيين',
    columnProp: 'is_manufacturer',
    options: ["1"]
  }, {
    name: 'المصابغ',
    columnProp: 'is_dyer',
    options: ["1"]
  }, {
    name: 'عميل ستوك',
    columnProp: 'is_stock',
    options: ["1"]
  }
]
   })
 }

 ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
 applyFilter(filterValue: string) {
  this.dataSourceSearchTabel = new MatTableDataSource(this.suppliers);
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

 isAllSelected() {
   const numSelected = this.selection.selected.length;
   const numRows = this.dataSourceSearchTabel.data.length;
   return numSelected === numRows;
 }

 masterToggle() {
   this.isAllSelected() ?
     this.selection.clear() :
     this.dataSourceSearchTabel.data.forEach((row: any) => this.selection.select(row));
 }


 getSelectedIndex(objectData: any) {
   this.selectedData = []
   if (this.selectArrayValues.includes(objectData)) {
     let index = this.selectArrayValues.indexOf(objectData);
     this.selectArrayValues[index] = delete this.selectArrayValues[index];
   }
   else {
     this.selectArrayValues.push(objectData);
   }
   this.selectArrayValues.forEach((element) => {
     if (element !== true)
       this.selectedData.push(element)
   });

 }

 selectAll() {
   this.suppliers.forEach(suppliers => {
     this.getSelectedIndex(suppliers)
   })
 }

 getSelectedData(selectedData: any) {
   this.selectedDataToUpdate = selectedData
 }
 ///////////////////// ----------- End Search Tabel ----------- /////////////////////

 delete() {
   this._supplierService.delete(this.selectedData).subscribe(response => {
    if (response.msg === "the item is delete") {
      this._constantsService.successDeleteMessage()
      this._sharedComponentService.reloadPage();
    }
    else {
      this._constantsService.invalidIdErrorMessage()
    }
   })
 }
}
