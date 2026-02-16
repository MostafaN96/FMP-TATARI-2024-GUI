import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Grid
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';

// Shared Service
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { ConstantsService } from 'src/app/services/constants.service';

// Call Service
import { ReportWcService } from 'src/app/services/main/wc/report-wc.service';

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-report-wc',
  templateUrl: './update-report-wc.component.html',
  styleUrls: ['./update-report-wc.component.css']
})
export class UpdateReportWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  reportByFabricWcDetails: any[] = [];
  fabricCode = '';
  fabricName = '';
  consigmentNumber = '';
  warehouseName = '';
  reportParams: any = {};

  @Input() selectedWcIds: string[] = [];
  @Input() showGrid = true;
  @Input() showHeader = true;
  @Output() updated = new EventEmitter<void>();

  updateForm: FormGroup = new FormGroup({
    storagePlace: new FormControl('', [
      Validators.required,
      Validators.pattern(this.patterns.validator_pattern.shortText)
    ])
  });

  //////////////////////////////////// Grid Angular /////////////////////////////////
  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;
  gridApi!: GridApi;
  gridColumnApi: any;

  public columnDefs: ColDef[] = [
    {
      headerName: '',
      field: 'select',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      width: 50,
      pinned: 'left',
      sortable: false,
      filter: false,
      cellClass: 'text-center',
    },
    {
      headerName: 'التسلسل',
      field: 'index',
      valueGetter: 'node.rowIndex + 1',
      width: 80,
      cellClass: 'text-center',
      filter: false,
    },
    {
      headerName: 'مكان التخزين',
      field: 'storage_place',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'رقم الاذن',
      field: 'number',
      filter: false,
    },
    {
      headerName: 'التاريخ',
      field: 'date',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      valueFormatter: (p: any) => this._sharedComponentService.formatDateArabic(p.value),
      wrapText: true,
      autoHeight: true,
    },
    {
      headerName: 'نوع الاذن',
      field: 'type_of_requisition',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      valueGetter: (p: any) => `${p.data?.type_of_requisition ?? ''} ${p.data?.from_manufacturer_name ?? ''}`.trim(),
      wrapText: true,
      autoHeight: true,
    },
    {
      headerName: 'الكمية',
      field: 'quantity',
      type: 'numericColumn',
      valueFormatter: this._sharedComponentService.format2.bind(this),
    },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    sortable: true,
    filter: 'agSetColumnFilter',
    filterParams: {
      excelMode: 'windows',
    },
  };

  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public loadingCellRenderer: any = CustomLoadingCellRendererComponent;
  public loadingCellRendererParams: any = {
    loadingMessage: 'One moment please...'
  };

  gridParams!: GridReadyEvent;
  gridOptions: GridOptions = {
    domLayout: 'normal',
    ensureDomOrder: true,
    suppressHorizontalScroll: false,
    alwaysShowVerticalScroll: false,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    rowMultiSelectWithClick: true,
    onGridReady: (params) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    onSelectionChanged: () => {
      this.updateSelectedWcIds();
    },
  };

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private _reportWcService: ReportWcService,
  ) { }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    if (!this.showGrid) return;
    this.gridParams = params;
    this.route.queryParams
      .subscribe(headerParams => {
        this.reportParams = { ...headerParams };
        this.getData(this.gridParams, headerParams);
      });
  }

  getData(params: GridReadyEvent, headerParams: any) {
    this._reportWcService.selectInventoryDetailsByWarehouseByFabricByConsigmentManufacturing(
      headerParams['id'],
      headerParams['warehouseId'],
      headerParams['consigmentManufacturingId'],
      headerParams['fabricOrderId']
    ).subscribe((response: any) => {
      this.fabricCode = headerParams['code'] || '';
      this.fabricName = headerParams['name'] || '';
      this.consigmentNumber = headerParams['consigmentNumber'] || '';
      this.warehouseName = headerParams['warehouseName'] || '';

      this.reportByFabricWcDetails = response || [];
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.setRowData(this.reportByFabricWcDetails);
      this.updateSelectedWcIds();
    });
  }

  private updateSelectedWcIds() {
    if (!this.gridApi) return;
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.selectedWcIds = selectedNodes
      .map((node) => node.data?.wc_id ?? node.data?.id)
      .filter((id) => id != null)
      .map((id) => String(id));
  }

  onUpdate() {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid || this.selectedWcIds.length === 0) {
      this._constantsService.userErrorMessage();
      return;
    }

    const payload = {
      wcIds: this.selectedWcIds,
      storagePlace: this.updateForm.value.storagePlace
    };

    this._constantsService.spinner.show();
    this._reportWcService.updateReportStoragePlace(payload).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response?.msg === 'data updated') {
        this._constantsService.successUpdateMessage();
        this.updateForm.reset();
        if (this.showGrid) {
          this.gridApi?.deselectAll();
          if (this.gridParams && this.reportParams) {
            this.getData(this.gridParams, this.reportParams);
          }
        }
        this.updated.emit();
      } else {
        this._constantsService.userErrorMessage();
      }
    }, () => {
      this._constantsService.spinner.hide();
      this._constantsService.userErrorMessage();
    });
  }
}
