import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent, SideBarDef, GridOptions } from 'ag-grid-community';
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { FabricService } from "src/app/services/main/fabric.service";

@Component({
  selector: 'app-show-all-fabric',
  templateUrl: './show-all-fabric.component.html',
  styleUrls: ['./show-all-fabric.component.css']
})
export class ShowAllFabricComponent implements OnInit {

  private gridApi!: GridApi;
  rowData: any[] = [];
  selectedRows: any[] = [];
  selectedDataToUpdate: any;
  isDyedFabric = false;

  sideBar: SideBarDef = { toolPanels: ['filters'], defaultToolPanel: undefined };

  defaultColDef: ColDef = {
    flex: 1, minWidth: 120, resizable: true, sortable: true, filter: true,
  };

  gridOptions: GridOptions = {
    enableRtl: true,
    animateRows: true,
    suppressRowTransform: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
  };

  columnDefs: ColDef[] = [];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _fabricService: FabricService,
    private _router: Router,
  ) {
    if (this._router.url === '/dashboard/show-all-dyed-fabric') {
      this.isDyedFabric = true;
    }
    this.buildColumnDefs();
  }

  private buildColumnDefs() {
    const wrapStyle = {
      'white-space': 'normal',
      'word-break': 'normal',
      'overflow-wrap': 'break-word',
      'line-height': '1.5',
      'padding-top': '6px',
      'padding-bottom': '6px',
    };

    const common: ColDef[] = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        maxWidth: 50,
        filter: false,
        sortable: false,
      },
      {
        headerName: 'اسم القماش',
        field: 'name',
        filter: 'agSetColumnFilter',
        filterParams: { excelMode: 'windows' },
        wrapText: true,
        autoHeight: true,
        flex: 3,
        cellStyle: wrapStyle,
      },
      {
        headerName: 'الكود',
        field: 'code',
        filter: 'agSetColumnFilter',
        filterParams: { excelMode: 'windows' },
      },
      {
        headerName: 'وزن القماش م2',
        field: 'fabric_quantity_m2',
        filter: 'agNumberColumnFilter',
        width: 130,
        flex: 0,
      },
    ];

    const dyedOnly: ColDef[] = [
      {
        headerName: 'نسبة الهالك',
        field: 'waste_ratio',
        filter: 'agNumberColumnFilter',
        width: 130,
        flex: 0,
      },
      {
        headerName: 'اسم القماش الخام',
        field: 'fabric_name_code',
        filter: 'agSetColumnFilter',
        filterParams: { excelMode: 'windows' },
        wrapText: true,
        autoHeight: true,
        flex: 3,
        cellStyle: wrapStyle,
      },
    ];

    const rawOnly: ColDef[] = [
      {
        headerName: 'الخيوط',
        field: 'yarns',
        filter: 'agSetColumnFilter',
        filterParams: { excelMode: 'windows' },
        filterValueGetter: (p: any) => {
          const yarns: any[] = Array.isArray(p.data?.yarns) ? p.data.yarns : [];
          return yarns.map((y: any) => y.yarn_name).filter(Boolean);
        },
        sortable: false,
        minWidth: 360,
        flex: 3,
        autoHeight: true,
        cellClass: 'details-cell',
        cellRenderer: (p: any) => {
          if (!p.data) return '';
          const yarns: any[] = Array.isArray(p.data.yarns) ? p.data.yarns : [];

          const rows = yarns.map(y => `
            <tr>
              <td>${y.yarn_name ?? ''}</td>
              <td>${y.yarn_code ?? ''}</td>
              <td>${y.ratio ?? ''}</td>
              <td>${y.wast_ratio ?? ''}</td>
            </tr>
          `).join('');

          const total = yarns.reduce((s, y) => s + Number(y.ratio || 0), 0);

          return `
            <table class="details-table" style="width:100%">
              <thead>
                <tr>
                  <th>نوع الخيط</th>
                  <th>كود الخيط</th>
                  <th>نسبة الكمية</th>
                  <th>نسبة الهالك</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
              <tfoot>
                <tr>
                  <th>الإجمالي</th>
                  <th></th>
                  <th>${Number(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          `;
        },
      },
      {
        headerName: 'تعديل أنواع الخيوط',
        field: 'id',
        colId: 'yarn_edit',
        maxWidth: 160,
        sortable: false,
        filter: false,
        cellRenderer: (p: any) => {
          const a = document.createElement('a');
          a.innerHTML = '<i class="fas fa-edit update-symbol"></i>';
          a.style.cursor = 'pointer';
          a.addEventListener('click', () => {
            this._router.navigate(
              [this._constantsService.MAIN_URL, this._constantsService.ROUTING_LINKS[152]],
              { queryParams: { id: p.data.id } }
            );
          });
          return a;
        },
      },
    ];

    const editCol: ColDef[] = [
      {
        headerName: 'تعديل',
        field: 'id',
        colId: 'edit',
        maxWidth: 100,
        sortable: false,
        filter: false,
        cellRenderer: (p: any) => {
          const a = document.createElement('a');
          a.innerHTML = '<i class="fas fa-edit update-symbol"></i>';
          a.style.cursor = 'pointer';
          a.addEventListener('click', () => {
            this.selectedDataToUpdate = { ...p.data };
            setTimeout(() => document.getElementById('update-form')?.scrollIntoView({ behavior: 'smooth' }), 50);
          });
          return a;
        },
      },
    ];

    this.columnDefs = [
      ...common,
      ...(this.isDyedFabric ? dyedOnly : rawOnly),
      ...editCol,
    ];
  }

  ngOnInit(): void { this.getData(); }

  onGridReady(params: GridReadyEvent) { this.gridApi = params.api; }

  onSelectionChanged() { this.selectedRows = this.gridApi?.getSelectedRows() || []; }

  onQuickFilter(event: Event) {
    this.gridApi?.setQuickFilter((event.target as HTMLInputElement).value);
  }

  getData() {
    const isDyed = this.isDyedFabric ? 'dyed' : undefined;
    this._fabricService.selectAll(isDyed).subscribe((response: any) => {
      this.rowData = Array.isArray(response) ? response : [];
    });
  }

  delete() {
    const isDyed = this.isDyedFabric ? 'dyed' : undefined;
    this._fabricService.delete(this.selectedRows, isDyed).subscribe((response: any) => {
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
