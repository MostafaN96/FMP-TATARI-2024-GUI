import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { ReconcilitionRequisitionDetailsWcService } from "src/app/services/main/wc/reconcilition-requisition-details-wc.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reconciliation-requisition-details-wc',
  templateUrl: './reconciliation-requisition-details-wc.component.html',
  styleUrls: ['./reconciliation-requisition-details-wc.component.css']
})
export class ReconciliationRequisitionDetailsWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  requisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reconcilitionRequisitionDetailsWcService: ReconcilitionRequisitionDetailsWcService,
    public _exportDataService: ExportDataService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    private primengConfig: PrimeNGConfig,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.loading = true;

    this.route.queryParams
      .subscribe(params => {
        this._reconcilitionRequisitionDetailsWcService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.requisitionDetails = response

          // PrimeNG Table
          this.primengConfig.ripple = true;
          this.loading = false;
        })
      });
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }

  showAddDetailsFunc() {
    this.selectedDataToDetails = this.requisitionDetails
    this.showAddDetails = true;
  }

}
