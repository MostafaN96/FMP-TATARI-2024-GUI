import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';// (PageEvent) get index of table page
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";

// Call Service
import { ColorService } from "../../../services/main/color.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-dyeing-colors-report',
  templateUrl: './dyeing-colors-report.component.html',
  styleUrls: ['./dyeing-colors-report.component.css']
})
export class DyeingColorsReportComponent implements OnInit {

  @Input() selectedData: any

  /////////////////// Variables ///////////////////
  dyeingColorsPrice: any

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['color_category_name', 'color_name', 'code','price'];
  selection = new SelectionModel(true);
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _colorService: ColorService,

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this._colorService.selectByDeying(this.selectedData?.id).subscribe((response: any) => {
      this.dyeingColorsPrice = response

      this.dataSourceSearchTabel = new MatTableDataSource(this.dyeingColorsPrice);
      this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
      this.dataSourceSearchTabel.sort = this.sortColumns;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

}
