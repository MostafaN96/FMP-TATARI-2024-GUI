import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

import { DyedFabricOrderRequisitionWeService } from 'src/app/services/main/we/dyed-fabric-order-requisition-we.service';
import { ColorService } from 'src/app/services/main/color.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedComponentService } from 'src/app/services/shared-component.service';

/**
 * استيراد طلبيات العميل من ملف إكسل: يقرأ السيستم الملف ويقترح طلبية لكل ورقة،
 * والمستخدم يراجع: القماش لكل عمود، واللون لكل نص لون، والأسطر وكمياتها، ثم يحفظ.
 * كل ما يؤكده المستخدم يتعلّمه السيستم للمرة القادمة.
 */
type Confidence = 'exact' | 'ambiguous' | 'other-customer' | 'fuzzy' | 'guess' | 'none';

interface ImportColumn {
  header: string;
  include: boolean;
  dyedFabricId: string | null;
  fabricWidth: string;
  fabricQuantityM2: string;
  wasteRatio: any;
  confidence: Confidence | string;
  alternatives: string[];
}

interface ImportColor {
  colorText: string;
  colorId: string | null;
  colorCategoryId: string;
  colorCode: string;
  confidence: Confidence | string;
  alternatives: string[];
}

interface ImportOrder {
  sheetName: string;
  source: string;
  include: boolean;
  name: string;
  note: string;
  columns: ImportColumn[];
  colors: ImportColor[];
  lines: any[];
}

@Component({
  selector: 'app-dyed-fabric-order-import-excel-we',
  templateUrl: './dyed-fabric-order-import-excel-we.component.html',
  styleUrls: ['./dyed-fabric-order-import-excel-we.component.css']
})
export class DyedFabricOrderImportExcelWeComponent implements OnInit, OnChanges {

  @Input() sellers: any[] = [];
  @Input() dyedFabrics: any[] = [];
  @Output() closed = new EventEmitter<void>();

  colors: any[] = [];
  isBusy = false;
  token: string | null = null;
  originalName = '';
  sellerId: string | null = null;
  date = new Date().toISOString().slice(0, 10);
  orders: ImportOrder[] = [];
  skippedSheets: any[] = [];
  defaultColorCategoryId = '';
  created: any[] = [];
  failed: any[] = [];

  // Auto Complete
  // ejs-autocomplete يعرض «القيمة» كما هي في الحقل: لو كانت id يظهر الرقم بدل الاسم عند التعبئة المسبقة.
  // لذلك القيمة = الاسم المعروض، والـ id يُؤخذ من itemData عند الاختيار.
  public autofill = true;
  public fieldsSeller: Object = { value: 'name', text: 'name' };
  public fieldsFabric: Object = { value: 'name', text: 'name' };
  public fieldsColor: Object = { value: 'color_name_code', text: 'color_name_code' };

  private fabricById = new Map<string, any>();
  private colorById = new Map<string, any>();

  constructor(
    private _orderService: DyedFabricOrderRequisitionWeService,
    private _colorService: ColorService,
    public _constantsService: ConstantsService,
    public _sharedComponentService: SharedComponentService,
  ) { }

  ngOnInit(): void {
    this.defaultColorCategoryId = this._constantsService.DEFAULT_COLOR_CATEGORY_ID;
    this._colorService.selectByCategory(this.defaultColorCategoryId).subscribe((response: any) => {
      this.colors = Array.isArray(response) ? response : [];
      this.colorById = new Map(this.colors.map((c: any) => [c.id, c]));
    });
  }

  ngOnChanges(): void {
    this.fabricById = new Map((this.dyedFabrics || []).map((f: any) => [f.id, f]));
  }

  ///////////////////// حالة العرض /////////////////////

  // الطلبية المعروضة تفاصيلها (بطاقات الطلبيات بدل التبويبات)
  activeSheet: string | null = null;
  isDragOver = false;
  // أسطر كل طلبية مطوية افتراضياً حين تكثر
  expandedLines = new Set<string>();

  get activeOrder(): ImportOrder | undefined {
    return this.orders.find((o) => o.sheetName === this.activeSheet) ?? this.orders[0];
  }

  selectOrder(order: ImportOrder) { this.activeSheet = order.sheetName; }

  get step(): number {
    if (this.created.length && !this.orders.length) return 3;
    return this.token ? 2 : 1;
  }

  linesVisible(order: ImportOrder) {
    return order.lines.length <= 25 || this.expandedLines.has(order.sheetName);
  }

  toggleLines(order: ImportOrder) {
    if (this.expandedLines.has(order.sheetName)) this.expandedLines.delete(order.sheetName);
    else this.expandedLines.add(order.sheetName);
  }

