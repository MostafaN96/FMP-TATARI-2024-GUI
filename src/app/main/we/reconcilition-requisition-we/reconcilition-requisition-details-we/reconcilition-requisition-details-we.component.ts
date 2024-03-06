import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReconcilitionRequisitionDetailsWeService } from "src/app/services/main/we/reconcilition-requisition-details-we.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reconcilition-requisition-details-we',
  templateUrl: './reconcilition-requisition-details-we.component.html',
  styleUrls: ['./reconcilition-requisition-details-we.component.css']
})
export class ReconcilitionRequisitionDetailsWeComponent implements OnInit {


  /////////////////// Variables ///////////////////
  reconciliationRequisitionDetails: any[] = []
  selectedDataToUpdate: any
  selectedDataToDetails: any
  showAddDetails = false

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reconcilitionRequisitionDetailsWeService: ReconcilitionRequisitionDetailsWeService,
    public _exportDataService: ExportDataService,
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
        this._reconcilitionRequisitionDetailsWeService.selectByRequisitionId(params['id']).subscribe((response: any) => {
          this.reconciliationRequisitionDetails = response

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
    this.selectedDataToDetails = this.reconciliationRequisitionDetails
    this.showAddDetails = true;
  }
}
