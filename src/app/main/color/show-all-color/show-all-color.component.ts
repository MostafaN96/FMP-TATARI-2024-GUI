import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, SideBarDef, GridOptions } from 'ag-grid-community';
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ColorService } from 'src/app/services/main/color.service';

@Component({
  selector: 'app-show-all-color',
  templateUrl: './show-all-color.component.html',
  styleUrls: ['./show-all-color.component.css']
})
export class ShowAllColorComponent implements OnInit {
  private gridApi!: GridApi;
  rowData: any[] = [];
  selectedRows: any[] = [];
  selectedDataToUpdate: any;

  sideBar: SideBarDef = { toolPanels: ['filters'], defaultToolPanel: undefined };
  defaultColDef: ColDef = { flex: 1, minWidth: 120, resizable: true, sortable: true, filter: true };
  gridOptions: GridOptions = { enableRtl: true, animateRows: true, rowSelection: 'multiple', suppressRowClickSelection: true };

  columnDefs: ColDef[] = [
    { headerName: '', checkboxSelection: true, headerCheckboxSelection: true, maxWidth: 50, filter: false, sortable: false },
    { headerName: 'اسم اللون', field: 'name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' } },
    {
      headerName: 'تعديل', field: 'id', maxWidth: 100, sortable: false, filter: false,
      cellRenderer: (p: any) => {
        const a = document.createElement('a');
        a.innerHTML = '<i class="fas fa-edit update-symbol"></i>';
        a.style.cursor = 'pointer';
        a.addEventListener('click', () => {
          this.selectedDataToUpdate = { ...p.data };
          setTimeout(() => document.getElementById('update-form')?.scrollIntoView({ behavior: 'smooth' }), 50);
        });
        return a;
      }
    },
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _colorService: ColorService,
  ) { }

  ngOnInit(): void { this.getData(); }
  onGridReady(params: GridReadyEvent) { this.gridApi = params.api; }
  onSelectionChanged() { this.selectedRows = this.gridApi?.getSelectedRows() || []; }

  getData() {
    this._colorService.selectAll().subscribe((response: any) => {
      this.rowData = Array.isArray(response) ? response : [];
    });
  }

  delete() {
    this._colorService.delete(this.selectedRows).subscribe((response: any) => {
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
