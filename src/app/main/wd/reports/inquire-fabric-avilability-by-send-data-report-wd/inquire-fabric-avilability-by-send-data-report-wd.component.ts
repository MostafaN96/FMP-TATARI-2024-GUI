import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { FabricService } from "src/app/services/main/fabric.service";
import { DyeingColorsPricesService } from "src/app/services/main/dyeing-colors-prices.service";
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

import { ExportDataService } from 'src/app/services/export-data.service';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

// Child Components
import { InquireFabricAvilabilitySharedReportWdComponent } from "src/app/main/wd/reports/inquire-fabric-avilability-shared-report-wd/inquire-fabric-avilability-shared-report-wd.component";

@Component({
  selector: 'app-inquire-fabric-avilability-by-send-data-report-wd',
  templateUrl: './inquire-fabric-avilability-by-send-data-report-wd.component.html',
  styleUrls: ['./inquire-fabric-avilability-by-send-data-report-wd.component.css']
})
export class InquireFabricAvilabilityBySendDataReportWdComponent implements OnInit {

  data: any = []
  fabric: any = []
  colorCodes: any = []

  // Child Components
  @ViewChild(InquireFabricAvilabilitySharedReportWdComponent, { static: true }) inquireFabricAvilabilitySharedReportWd!: InquireFabricAvilabilitySharedReportWdComponent;

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  inquireFabricForm = new FormGroup({
    dyedFabricId: new FormControl("", [Validators.required]),
    fabricId: new FormControl("", [Validators.required]),
    colorId: new FormControl("", [Validators.required]),
    colorCode: new FormControl("", [Validators.required]),
    wasteRatio: new FormControl(null, [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumberNotZero)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////


  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;
  // --------------- Color --------------
  // maps the appropriate column to fields property
  public fieldsColorCode: Object = { value: "code", text: "code" };
  // set the placeholder to the AutoComplete input
  public textColorCode: string = "كود اللون"

  public onFilteringColorCode(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colorCodes, query);
  }
  constructor(
    private _fabricService: FabricService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
    public _exportDataService: ExportDataService,
    protected patterns: ValidatorPatternService,
    private router: Router,
    private _dyeingColorsPricesService: DyeingColorsPricesService,

  ) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    let inquireFabricData = JSON.parse(localStorage.getItem("inquireFabricData") || ""); 
    
    this.data = inquireFabricData
    if (inquireFabricData != undefined) {
      
      this._fabricService.selectFabricByDyedFabric(inquireFabricData.data.dyedFabricId).subscribe((response: any) => {
        this.fabric = response

        this.inquireFabricForm.controls['dyedFabricId'].setValue(inquireFabricData.data.dyedFabricId)
        this.inquireFabricForm.controls['fabricId'].setValue(this.fabric[0].fabric_id)
        this.inquireFabricForm.controls['wasteRatio'].setValue(inquireFabricData.data.wastRatio)
        this.inquireFabricForm.controls['colorId'].setValue(inquireFabricData.data.colorId)
        this.inquireFabricForm.controls['colorCode'].setValue(inquireFabricData.data.colorCode)
        this.inquireFabricForm.controls['quantity'].setValue(inquireFabricData.data.quantity)
        this.inquireFabricAvilabilitySharedReportWd.onSubmitForm()

        this._dyeingColorsPricesService.selectByColorId(inquireFabricData.data.colorId).subscribe((responseColorCodes: any) => {
          this.colorCodes = responseColorCodes

        })

        localStorage.removeItem("inquireFabricData")
      })
    }
  }

  //  Color
  selectColorCodes(index: { itemData: any; }) {
    let indexData = this.colorCodes.indexOf(index.itemData)
    if (this.colorCodes[indexData] !== index.itemData) {
      this.inquireFabricForm.controls['colorCode'].setValue("")
      this.data.colorName = ""
    }
    else {
      this.inquireFabricForm.controls['colorCode'].setValue(index.itemData.code)
      this.data.colorName = index.itemData.code
    }
    this.inquireFabricAvilabilitySharedReportWd.onSubmitForm()

  }

  async onSubmitForm() {
    this.inquireFabricAvilabilitySharedReportWd.onSubmitForm()
    // this.onSubmitFormFun.emit();
  }


}

