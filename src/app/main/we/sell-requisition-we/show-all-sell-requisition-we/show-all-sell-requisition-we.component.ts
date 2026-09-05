import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { SellRequisitionWeService } from "src/app/services/main/we/sell-requisition-we.service";

@Component({
  selector: 'app-show-all-sell-requisition-we',
  templateUrl: './show-all-sell-requisition-we.component.html',
  styleUrls: ['./show-all-sell-requisition-we.component.css'],
  providers: [ConfirmationService]
})
export class ShowAllSellRequisitionWeComponent implements OnInit, AfterViewInit {

  titlePage = '';
  isFiltered = false;
  showFilters = true;

  rows: any[] = [];
  totalRows = 0;
  loading = false;
  tableFirst = 0;
  tableRows = 50;
  containerStyle: any = {};

  grandTotalQty = 0;
  grandTotalFabricPiece = 0;

  availableFilters: any = {
    seller_name:          [],
    details_fabric:       [],
    details_order:        [],
    details_color:        [],
    details_work_order:   [],
    details_grade_item:   [],
  };

  externalDateFilters: any     = null;
  externalSellerName:    string[] = [];
  externalDetailsFabric: string[] = [];
  externalDetailsOrder:  string[] = [];
  externalDetailsColor:  string[] = [];
  externalDetailsWorkOrder:  string[] = [];
  externalDetailsGradeItem:  string[] = [];

  filteredWorkOrders: string[] = [];

  filterWorkOrders(event: any) {
    const q = (event.query ?? '').toLowerCase();
    this.filteredWorkOrders = (this.availableFilters.details_work_order || [])
      .map(String)
      .filter((v: string) => v.toLowerCase().includes(q));
  }

  get isDirect(): boolean {
    return this.router.url.includes('show-all-sell-requisition-direct-we');
  }

  rowCanApprove(row: any): boolean {
    return this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[17])
      && row?.is_approved == '0';
  }

  rowCanCancel(row: any): boolean {
    return this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[18])
      && row?.is_approved == '1';
  }

  rowDetails(row: any): any[] {
    return Array.isArray(row?.details) ? row.details : [];
  }

  rowTotalQty(row: any): number {
    return this.rowDetails(row).reduce((s: number, d: any) => s + Number(d.quantity || 0), 0);
  }

  rowTotalPieces(row: any): number {
    return this.rowDetails(row).reduce((s: number, d: any) => s + Number(d.fabric_piece || 0), 0);
  }

  numFmt(value: any): string {
    return value != null
      ? Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : '';
  }

  detailsUrl(row: any): string {
    const isDirect = String(row.is_direct) === '1';
    const path = isDirect
      ? `/dashboard/show-all-sell-requisition-direct-we/details`
      : `${window.location.pathname}/details`;
    return `${path}?id=${encodeURIComponent(row.id)}`;
  }

  navigateToDetails(event: MouseEvent, row: any) {
    const url = this.detailsUrl(row);
    if (event.ctrlKey) window.open(url, '_blank');
    else this.router.navigateByUrl(url);
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
    const h = Math.max(300, window.innerHeight - top - 2);
    this.containerStyle = { height: `${h}px` };
  }

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _sellRequisitionWeService: SellRequisitionWeService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.isDirect) {
      this.titlePage = 'إظهار جميع اذونات التسليم المباشر';
    } else {
      this.titlePage = 'إظهار جميع اذونات بيع القماش';
    }
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

    this._sellRequisitionWeService.selectAllLazy({
      startRow:    first,
      endRow:      first + rowCount,
      sortModel,
      filterModel: this.getExternalFilterModel(),
      isDirect:    this.isDirect,
    }).subscribe({
      next: (res: any) => {
        this.rows               = Array.isArray(res?.rows) ? res.rows : [];
        this.totalRows          = Number(res?.totalRows ?? res?.lastRow ?? 0);
        this.grandTotalQty      = Number(res?.grandTotalQty ?? 0);
        this.grandTotalFabricPiece = Number(res?.grandTotalFabricPiece ?? 0);
        this.availableFilters   = res.availableFilters || this.availableFilters;
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
    addSet('seller_name',        this.externalSellerName);
    addSet('details_fabric',     this.externalDetailsFabric);
    addSet('details_order',      this.externalDetailsOrder);
    addSet('details_color',      this.externalDetailsColor);
    addSet('details_work_order', this.externalDetailsWorkOrder);
    addSet('details_grade_item', this.externalDetailsGradeItem);
    return model;
  }

  private clearExternalFilters() {
    this.externalDateFilters      = null;
    this.externalSellerName       = [];
    this.externalDetailsFabric    = [];
    this.externalDetailsOrder     = [];
    this.externalDetailsColor     = [];
    this.externalDetailsWorkOrder = [];
    this.externalDetailsGradeItem = [];
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
    this._sellRequisitionWeService.confirmReceived(formData, data.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg === 'data updated') {
        this._constantsService.successUpdateMessage();
        this.reload();
      } else {
        this._constantsService.userErrorMessage();
      }
    });
  }
}
