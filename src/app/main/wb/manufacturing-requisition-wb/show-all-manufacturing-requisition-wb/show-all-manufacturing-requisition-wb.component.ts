import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { SharedComponentService } from 'src/app/services/shared-component.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { ManufacturingRequisitionWbService } from 'src/app/services/main/wb/manufacturing-requisition-wb.service';
import { WbManufacturingOutputService } from 'src/app/services/main/wb/wb-manufacturing-output.service';

@Component({
  selector: 'app-show-all-manufacturing-requisition-wb',
  templateUrl: './show-all-manufacturing-requisition-wb.component.html',
  styleUrls: ['./show-all-manufacturing-requisition-wb.component.css'],
  providers: [ConfirmationService],
})
export class ShowAllManufacturingRequisitionWbComponent implements OnInit, AfterViewInit {

  isFiltered = false;
  showFilters = true;
  selectedDataToUpdate: any = null;
  showUpdatePanel = false;
  selectedWcIds: string[] = [];
  selectedStoragePlace = '';
  selectedStorageReportParams: any = null;

  rows: any[] = [];
  totalRows = 0;
  loading = false;
  tableFirst = 0;
  tableRows = 50;
  containerStyle: any = {};

  grandFabricPiece     = 0;
  grandQuantity        = 0;
  grandCurrentQuantity = 0;

  hasPrice   = false;
  hasStatus  = false;
  hasConfirm = false;

  availableFilters: any = {
    manufacture_name:               [],
    seller_name:                    [],
    fabric_code:                    [],
    fabric_name:                    [],
    wc_fabric_order_requisition_name: [],
    order_number:                   [],
    consigment_number:              [],
    circular_knitting_machine_name: [],
    note:                           [],
    storage_place:                  [],
    document:                       [],
    quantity:                       [],
    status_name:                    ['غير مفحوص', 'مقبول بعد الفحص', 'غير مقبول', 'ابيض'],
    is_approved_status_name:        ['تم الاستلام', 'لم يتم الاستلام'],
  };

  externalDateFilters: any = null;
  externalManufactureName:      string[] = [];
  externalSellerName:           string[] = [];
  externalStatusName:           string[] = [];
  externalIsApprovedStatusName: string[] = [];
  externalFabricCode:           string[] = [];
  externalFabricName:           string[] = [];
  externalMachineName:          string[] = [];
  externalWcOrderName:          string[] = [];
  externalOrderNumber:          string[] = [];
  externalConsigmentNumber:     string[] = [];
  externalNote:                 string[] = [];
  externalDocument:             string[] = [];
  externalQuantity:             string[] = [];

  filteredManufactureNames:      string[] = [];
  filteredSellerNames:           string[] = [];
  filteredStatusNames:           string[] = [];
  filteredIsApprovedStatusNames: string[] = [];
  filteredFabricCodes:           string[] = [];
  filteredFabricNames:           string[] = [];
  filteredMachineNames:          string[] = [];
  filteredWcOrderNames:          string[] = [];
  filteredOrderNumbers:          string[] = [];
  filteredConsigmentNumbers:     string[] = [];
  filteredNotes:                 string[] = [];
  filteredDocuments:             string[] = [];
  filteredQuantities:            string[] = [];

  private makeFilter(key: string) {
    return (event: any) => {
      const q = (event.query ?? '').toLowerCase();
      return (this.availableFilters[key] || []).map(String)
        .filter((v: string) => v.toLowerCase().includes(q));
    };
  }

  filterManufactureNames(event: any)      { this.filteredManufactureNames      = this.makeFilter('manufacture_name')(event); }
  filterSellerNames(event: any)           { this.filteredSellerNames           = this.makeFilter('seller_name')(event); }
  filterStatusNames(event: any)           { this.filteredStatusNames           = this.makeFilter('status_name')(event); }
  filterIsApprovedStatusNames(event: any) { this.filteredIsApprovedStatusNames = this.makeFilter('is_approved_status_name')(event); }
  filterFabricCodes(event: any)           { this.filteredFabricCodes           = this.makeFilter('fabric_code')(event); }
  filterFabricNames(event: any)           { this.filteredFabricNames           = this.makeFilter('fabric_name')(event); }
  filterMachineNames(event: any)          { this.filteredMachineNames          = this.makeFilter('circular_knitting_machine_name')(event); }
  filterWcOrderNames(event: any)          { this.filteredWcOrderNames          = this.makeFilter('wc_fabric_order_requisition_name')(event); }
  filterOrderNumbers(event: any)          { this.filteredOrderNumbers          = this.makeFilter('order_number')(event); }
  filterConsigmentNumbers(event: any)     { this.filteredConsigmentNumbers     = this.makeFilter('consigment_number')(event); }
  filterNotes(event: any)                 { this.filteredNotes                 = this.makeFilter('note')(event); }
  filterDocuments(event: any)             { this.filteredDocuments             = this.makeFilter('document')(event); }
  filterQuantities(event: any)            { this.filteredQuantities            = this.makeFilter('quantity')(event); }

