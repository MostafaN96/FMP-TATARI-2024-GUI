import { Component, Input, OnInit, ViewChild } from '@angular/core';

// Form Services
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { ReportWeService } from "src/app/services/main/we/report-we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from 'src/app/services/export-data.service';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-inquire-fabric-avilability-shared-report-wd',
  templateUrl: './inquire-fabric-avilability-shared-report-wd.component.html',
  styleUrls: ['./inquire-fabric-avilability-shared-report-wd.component.css']
})
export class InquireFabricAvilabilitySharedReportWdComponent implements OnInit {

  @Input() inquireFabricForm: any
  @Input() data: any

  ///////////////////////////////// General ////////////////////////////////////////////////
  dataReport: any = {
    weFabrics: [],
    wdFabrics: [],
    wdFormFabrics: [],
    wcFabrics: [],
    wbYarns: [],
    waYarns: []
  }

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;

  constructor(
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
    private _reportWeService: ReportWeService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    protected patterns: ValidatorPatternService,

  ) {
  }

  ngOnInit(): void {
    // if(this.router.url === '/dashboard/show-all-dyed-fabric') {
    //   this.getDataByDyeingRequisition()
    // }
  
  }


  async onSubmitForm() {
    
    this.inquireFabricForm.markAllAsTouched();
    if (this.inquireFabricForm.valid) {
      this._reportWeService.inquireFabricAvilabilityReportWe(this.inquireFabricForm.value).subscribe((response: any) => {
        this.dataReport = response
        console.log("this.dataReport :::::::::: ", this.dataReport);
        
        
      })
    } else {
      this.dataReport = {
        weFabrics: [],
        wdFabrics: [],
        wdFormFabrics: [],
        wcFabrics: [],
        wbYarns: [],
        waYarns: []
      }
    }
  }

}

