import { Component, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { ReconcilitionRequisitionDetailsWbService } from "src/app/services/main/wb/reconcilition-requisition-details-wb.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reconcilition-requisition-details-wb',
  templateUrl: './reconcilition-requisition-details-wb.component.html',
  styleUrls: ['./reconcilition-requisition-details-wb.component.css']
})
export class ReconcilitionRequisitionDetailsWbComponent implements OnInit {

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
    private _reconcilitionRequisitionDetailsWbService: ReconcilitionRequisitionDetailsWbService,
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
        this._reconcilitionRequisitionDetailsWbService.selectOne(params['id']).subscribe((response: any) => {
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
