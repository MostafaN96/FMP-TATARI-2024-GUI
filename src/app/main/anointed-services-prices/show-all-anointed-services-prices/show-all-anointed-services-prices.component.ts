import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { DyeingServicesPricesService } from "src/app/services/main/dyeing-services-prices.service";

@Component({
  selector: 'app-show-all-anointed-services-prices',
  templateUrl: './show-all-anointed-services-prices.component.html',
  styleUrls: ['./show-all-anointed-services-prices.component.css']
})
export class ShowAllAnointedServicesPricesComponent implements OnInit {


 /////////////////// Variables ///////////////////
 anointedServicesPrices: any[] = []
 selectedData:any = []
 selectedDataToUpdate: any
 selectArrayValues: any[] = [];

 //////////////////////////////////// Tabel Angular Material /////////////////////////////////
 @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
 displayedColumns: string[] = ['select', 'dyeing_name', 'anointed_services_name', 'price', 'is_fabric_piece', 'update'];
 selection = new SelectionModel(true);
 filter = "";
 dataSourceSearchTabel: any;
 filterSelectObj = [
  {
    name: 'المصبغة',
    columnProp: 'dyeing_name',
    options: []
  }, {
    name: 'خدمة المصبغة',
    columnProp: 'anointed_services_name',
    options: []
  }
]
filterValues = {};

 constructor(
   public _sharedComponentService: SharedComponentService,
   private _constantsService: ConstantsService,
   private _dyeingServicesPricesService: DyeingServicesPricesService,
   

 ) {
   this._sharedComponentService.angularMaterialTableConfig()
 }

 ngOnInit(): void {
  this.getData();
  this.sortColumns.sort(({ id: 'dyeing_name', start: 'asc'}) as MatSortable);
 }

 getData() {
   this._dyeingServicesPricesService.selectAll().subscribe((response: any) => {
     this.anointedServicesPrices = response
     this.dataSourceSearchTabel = new MatTableDataSource(this.anointedServicesPrices);

     this.dataSourceSearchTabel.sort = this.sortColumns;

     // Setup Filter
     this._sharedComponentService.setupFilter(response, this.dataSourceSearchTabel, this.filterSelectObj)
   })
 }

 ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
 applyFilter(filterValue: string) {
  this.dataSourceSearchTabel = new MatTableDataSource(this.anointedServicesPrices);
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
   this.anointedServicesPrices.forEach(anointedServicesPrices => {
     this.getSelectedIndex(anointedServicesPrices)
   })
 }

 getSelectedData(selectedData: any) {
   this.selectedDataToUpdate = selectedData
 }
 ///////////////////// ----------- End Search Tabel ----------- /////////////////////

 delete() {
   this._dyeingServicesPricesService.delete(this.selectedData).subscribe(response => {
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
