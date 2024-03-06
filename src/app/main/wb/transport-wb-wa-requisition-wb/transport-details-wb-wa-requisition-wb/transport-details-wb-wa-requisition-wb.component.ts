import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { WbTransportWbWaRequisitionDetailsService } from "src/app/services/main/wb/wb-transport-wb-wa-requisition-details.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transport-details-wb-wa-requisition-wb',
  templateUrl: './transport-details-wb-wa-requisition-wb.component.html',
  styleUrls: ['./transport-details-wb-wa-requisition-wb.component.css']
})
export class TransportDetailsWbWaRequisitionWbComponent implements OnInit {

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
    private _wbTransportWbWaRequisitionDetailsService: WbTransportWbWaRequisitionDetailsService,
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
        this._wbTransportWbWaRequisitionDetailsService.selectByRequisitionId(params['id']).subscribe((response: any) => {
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
