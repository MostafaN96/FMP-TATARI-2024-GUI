import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

import { ExportDataService } from 'src/app/services/export-data.service';

// Child Components
import { InquireFabricAvilabilitySharedDetailsReportWdComponent } from "src/app/main/wd/reports/inquire-fabric-avilability-shared-details-report-wd/inquire-fabric-avilability-shared-details-report-wd.component";
import { InquireFabricAvilabilitySharedTotalReportWdComponent } from "src/app/main/wd/reports/inquire-fabric-avilability-shared-total-report-wd/inquire-fabric-avilability-shared-total-report-wd.component";

@Component({
  selector: 'app-inquire-fabric-avilability-by-dyeing-order-report-wd',
  templateUrl: './inquire-fabric-avilability-by-dyeing-order-report-wd.component.html',
  styleUrls: ['./inquire-fabric-avilability-by-dyeing-order-report-wd.component.css']
})
export class InquireFabricAvilabilityByDyeingOrderReportWdComponent implements OnInit {


  // Child Components
  @ViewChild(InquireFabricAvilabilitySharedDetailsReportWdComponent, { static: true }) inquireFabricAvilabilitySharedDetailsReportWd!: InquireFabricAvilabilitySharedDetailsReportWdComponent;
  @ViewChild(InquireFabricAvilabilitySharedTotalReportWdComponent, { static: true }) inquireFabricAvilabilitySharedTotalReportWd!: InquireFabricAvilabilitySharedTotalReportWdComponent;


  ///////////////////////////////// General ////////////////////////////////////////////////
  dyeingOrderRequisitionIds: any = []
  isShowReport:any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
    public _exportDataService: ExportDataService,

  ) {
  //   this._sharedComponentService.eventCallback$.subscribe(value => {
  //     console.log("value :::: ", value); 
  //     this.dyeingOrderRequisitionIds = value

  //     this.inquireFabricAvilabilitySharedDetailsReportWd.getDataByDyeingRequisition(this.dyeingOrderRequisitionIds)
  // });
  }

  ngOnInit(): void {
    this.dyeingOrderRequisitionIds = JSON.parse(localStorage.getItem("dyeingOrderRequisitionIds") || ""); 
    this.inquireFabricAvilabilitySharedDetailsReportWd.getDataByDyeingRequisition(this.dyeingOrderRequisitionIds)
    this.inquireFabricAvilabilitySharedTotalReportWd.getDataByDyeingRequisitionTotal(this.dyeingOrderRequisitionIds)
  }


}


