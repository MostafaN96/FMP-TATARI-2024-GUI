import { Component } from '@angular/core';

import { IFloatingFilterAngularComp } from 'ag-grid-angular';
import { IFloatingFilterParams } from 'ag-grid-community';

@Component({
    selector: 'app-details-multiselect-filter',
  templateUrl: './details-multiselect-filter.component.html',
  styleUrls: ['./details-multiselect-filter.component.css'],
})
export class DetailsMultiselectFilterComponent 
  implements IFloatingFilterAngularComp {

  // AG Grid params
  private params!: IFloatingFilterParams;

  // colIds (columns hidden for filtering)
  workOrderColId = '';
  fabricColId = '';
  colorColId = '';

  // options
  workOrderOptions: { label: string; value: string }[] = [];
  fabricOptions: { label: string; value: string }[] = [];
  colorOptions: { label: string; value: string }[] = [];

  // selected
  workOrderSelected: string[] = [];
  fabricSelected: string[] = [];
  colorSelected: string[] = [];

  // optional placeholders
  workOrderPlaceholder = 'أمر الشغل';
  fabricPlaceholder = 'نوع القماش';
  colorPlaceholder = 'اللون';

  agInit(params: IFloatingFilterParams): void {
    this.params = params;

    // params اللي بتيجي من columnDefs -> floatingFilterComponentParams
    const p: any = params;
    this.workOrderColId = p?.workOrderColId || '';
    this.fabricColId = p?.fabricColId || '';
    this.colorColId = p?.colorColId || '';

    // لو بدك تغيّر placeholders من الصفحة
    this.workOrderPlaceholder = p?.workOrderPlaceholder || this.workOrderPlaceholder;
    this.fabricPlaceholder = p?.fabricPlaceholder || this.fabricPlaceholder;
    this.colorPlaceholder = p?.colorPlaceholder || this.colorPlaceholder;

    // حمّل القوائم من set filters
    this.loadAllOptions();
  }

  onParentModelChanged(): void {
    // نحن نفلتر أعمدة أخرى (مخفية) لذلك ما نستخدم parentModel هون
  }

  // -------------------------
  // Options Loading
  // -------------------------
  private async loadAllOptions() {
    if (this.workOrderColId) this.workOrderOptions = await this.loadSetFilterValues(this.workOrderColId);
    if (this.fabricColId) this.fabricOptions = await this.loadSetFilterValues(this.fabricColId);
    if (this.colorColId) this.colorOptions = await this.loadSetFilterValues(this.colorColId);
  }

  private getFilterInstance(colId: string): Promise<any> {
    return new Promise((resolve) => {
      // AG Grid API uses callback style
      this.params.api.getFilterInstance(colId, (inst: any) => resolve(inst));
    });
  }

  private async loadSetFilterValues(colId: string): Promise<{ label: string; value: string }[]> {
    const inst: any = await this.getFilterInstance(colId);

    return new Promise((resolve) => {
      // agSetColumnFilter provides getValues(callback)
      inst?.getValues?.((vals: any[]) => {
        const options = (vals || [])
          .map(v => String(v))
          .filter(v => v.trim().length > 0)
          .sort((a, b) => a.localeCompare(b, 'ar'))
          .map(v => ({ label: v, value: v }));

        resolve(options);
      });

      // fallback لو inst ما عنده getValues لأي سبب
      if (!inst?.getValues) resolve([]);
    });
  }

  // -------------------------
  // Apply Filters
  // -------------------------
  async onWorkOrderChange(values: string[]) {
    this.workOrderSelected = values || [];
    await this.applySetFilterModel(this.workOrderColId, this.workOrderSelected);
  }

  async onFabricChange(values: string[]) {
    this.fabricSelected = values || [];
    await this.applySetFilterModel(this.fabricColId, this.fabricSelected);
  }

  async onColorChange(values: string[]) {
    this.colorSelected = values || [];
    await this.applySetFilterModel(this.colorColId, this.colorSelected);
  }

  private async applySetFilterModel(colId: string, values: string[]) {
    if (!colId) return;

    const inst: any = await this.getFilterInstance(colId);

    const model = values?.length ? { values } : null;
    inst?.setModel?.(model);

    // لازم ننادي onFilterChanged بعد ما نغير الموديل
    this.params.api.onFilterChanged();
  }

  // زر مسح الكل (اختياري)
  async clearAll() {
    this.workOrderSelected = [];
    this.fabricSelected = [];
    this.colorSelected = [];

    await this.applySetFilterModel(this.workOrderColId, []);
    await this.applySetFilterModel(this.fabricColId, []);
    await this.applySetFilterModel(this.colorColId, []);
  }
}