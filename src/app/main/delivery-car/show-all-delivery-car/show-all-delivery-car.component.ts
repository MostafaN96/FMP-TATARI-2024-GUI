import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";

// Call Service
import { DeliveryCarService } from "../../../services/main/delivery-car.service";

@Component({
  selector: 'app-show-all-delivery-car',
  templateUrl: './show-all-delivery-car.component.html',
  styleUrls: ['./show-all-delivery-car.component.css']
})
export class ShowAllDeliveryCarComponent implements OnInit {


 /////////////////// Variables ///////////////////
 deliveryCar: any[] = []
 selectedData:any = []
 selectedDataToUpdate: any
 selectArrayValues: any[] = [];

 //////////////////////////////////// Tabel Angular Material /////////////////////////////////
 @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
 displayedColumns: string[] = ['select', 'model', 'plateNumber', 'driversName', 'phone', 'nationalId', 'update'];
 selection = new SelectionModel(true);
 filter = "";
 dataSourceSearchTabel: any;

 constructor(
   public _sharedComponentService: SharedComponentService,
   private _constantsService: ConstantsService,
   private _deliveryCarService: DeliveryCarService,
   

 ) {
   this._sharedComponentService.angularMaterialTableConfig()
 }

 ngOnInit(): void {
   this.getData();
 }

 getData() {
   this._deliveryCarService.selectAll().subscribe((response: any) => {
     this.deliveryCar = response
     this.dataSourceSearchTabel = new MatTableDataSource(this.deliveryCar);

     this.sortColumns.sort(({ id: 'model', start: 'asc'}) as MatSortable);
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
   this.deliveryCar.forEach(deliveryCar => {
     this.getSelectedIndex(deliveryCar)
   })
 }

 getSelectedData(selectedData: any) {
   this.selectedDataToUpdate = selectedData
 }
 ///////////////////// ----------- End Search Tabel ----------- /////////////////////

 delete() {
   this._deliveryCarService.delete(this.selectedData).subscribe(response => {
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