  get totalColspan(): number {
    let n = 17;
    if (this.hasPrice)   n += 4;
    if (this.hasStatus)  n += 2;
    if (this.hasConfirm) n += 1;
    return n;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    setTimeout(() => this.computeContainerHeight(), 50);
  }

  @HostListener('window:resize')
  onWindowResize() { this.computeContainerHeight(); }

  ngAfterViewInit() {
    setTimeout(() => this.computeContainerHeight(), 200);
  }

  private computeContainerHeight() {
    const container = document.getElementById('table-header-data-report');
    if (!container) return;
    const top = container.getBoundingClientRect().top;
    const h = Math.max(800, window.innerHeight - top - 2);
    this.containerStyle = { height: `${h}px` };
  }

  constructor(
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    private _manufacturingRequisitionWbService: ManufacturingRequisitionWbService,
    private _wbManufacturingOutputService: WbManufacturingOutputService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.hasPrice   = this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[9]);
    this.hasStatus  = this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[1]);
    this.hasConfirm = this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[15]) ||
                      this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[16]);
  }

  numFmt(value: any): string {
    return value != null ? Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
  }

  statusClass(row: any): string {
    return row?.status != null ? `manufacturing_status_${row.status}` : '';
  }

  canApprove(row: any): boolean {
    return this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[15]) && row?.is_approved == '0';
  }

  canCancel(row: any): boolean {
    return this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[16]) && row?.is_approved == '1';
  }

  loadData(event: any) {
    this.loading = true;
    const first    = event?.first ?? 0;
    const rowCount = event?.rows  ?? this.tableRows;
    this.tableFirst = first;
    this.tableRows  = rowCount;

    const sortModel: any[] = [];
    if (event?.sortField) {
      sortModel.push({ colId: event.sortField, sort: event.sortOrder === 1 ? 'asc' : 'desc' });
    }

    this._manufacturingRequisitionWbService.selectAllLazy({
      startRow:    first,
      endRow:      first + rowCount,
      sortModel,
      filterModel: this.getExternalFilterModel(),
    }).subscribe({
      next: (res: any) => {
        this.rows                 = Array.isArray(res?.rows) ? res.rows : [];
        this.totalRows            = Number(res?.totalRows ?? res?.lastRow ?? 0);
        this.grandFabricPiece     = Number(res?.grandFabricPiece    ?? 0);
        this.grandQuantity        = Number(res?.grandQuantity        ?? 0);
        this.grandCurrentQuantity = Number(res?.grandCurrentQuantity ?? 0);
        this.availableFilters     = res.availableFilters || this.availableFilters;
        this.loading = false;
      },
      error: () => {
        this.rows    = [];
        this.loading = false;
      },
    });
  }

  private reload() {
    this.loadData({ first: this.tableFirst, rows: this.tableRows });
  }

  private formatDateForFilter(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d} 00:00:00`;
  }

  private getExternalFilterModel(): any {
    const model: any = {};
    const d = this.externalDateFilters;
    if (d?.length >= 2 && d[0] && d[1]) {
      model['date'] = {
        filterType: 'date', type: 'inRange',
        dateFrom: this.formatDateForFilter(d[0]),
        dateTo:   this.formatDateForFilter(d[1]),
      };
    }
    const addSet = (key: string, values: string[]) => {
      if (values?.length) model[key] = { filterType: 'set', values };
    };
    addSet('manufacture_name',                this.externalManufactureName);
    addSet('seller_name',                     this.externalSellerName);
    addSet('status_name',                     this.externalStatusName);
    addSet('is_approved_status_name',         this.externalIsApprovedStatusName);
    addSet('fabric_code',                     this.externalFabricCode);
    addSet('fabric_name',                     this.externalFabricName);
    addSet('circular_knitting_machine_name',  this.externalMachineName);
    addSet('wc_fabric_order_requisition_name', this.externalWcOrderName);
    addSet('order_number',                    this.externalOrderNumber);
    addSet('consigment_number',               this.externalConsigmentNumber);
    addSet('note',                            this.externalNote);
    addSet('document',                        this.externalDocument);
    addSet('quantity',                        this.externalQuantity.map(String));
    return model;
  }

  private clearExternalFilters() {
    this.externalDateFilters          = null;
    this.externalManufactureName      = [];
    this.externalSellerName           = [];
    this.externalStatusName           = [];
    this.externalIsApprovedStatusName = [];
    this.externalFabricCode           = [];
    this.externalFabricName           = [];
    this.externalMachineName          = [];
    this.externalWcOrderName          = [];
    this.externalOrderNumber          = [];
    this.externalConsigmentNumber     = [];
    this.externalNote                 = [];
    this.externalDocument             = [];
    this.externalQuantity             = [];
  }

  applyFiltersToGrid() {
    const extModel = this.getExternalFilterModel();
    this.isFiltered = Object.keys(extModel).length > 0;
    this.tableFirst = 0;
    this.loadData({ first: 0, rows: this.tableRows });
  }

  clearAg() {
    this.clearExternalFilters();
    this.isFiltered = false;
    this.tableFirst = 0;
    this.loadData({ first: 0, rows: this.tableRows });
  }

  navigateToDetails(event: MouseEvent, row: any) {
    let url: string;
    if (String(row.is_order) === '0') {
      url = `${window.location.pathname}/details?id=${encodeURIComponent(row.id)}&industryId=${encodeURIComponent(row.manufacture_id)}&fabricId=${encodeURIComponent(row.fabric_id)}&isOrder=${row.is_order}&wbManufacturingOutputId=${encodeURIComponent(row.wb_manufacturing_output_id)}`;
    } else {
      url = `/dashboard/${this._constantsService.ROUTING_LINKS[139]}?id=${encodeURIComponent(row.id)}&sellerName=${encodeURIComponent(row.seller_name || '')}&orderNumber=${encodeURIComponent(row.order_number || '')}&manufacturingOrderRequisitionDetailsId=${encodeURIComponent(row.manufacturing_order_requisition_details_wb_id || '')}`;
    }
    if (event.ctrlKey) window.open(url, '_blank');
    else this.router.navigateByUrl(url);
  }

  openUpdateStoragePlace(element: any) {
    const wcId = element?.wc_id;
    if (!wcId) { this._constantsService.userErrorMessage(); return; }
    this.selectedWcIds           = [String(wcId)];
    this.selectedStoragePlace    = element?.storage_place ?? '';
    this.selectedStorageReportParams = {
      id:                        element?.fabric_id ?? '',
      warehouseId:               element?.warehouse_id ?? '',
      consigmentManufacturingId: element?.consigment_manufacturing_id ?? '',
      fabricOrderId:             element?.wc_fabric_order_requisition_id ?? '',
      code:                      element?.fabric_code ?? '',
      name:                      element?.fabric_name ?? '',
      consigmentNumber:          element?.consigment_number ?? '',
      warehouseName:             element?.warehouse_name ?? '',
    };
    this.showUpdatePanel = true;
  }

  handleStorageUpdated(_event: any) {
    this.selectedWcIds               = [];
    this.selectedStoragePlace        = '';
    this.selectedStorageReportParams = null;
    this.showUpdatePanel             = false;
    this.reload();
  }

  handleStatusUpdated(_updatedRow: any) {
    this.selectedDataToUpdate = null;
    this.reload();
  }

  confirmCancelReceived(event: Event, element: any, isApproved: any) {
    if (isApproved == '0') {
      this.popupReceived(event, element, 'تأكيد الأستلام', '1');
    } else if (isApproved == '1') {
      this.popupReceived(event, element, 'إلغاء الأستلام', '0');
    }
  }

  popupReceived(event: Event, element: any, message: string, isApproved: string) {
    this.confirmationService.confirm({
      target: event.target!,
      message,
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.executeConfirmReceived(element, isApproved),
      reject: () => {},
    });
  }

  executeConfirmReceived(data: any, isApproved: string) {
    this._constantsService.spinner.show();
    const formData = {
      isApproved,
      personid:  this._sessionManagerService.Person_ID,
      ipaddress: this._sessionManagerService.IP_ADDRESS,
    };
    this._wbManufacturingOutputService.confirmReceived(formData, data.wb_manufacturing_output_id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == 'data updated') {
        this._constantsService.successUpdateMessage();
        this.reload();
      } else {
        this._constantsService.userErrorMessage();
      }
    });
  }

  scrollToUpdateForm() {
    setTimeout(() => document.getElementById('update-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  scrollToStoragePanel() {
    setTimeout(() => document.getElementById('update-storage-place-panel')?.scrollIntoView({ behavior: 'smooth' }), 100);
  }
}