  // عدّاد ما يحتاج انتباهاً في قسم (أقمشة/ألوان)
  columnStats(order: ImportOrder) {
    const active = order.columns.filter((c) => c.include);
    return {
      total: order.columns.length,
      missing: active.filter((c) => !c.dyedFabricId).length,
      check: active.filter((c) => c.dyedFabricId && c.confidence !== 'exact').length,
      ignored: order.columns.length - active.length,
    };
  }

  colorStats(order: ImportOrder) {
    return {
      total: order.colors.length,
      missing: order.colors.filter((c) => !c.colorId || !String(c.colorCode).trim()).length,
      check: order.colors.filter((c) => c.colorId && c.confidence !== 'exact').length,
    };
  }

  orderStatus(order: ImportOrder): 'off' | 'ready' | 'check' | 'missing' {
    if (!order.include) return 'off';
    if (this.problems(order).length) return 'missing';
    const c = this.columnStats(order), k = this.colorStats(order);
    return c.check || k.check ? 'check' : 'ready';
  }

  get summary() {
    const orders = this.selectedOrders;
    return {
      orders: orders.length,
      lines: orders.reduce((s, o) => s + this.activeLines(o).length, 0),
      quantity: orders.reduce((s, o) => s + this.totalQuantity(o), 0),
      blocked: orders.filter((o) => this.problems(o).length).length,
    };
  }

