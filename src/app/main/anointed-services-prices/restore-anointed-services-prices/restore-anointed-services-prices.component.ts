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
  selector: 'app-restore-anointed-services-prices',
  templateUrl: './restore-anointed-services-prices.component.html',
  styleUrls: ['./restore-anointed-services-prices.component.css']
})
export class RestoreAnointedServicesPricesComponent implements OnInit {


  /////////////////// Variables ///////////////////
  anointedServicesPrices: any[] = []
  selectedData:any = []
  selectedDataToUpdate: any
  selectArrayValues: any[] = [];

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['select', 'dyeing_name', 'anointed_services_name', 'price'];
  selection = new SelectionModel(true);
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _dyeingServicesPricesService: DyeingServicesPricesService,
    

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.sortColumns.sort(({ id: 'price', start: 'asc'}) as MatSortable);
  }

  getData() {
    this._dyeingServicesPricesService.selectAllDeleted().subscribe((response: any) => {
      this.anointedServicesPrices = response
      this.dataSourceSearchTabel = new MatTableDataSource(this.anointedServicesPrices);

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
    this.anointedServicesPrices.forEach(anointedServicesPrices => {
      this.getSelectedIndex(anointedServicesPrices)
    })
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  restore() {
    this._constantsService.spinner.show()
    this._dyeingServicesPricesService.restore(this.selectedData).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg === "the item is Restored") {
        this._constantsService.successRestoreMessage()
        this._sharedComponentService.reloadPage();
      }
      else {
        this._constantsService.invalidIdErrorMessage()
      }
    })
  }
}
