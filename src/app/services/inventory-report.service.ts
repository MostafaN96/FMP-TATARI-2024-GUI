import { Injectable } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';

/**
 * Shared service for managing inventory report loading state and data fetching logic
 * Eliminates code duplication across report components
 */
@Injectable({
  providedIn: 'root'
})
export class InventoryReportService {

  /**
   * Fetch regular balances from a service
   * @param serviceMethod - The method to call on your service (e.g., selectInverntoryDetails)
   * @param params - Grid ready event parameters
   * @param onSuccess - Callback when data is loaded
   * @param onError - Callback on error
   */
  fetchData(
    serviceMethod: (options: any) => any,
    params: GridReadyEvent,
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
    options: any = {}
  ): void {
    serviceMethod(options).subscribe(
      (response: any) => {
        onSuccess(response);
      },
      (error: any) => {
        console.error('Error loading data:', error);
        onError(error);
      }
    );
  }

  /**
   * Apply grid data and handle scroll positioning
   * @param data - Data to set in the grid
   * @param gridApi - AG Grid API
   * @param agGridElement - Reference to the grid element
   * @param onComplete - Callback when data is applied
   */
  applyDataToGrid(
    data: any,
    gridApi: any,
    columnApi: any,
    agGridElement: any,
    onComplete: () => void
  ): void {
    gridApi.setRowData(data);

    requestAnimationFrame(() => setTimeout(() => {
      onComplete();
    }, 100));

    setTimeout(() => {
      const viewport = agGridElement.nativeElement?.querySelector('.ag-center-cols-viewport');
      if (viewport) viewport.scrollLeft = viewport.scrollWidth;
    }, 100);
  }
}
