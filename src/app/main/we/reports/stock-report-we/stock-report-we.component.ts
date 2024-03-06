import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Call Service
import { WeService } from "src/app/services/main/we/we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Child Components
import { CurrentStockReportWeComponent } from "../../reports/current-stock-report-we/current-stock-report-we.component";

@Component({
  selector: 'app-stock-report-we',
  templateUrl: './stock-report-we.component.html',
  styleUrls: ['./stock-report-we.component.css']
})
export class StockReportWeComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport')currentStockReport!:CurrentStockReportWeComponent;

  constructor(
  public _sharedComponentService: SharedComponentService,
 private _weService: WeService,
 public _exportDataService: ExportDataService,
) {
  this._sharedComponentService.configRouterReloadPage()

}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._weService.selectStoreWe().subscribe((response: any) => {
      this.currentStockReport.dyersAndRequisitionsFabrics = response
      this.currentStockReport.isShowSelection = false
      this.currentStockReport.isShowPrice = false
      this.currentStockReport.isShowValue = false
      this.currentStockReport.isShowUpdateStoragePlace = true
      this.currentStockReport.isShowNotes = true
      this.currentStockReport.isShowOrderNumber = true
      this.currentStockReport.isShowOrderCustomerName = true
      this.currentStockReport.isShowSoldedDirectQuantity = true
      this.currentStockReport.listen();
    })
  }

}