  onDragOver(event: DragEvent) { event.preventDefault(); this.isDragOver = true; }
  onDragLeave() { this.isDragOver = false; }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) this.readFile(file);
  }

  ///////////////////// قراءة الملف /////////////////////

  onFileSelected(event: any) {
    const file: File | undefined = event.target?.files?.[0];
    event.target.value = '';
    if (file) this.readFile(file);
  }

  private readFile(file: File) {
    if (this.isBusy) return;
    if (!/\.(xlsx|xls|xlsm)$/i.test(file.name)) {
      this._constantsService.errorMessage('الملف يجب أن يكون إكسل (xlsx, xls, xlsm)');
      return;
    }
    this.isBusy = true;
    this.created = [];
    this.failed = [];
    this._orderService.importExcelParse(file)
      .pipe(finalize(() => this.isBusy = false))
      .subscribe({
        next: (response: any) => this.applyProposal(response),
        error: (error: any) => this._constantsService.errorMessage(
          error?.error?.msg === 'invalid file type' ? 'نوع الملف غير مسموح' : 'تعذّرت قراءة الملف'),
      });
  }

  // تغيير العميل يعيد الاقتراحات من ذاكرة هذا العميل
  onSellerChange(event: any) {
    if (!this.isUserChange(event)) return;
    const id = event?.itemData?.id ?? null;
    if (!id || id === this.sellerId || !this.token) { this.sellerId = id; return; }
    this.sellerId = id;
    this.isBusy = true;
    this._orderService.importExcelReparse(this.token, id)
      .pipe(finalize(() => this.isBusy = false))
      .subscribe({
        next: (response: any) => this.applyProposal(response, true),
        error: () => this._constantsService.errorMessage('انتهت صلاحية الملف، ارفعه من جديد'),
      });
  }

  // اقتراح الخادم (أسطر) ← أعمدة (قماش لكل عنوان) + ألوان (لون لكل نص) + أسطر
  private applyProposal(response: any, keepEdits = false) {
    const previous = keepEdits ? new Map(this.orders.map((o) => [o.sheetName, o])) : new Map();
    this.token = response.token;
    this.originalName = response.originalName;
    this.sellerId = response.sellerId;
    this.skippedSheets = response.skippedSheets || [];
    this.defaultColorCategoryId = response.defaultColorCategoryId || this.defaultColorCategoryId;

    this.orders = (response.orders || []).map((o: any) => this.mapOrder(o, previous.get(o.sheetName)));
    if (!this.orders.some((o) => o.sheetName === this.activeSheet)) this.activeSheet = this.orders[0]?.sheetName ?? null;
  }

  private mapOrder(o: any, prev?: ImportOrder): ImportOrder {
      const columns = new Map<string, ImportColumn>();
      const colors = new Map<string, ImportColor>();
      for (const l of o.lines) {
        const h = l.source.header;
        if (!columns.has(h)) {
          columns.set(h, {
            header: h,
            include: !l.ignoredByMemory,
            dyedFabricId: l.dyedFabricId,
            fabricWidth: l.fabricWidth ?? '',
            fabricQuantityM2: l.fabricQuantityM2 ?? '',
            wasteRatio: l.wasteRatio ?? 0,
            confidence: l.ignoredByMemory ? 'exact' : l.fabricConfidence,
            alternatives: l.fabricAlternatives || [],
          });
        }
        const c = l.source.colorText || '';
        if (!colors.has(c)) {
          colors.set(c, {
            colorText: c,
            colorId: l.colorId,
            colorCategoryId: l.colorCategoryId || this.defaultColorCategoryId,
            colorCode: l.colorCode || '',
            confidence: l.colorConfidence,
            alternatives: l.colorAlternatives || [],
          });
        }
      }
      return {
        sheetName: o.sheetName,
        source: o.source,
        include: prev ? prev.include : o.include,
        name: prev ? prev.name : o.name,
        note: prev ? prev.note : o.note,
        columns: [...columns.values()],
        colors: [...colors.values()],
        lines: o.lines.map((l: any) => ({ source: l.source, include: true, quantity: l.quantity })),
      };
  }

  // ورقة لم يعرف القارئ شكلها: قراءتها بالذكاء الاصطناعي المحلي ثم إضافتها كطلبية للمراجعة
  aiReadingSheet: string | null = null;
  readSheetWithAi(sheet: any) {
    if (!this.token || this.aiReadingSheet) return;
    this.aiReadingSheet = sheet.sheetName;
    this._orderService.importExcelReadSheetAi(this.token, this.sellerId, sheet.sheetName)
      .pipe(finalize(() => this.aiReadingSheet = null))
      .subscribe({
        next: (response: any) => {
          if (!response?.order) return;
          this.orders = [...this.orders.filter((o) => o.sheetName !== sheet.sheetName), this.mapOrder(response.order)];
          this.activeSheet = sheet.sheetName;
          this.skippedSheets = this.skippedSheets.filter((s) => s.sheetName !== sheet.sheetName);
        },
        error: (error: any) => this._constantsService.errorMessage(error?.error?.msg || 'تعذّرت قراءة الورقة'),
      });
  }

  ///////////////////// اختيار القماش واللون /////////////////////

  onFilteringFabric(e: any) {
    e.preventDefaultAction = true;
    const predicate = new Predicate('name', 'contains', e.text).or('code', 'contains', e.text);
    e.updateData(this.dyedFabrics, e.text ? new Query().where(predicate) : new Query());
  }

  onFilteringColor(e: any) {
    e.preventDefaultAction = true;
    const predicate = new Predicate('color_name_code', 'contains', e.text);
    e.updateData(this.colors, e.text ? new Query().where(predicate) : new Query());
  }

  onFilteringSeller(e: any) {
    e.preventDefaultAction = true;
    e.updateData(this.sellers, e.text ? new Query().where(new Predicate('name', 'contains', e.text)) : new Query());
  }

  // تعبئة الحقل بالاسم برمجياً تطلق change أيضاً (isInteracted = false): لا نعدّها اختياراً،
  // وإلا اختفى تنبيه «يحتاج تأكيداً» عن الاقتراحات قبل أن يراها المستخدم
  private isUserChange(event: any) { return event?.isInteracted !== false; }

  selectFabric(column: ImportColumn, event: any) {
    if (!this.isUserChange(event)) return;
    const fabric = event?.itemData;
    column.dyedFabricId = fabric?.id ?? null;
    if (fabric) {
      column.confidence = 'exact';
      if (column.wasteRatio == null || column.wasteRatio === '') column.wasteRatio = fabric.waste_ratio ?? 0;
      if (!column.fabricQuantityM2) column.fabricQuantityM2 = fabric.fabric_quantity_m2 ?? '';
    }
  }

  selectColor(color: ImportColor, event: any) {
    if (!this.isUserChange(event)) return;
    const item = event?.itemData;
    color.colorId = item?.id ?? null;
    color.colorCode = item?.code ?? '';
    color.colorCategoryId = this.defaultColorCategoryId;
    if (item) color.confidence = 'exact';
  }

  useFabricAlternative(column: ImportColumn, id: string) {
    const fabric = this.fabricById.get(id);
    if (fabric) this.selectFabric(column, { itemData: fabric });
  }

  useColorAlternative(color: ImportColor, id: string) {
    const item = this.colorById.get(id);
    if (item) this.selectColor(color, { itemData: item });
  }

  // نص الحقل المعبّأ مسبقاً (فارغ إن لم يُختر شيء)
  fabricLabel(id: string | null) { return id ? (this.fabricById.get(id)?.name ?? '') : ''; }
  colorLabel(id: string | null) { return id ? (this.colorById.get(id)?.color_name_code ?? '') : ''; }
  sellerName(id: string | null) { return id ? ((this.sellers || []).find((s: any) => s.id === id)?.name ?? '') : ''; }

  fabricName(id: string | null) { return id ? (this.fabricById.get(id)?.name ?? '—') : '—'; }
  colorName(id: string | null) { return id ? (this.colorById.get(id)?.color_name_code ?? '—') : '—'; }

  confidenceClass(confidence: string, hasValue: boolean) {
    if (!hasValue || confidence === 'none') return 'conf-missing';
    return confidence === 'exact' ? 'conf-ok' : 'conf-check';
  }

  trackBySheet = (_: number, o: ImportOrder) => o.sheetName;

  confidenceLabel(confidence: string) {
    switch (confidence) {
      case 'exact': return '';
      case 'ambiguous': return 'رُبط سابقاً بأكثر من خيار';
      case 'other-customer': return 'من عميل آخر';
      case 'fuzzy': return 'تشابه بالاسم';
      case 'guess': return 'تخمين من الاسم';
      default: return 'غير معروف';
    }
  }

  columnOf(order: ImportOrder, header: string) { return order.columns.find((c) => c.header === header)!; }
  colorOf(order: ImportOrder, text: string) { return order.colors.find((c) => c.colorText === (text || ''))!; }

  // أسطر ستُحفظ: السطر محدد وعموده غير متجاهل
  activeLines(order: ImportOrder) {
    return order.lines.filter((l) => l.include && this.columnOf(order, l.source.header).include);
  }

  // ما ينقص الطلبية قبل الحفظ
  problems(order: ImportOrder): string[] {
    const list: string[] = [];
    if (!order.name?.trim()) list.push('اسم الطلبية');
    const active = this.activeLines(order);
    if (!active.length) list.push('لا أسطر محددة');
    const missingFabric = order.columns.filter((c) => c.include && !c.dyedFabricId).length;
    if (missingFabric) list.push(`${missingFabric} عمود بلا قماش`);
    const usedColors = new Set(active.map((l) => l.source.colorText || ''));
    const missingColor = order.colors.filter((c) => usedColors.has(c.colorText) && (!c.colorId || !String(c.colorCode).trim())).length;
    if (missingColor) list.push(`${missingColor} لون بلا لون/كود`);
    if (active.some((l) => !(Number(l.quantity) > 0))) list.push('كمية غير صحيحة');
    return list;
  }

  get selectedOrders() { return this.orders.filter((o) => o.include); }
  get canSave() {
    return !!this.token && !!this.sellerId && !!this.date && this.selectedOrders.length > 0
      && this.selectedOrders.every((o) => !this.problems(o).length);
  }

  totalQuantity(order: ImportOrder) {
    return this.activeLines(order).reduce((s, l) => s + (Number(l.quantity) || 0), 0);
  }

  ///////////////////// الحفظ /////////////////////

  save() {
    if (!this.canSave || this.isBusy) return;
    const body = {
      token: this.token,
      sellerId: this.sellerId,
      date: new Date(this.date).toISOString(),
      orders: this.orders.map((o) => ({
        sheetName: o.sheetName,
        include: o.include,
        name: o.name,
        note: o.note,
        // كل سطر مع اختيارات عموده ولونه ومصدره في الملف (ليتعلّم السيستم منه)
        lines: o.lines.map((l) => {
          const col = this.columnOf(o, l.source.header);
          const color = this.colorOf(o, l.source.colorText);
          return {
            source: l.source,
            include: l.include && col.include,
            dyedFabricId: col.dyedFabricId,
            dyedFabricCode: this.fabricById.get(col.dyedFabricId || '')?.code ?? '',
            fabricWidth: col.fabricWidth,
            fabricQuantityM2: col.fabricQuantityM2,
            wasteRatio: col.wasteRatio,
            colorId: color.colorId,
            colorCategoryId: color.colorCategoryId,
            colorCode: color.colorCode,
            quantity: Number(l.quantity),
            note: l.source.model ? String(l.source.model).slice(0, 50) : '',
          };
        }),
      })),
    };
    this.isBusy = true;
    this._orderService.importExcelCommit(body)
      .pipe(finalize(() => this.isBusy = false))
      .subscribe({
        next: (response: any) => {
          this.created = response.created || [];
          this.failed = response.failed || [];
          if (this.created.length) this._constantsService.successAddMessage();
          if (this.failed.length) this._constantsService.errorMessage(`لم تُحفظ ${this.failed.length} طلبية`);
          // ما حُفظ يُزال من المراجعة، ويبقى ما فشل لتصحيحه
          const done = new Set(this.created.map((c: any) => c.sheetName));
          this.orders = this.orders.filter((o) => !done.has(o.sheetName));
          if (!this.orders.some((o) => o.sheetName === this.activeSheet)) this.activeSheet = this.orders[0]?.sheetName ?? null;
          if (!this.orders.length) this.token = null;
        },
        error: (error: any) => this._constantsService.errorMessage(error?.error?.msg || 'تعذّر الحفظ'),
      });
  }

  openOrder(id: string) {
    this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[188]}`, { id });
  }

  reset() {
    this.token = null;
    this.orders = [];
    this.skippedSheets = [];
    this.created = [];
    this.failed = [];
    this.sellerId = null;
  }
}
