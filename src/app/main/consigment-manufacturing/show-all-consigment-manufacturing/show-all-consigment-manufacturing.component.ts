import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ConsigmentManufacturingService } from "src/app/services/main/consigment-manufacturing.service";

@Component({
  selector: 'app-show-all-consigment-manufacturing',
  templateUrl: './show-all-consigment-manufacturing.component.html',
  styleUrls: ['./show-all-consigment-manufacturing.component.css']
})
export class ShowAllConsigmentManufacturingComponent implements OnInit {


 /////////////////// Variables ///////////////////
 consigmentManufacturing: any[] = []
 selectedData:any = []
 selectedDataToUpdate: any
 selectArrayValues: any[] = [];

 //////////////////////////////////// Tabel Angular Material /////////////////////////////////
 @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
 displayedColumns: string[] = ['select', 'index', 'number', 'update'];
 selection = new SelectionModel(true);
 filter = "";
 dataSourceSearchTabel: any;

 constructor(
   public _sharedComponentService: SharedComponentService,
   private _constantsService: ConstantsService,
   private _consigmentManufacturingService: ConsigmentManufacturingService,
   public _exportDataService: ExportDataService,

 ) {
   this._sharedComponentService.angularMaterialTableConfig()
 }

 ngOnInit(): void {
   this.getData();
 }

 getData() {
   this._consigmentManufacturingService.selectAll().subscribe((response: any) => {
     this.consigmentManufacturing = response
     this.dataSourceSearchTabel = new MatTableDataSource(this.consigmentManufacturing);
     this.sortColumns.sort(({ id: 'number', start: 'asc'}) as MatSortable);
     this.dataSourceSearchTabel.sort = this.sortColumns;
   })
 }

 ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
 applyFilter(filterValue: string) {
   this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
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
   this.consigmentManufacturing.forEach(consigmentManufacturing => {
     this.getSelectedIndex(consigmentManufacturing)
   })
 }

 getSelectedData(selectedData: any) {
   this.selectedDataToUpdate = selectedData
 }
 ///////////////////// ----------- End Search Tabel ----------- /////////////////////

 delete() {
   this._consigmentManufacturingService.delete(this.selectedData).subscribe(response => {
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
