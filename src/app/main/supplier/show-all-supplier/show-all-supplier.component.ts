import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, SideBarDef, GridOptions } from 'ag-grid-community';
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { BussinessmanService } from 'src/app/services/main/bussinessman.service';

@Component({
  selector: 'app-show-all-supplier',
  templateUrl: './show-all-supplier.component.html',
  styleUrls: ['./show-all-supplier.component.css']
})
export class ShowAllSupplierComponent implements OnInit {
  private gridApi!: GridApi;
  rowData: any[] = [];
  selectedRows: any[] = [];
  selectedDataToUpdate: any;

  sideBar: SideBarDef = { toolPanels: ['filters'], defaultToolPanel: undefined };
  defaultColDef: ColDef = { flex: 1, minWidth: 120, resizable: true, sortable: true, filter: true };
  gridOptions: GridOptions = { enableRtl: true, animateRows: true, rowSelection: 'multiple', suppressRowClickSelection: true };

  private boolCell = (v: any): string =>
    v == 1
      ? '<i class="fas fa-check-circle" style="color:#4caf50"></i>'
      : '<i class="fas fa-times-circle" style="color:#ccc"></i>';

  columnDefs: ColDef[] = [
    { headerName: '', checkboxSelection: true, headerCheckboxSelection: true, maxWidth: 50, filter: false, sortable: false },
    { headerName: 'اسم العميل', field: 'name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' } },
    { headerName: 'رقم الموبايل', field: 'phone', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' } },
    { headerName: 'العنوان', field: 'address', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' } },
    {
      headerName: 'مورد', field: 'is_supplier', maxWidth: 90,
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows', valueFormatter: (p: any) => p.value == 1 ? 'مورد' : 'لا' },
      cellRenderer: (p: any) => this.boolCell(p.value)
    },
    {
      headerName: 'عميل', field: 'is_seller', maxWidth: 90,
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows', valueFormatter: (p: any) => p.value == 1 ? 'عميل' : 'لا' },
      cellRenderer: (p: any) => this.boolCell(p.value)
    },
    {
      headerName: 'صناعي', field: 'is_manufacturer', maxWidth: 90,
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows', valueFormatter: (p: any) => p.value == 1 ? 'صناعي' : 'لا' },
      cellRenderer: (p: any) => this.boolCell(p.value)
    },
    {
      headerName: 'صباغة', field: 'is_dyer', maxWidth: 90,
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows', valueFormatter: (p: any) => p.value == 1 ? 'صباغة' : 'لا' },
      cellRenderer: (p: any) => this.boolCell(p.value)
    },
    {
      headerName: 'عميل ستوك', field: 'is_stock', maxWidth: 110,
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows', valueFormatter: (p: any) => p.value == 1 ? 'عميل ستوك' : 'لا' },
      cellRenderer: (p: any) => this.boolCell(p.value)
    },
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
    private _supplierService: BussinessmanService,
  ) { }

  ngOnInit(): void { this.getData(); }
  onGridReady(params: GridReadyEvent) { this.gridApi = params.api; }
  onSelectionChanged() { this.selectedRows = this.gridApi?.getSelectedRows() || []; }

  getData() {
    this._supplierService.selectAll().subscribe((response: any) => {
      this.rowData = Array.isArray(response) ? response : [];
    });
  }

  delete() {
    this._supplierService.delete(this.selectedRows).subscribe((response: any) => {
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
