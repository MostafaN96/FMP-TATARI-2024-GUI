import { Component, ElementRef, ViewChild } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatCheckboxChange } from '@angular/material/checkbox';

/**
 * Base class for inventory report components
 * Handles common loading logic and data fetching
 * Child components only need to implement getRegularBalances and getClosedBalances
 */
@Component({
  template: '',
})
export abstract class BaseInventoryReportComponent {
  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;

  isLoading = false;
  gridApi!: GridApi;
  gridColumnApi: any;
  gridParams!: GridReadyEvent;

  abstract getRegularBalances(params: GridReadyEvent): void;
  abstract getClosedBalances(params: GridReadyEvent): void;
  abstract applyGridData(params: GridReadyEvent, data: any): void;

  /**
   * Called when grid is ready - loads regular balances initially
   */
  onGridReady(params: GridReadyEvent): void {
    this.gridParams = params;
    this.getData(this.gridParams, 'regular');
  }

  /**
   * Called when user toggles closed/open balances checkbox
   */
  onToggleBalanceType(event: MatCheckboxChange): void {
    const balanceType = event.checked ? 'closed' : 'regular';
    this.getData(this.gridParams, balanceType);
  }

  /**
   * Routes to correct data fetching based on balance type
   */
  getData(params: GridReadyEvent, balanceType: string): void {
    if (balanceType === 'closed') {
      this.getClosedBalances(params);
    } else {
      this.getRegularBalances(params);
    }
  }
}
