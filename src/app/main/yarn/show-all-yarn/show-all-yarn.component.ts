import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  SideBarDef,
  GridOptions,
} from 'ag-grid-community';

import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";
import { YarnService } from "../../../services/main/yarn.service";

@Component({
  selector: 'app-show-all-yarn',
  templateUrl: './show-all-yarn.component.html',
  styleUrls: ['./show-all-yarn.component.css']
})
export class ShowAllYarnComponent implements OnInit {

  private gridApi!: GridApi;

  rowData: any[] = [];
  selectedRows: any[] = [];
  selectedDataToUpdate: any;
  loading = false;

  sideBar: SideBarDef = {
    toolPanels: ['filters'],
    defaultToolPanel: undefined
  };

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
    filter: true,
  };

  gridOptions: GridOptions = {
    enableRtl: true,
    animateRows: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
  };

  columnDefs: ColDef[] = [
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      maxWidth: 50,
      filter: false,
      sortable: false,
      pinned: 'right',
    },
    {
      headerName: 'اسم الخيط',
      field: 'name',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'الكود',
      field: 'code',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'تعديل',
      field: 'id',
      maxWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: (p: any) => {
        const a = document.createElement('a');
        a.innerHTML = '<i class="fas fa-edit update-symbol"></i>';
        a.style.cursor = 'pointer';
        a.addEventListener('click', () => {
          this.selectedDataToUpdate = { ...p.data };
          setTimeout(() => {
            document.getElementById('update-form')?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        });
        return a;
      },
    },
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _yarnService: YarnService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onSelectionChanged() {
    this.selectedRows = this.gridApi?.getSelectedRows() || [];
  }

  getData() {
    this.loading = true;
    this._yarnService.selectAll().subscribe((response: any) => {
      this.rowData = Array.isArray(response) ? response : [];
      this.loading = false;
    });
  }

  delete() {
    this._yarnService.delete(this.selectedRows).subscribe((response: any) => {
      if (response.msg === 'the item is delete') {
        this._constantsService.successDeleteMessage();
        this.selectedRows = [];
        this.getData();
      } else {
        this._constantsService.invalidIdErrorMessage();
      }
    });
  }
}
