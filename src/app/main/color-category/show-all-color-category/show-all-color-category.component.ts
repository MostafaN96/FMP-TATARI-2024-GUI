import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';// (PageEvent) get index of table page
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { ColorCategoryService } from "src/app/services/main/color-category.service";

// Import Components
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-show-all-color-category',
  templateUrl: './show-all-color-category.component.html',
  styleUrls: ['./show-all-color-category.component.css']
})
export class ShowAllColorCategoryComponent implements OnInit {



 /////////////////// Variables ///////////////////
 colorCategory: any[] = []
 selectedData:any = []
 selectedDataToUpdate: any
 selectArrayValues: any[] = [];

 //////////////////////////////////// Tabel Angular Material /////////////////////////////////
 @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
 @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
 displayedColumns: string[] = ['select', 'name', 'update'];
 selection = new SelectionModel(true);
 filter = "";
 dataSourceSearchTabel: any;

 constructor(
   public _sharedComponentService: SharedComponentService,
   private _constantsService: ConstantsService,
   private _colorCategoryService: ColorCategoryService,
   

 ) {
   this._sharedComponentService.angularMaterialTableConfig()
 }

 ngOnInit(): void {
   this.getData();
 }

 getData() {
   this._colorCategoryService.selectAll().subscribe((response: any) => {
     this.colorCategory = response
     this.dataSourceSearchTabel = new MatTableDataSource(this.colorCategory);
     this.paginator!.pageIndex = Number(this._sharedComponentService.getAngularMaterialTablePageIndex())
     this.paginator!.pageSize = Number(this._sharedComponentService.getAngularMaterialTablePageSize())
     this.dataSourceSearchTabel.paginator = this.paginator;
     this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
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
   this.colorCategory.forEach(colorCategory => {
     this.getSelectedIndex(colorCategory)
   })
 }

 getSelectedData(selectedData: any) {
   this.selectedDataToUpdate = selectedData
 }
 ///////////////////// ----------- End Search Tabel ----------- /////////////////////

 delete() {
   this._colorCategoryService.delete(this.selectedData).subscribe(response => {
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
