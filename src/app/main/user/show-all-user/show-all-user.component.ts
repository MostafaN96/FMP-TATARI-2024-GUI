import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { UserService } from "src/app/services/main/user.service";

@Component({
  selector: 'app-show-all-user',
  templateUrl: './show-all-user.component.html',
  styleUrls: ['./show-all-user.component.css']
})
export class ShowAllUserComponent implements OnInit {



 /////////////////// Variables ///////////////////
 user: any[] = []
 selectedData:any = []
 selectedDataToUpdate: any
 selectArrayValues: any[] = [];

 //////////////////////////////////// Tabel Angular Material /////////////////////////////////
 @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
 displayedColumns: string[] = ['select', 'index', 'user_name', 'user_email', 'user_mobile', 'password_status', 'update'];
 selection = new SelectionModel(true);
 filter = "";
 dataSourceSearchTabel: any;

 constructor(
   public _sharedComponentService: SharedComponentService,
   private _constantsService: ConstantsService,
   private _userService: UserService,
   public _exportDataService: ExportDataService,
   private _sessionManagerService: SessionManagerService,

 ) {
   this._sharedComponentService.angularMaterialTableConfig()
 }

 ngOnInit(): void {
   this.getData();
 }

 getData() {
   this._userService.selectAll().subscribe((response: any) => {
     // إظهار كلمة المرور افتراضياً بناءً على الصلاحية
     const hasPermission = this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[4]);
     
     this.user = response.map((user: any) => ({
       ...user,
       showPassword: hasPermission // إظهار كلمة المرور إذا لديه صلاحية
     }));
     
     this.dataSourceSearchTabel = new MatTableDataSource(this.user);
     this.sortColumns.sort(({ id: 'user_name', start: 'asc'}) as MatSortable);
     this.dataSourceSearchTabel.sort = this.sortColumns;

     // إخفاء عمود كلمة المرور بناءً على الصلاحية
     if(!hasPermission) {
       let index = this.displayedColumns.indexOf('password_status');
       if(index !== -1) {
         this.displayedColumns.splice(index, 1);
       }
     }
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
   this.user.forEach(user => {
     this.getSelectedIndex(user)
   })
 }

 getSelectedData(selectedData: any) {
   this.selectedDataToUpdate = selectedData
 }
 ///////////////////// ----------- End Search Tabel ----------- /////////////////////

 delete() {
   this._userService.delete(this.selectedData).subscribe(response => {
    if (response.msg === "the item is delete") {
      this._constantsService.successDeleteMessage()
      this._sharedComponentService.reloadPage();
    }
    else {
      this._constantsService.invalidIdErrorMessage()
    }
   })
 }

 togglePasswordVisibility(user: any) {
   user.showPassword = !user.showPassword;
 }

 copyToClipboard(text: string) {
   if (!text) {
     this._constantsService.successMessage('لا توجد كلمة مرور لنسخها');
     return;
   }
   
   navigator.clipboard.writeText(text).then(() => {
     this._constantsService.successMessage('تم نسخ كلمة المرور بنجاح');
   }).catch(() => {
     // Fallback للمتصفحات القديمة
     const textarea = document.createElement('textarea');
     textarea.value = text;
     textarea.style.position = 'fixed';
     textarea.style.opacity = '0';
     document.body.appendChild(textarea);
     textarea.select();
     document.execCommand('copy');
     document.body.removeChild(textarea);
     this._constantsService.successMessage('تم نسخ كلمة المرور بنجاح');
   });
 }
}
