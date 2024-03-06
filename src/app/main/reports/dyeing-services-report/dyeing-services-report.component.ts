import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';// (PageEvent) get index of table page
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { DyeingServicesService } from "src/app/services/main/dyeing-services.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-dyeing-services-report',
  templateUrl: './dyeing-services-report.component.html',
  styleUrls: ['./dyeing-services-report.component.css']
})
export class DyeingServicesReportComponent implements OnInit {

  /////////////////// Variables ///////////////////
  dyers:any
  dyeingServicesPrice:any
  selectedData:any

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
   @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
   @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
   displayedColumns: string[] = ['anointed_services_name', 'price', 'is_fabric_piece'];
   selection = new SelectionModel(true);
   filter = "";
   dataSourceSearchTabel: any;

   ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Dyeing --------------
  // maps the appropriate column to fields property
  public fieldsDyer: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyer: string = "المصبغة"


  public onFilteringDyeing(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyers, query);
  }

   constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _dyeingServicesService: DyeingServicesService,
    private _bussinessmanService: BussinessmanService,
    public _exportDataService: ExportDataService,

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
    this.getData();
  }

  getData() {
    this._bussinessmanService.selectDyerHasServices().subscribe((response: any) => {
      this.dyers = response
    })
  }

  //  Dyeing
  selectDyeing(event: { itemData: any; }) {    
    if (this.dyers.includes(event.itemData)) {
      this._dyeingServicesService.selectByDeying(event.itemData.id).subscribe((response: any) => {
        this.dyeingServicesPrice = response

        this.dataSourceSearchTabel = new MatTableDataSource(this.dyeingServicesPrice);
        this.dataSourceSearchTabel.sort = this.sortColumns;

        this.getSelectedData(event.itemData)
      })
    }
    else {
      this.dyeingServicesPrice = []
      this.dataSourceSearchTabel = []
    }
  }

  getSelectedData(selectedData: any) {
    this.selectedData = selectedData
  }
  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
 applyFilter(filterValue: string) {
   this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
 }

}
