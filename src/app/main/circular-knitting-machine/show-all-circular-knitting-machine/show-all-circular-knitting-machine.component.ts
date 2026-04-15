import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, SideBarDef, GridOptions } from 'ag-grid-community';
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { CircularKnittingMachineBussinessmanService } from "src/app/services/main/circular-knitting-machine-bussinessman.service";

@Component({
  selector: 'app-show-all-circular-knitting-machine',
  templateUrl: './show-all-circular-knitting-machine.component.html',
  styleUrls: ['./show-all-circular-knitting-machine.component.css']
})
export class ShowAllCircularKnittingMachineComponent implements OnInit {

  private gridApi!: GridApi;
  rowData: any[] = [];
  selectedRows: any[] = [];
  selectedDataToUpdate: any;
  showInputUpdate = false;

  sideBar: SideBarDef = { toolPanels: ['filters'], defaultToolPanel: undefined };

  defaultColDef: ColDef = {
    flex: 1, minWidth: 120, resizable: true, sortable: true, filter: true,
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
    },
    {
      headerName: 'المصنع',
      field: 'manufacturer_name',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'نوع الماكينة',
      field: 'type',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'رقم الماكينة',
      field: 'number',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'قطر الماكينة',
      field: 'diameter',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'جوج الماكينة',
      field: 'smoothness',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'طراز الماكينة',
      field: 'model',
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
          this.showInputUpdate = true;
          this.selectedDataToUpdate = { ...p.data };
          setTimeout(() => document.getElementById('update-form')?.scrollIntoView({ behavior: 'smooth' }), 50);
        });
        return a;
      },
    },
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _circularKnittingMachineBussinessmanService: CircularKnittingMachineBussinessmanService,
  ) { }

  ngOnInit(): void { this.getData(); }

  onGridReady(params: GridReadyEvent) { this.gridApi = params.api; }

  onSelectionChanged() { this.selectedRows = this.gridApi?.getSelectedRows() || []; }

  getData() {
    this._circularKnittingMachineBussinessmanService.selectAll().subscribe((response: any) => {
      this.rowData = Array.isArray(response) ? response : [];
    });
  }

  delete() {
    this._constantsService.spinner.show();
    this._circularKnittingMachineBussinessmanService.delete(this.selectedRows).subscribe((response: any) => {
      this._constantsService.spinner.hide();
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
