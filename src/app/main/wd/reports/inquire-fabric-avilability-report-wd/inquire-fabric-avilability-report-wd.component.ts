import { Component, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { DyeingColorsPricesService } from "src/app/services/main/dyeing-colors-prices.service";
import { ReportWeService } from "src/app/services/main/we/report-we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';
import { ExportDataService } from 'src/app/services/export-data.service';

// Child Components
import { InquireFabricAvilabilitySharedReportWdComponent } from "src/app/main/wd/reports/inquire-fabric-avilability-shared-report-wd/inquire-fabric-avilability-shared-report-wd.component";

@Component({
  selector: 'app-inquire-fabric-avilability-report-wd',
  templateUrl: './inquire-fabric-avilability-report-wd.component.html',
  styleUrls: ['./inquire-fabric-avilability-report-wd.component.css']
})
export class InquireFabricAvilabilityReportWdComponent implements OnInit {

    // Child Components
    @ViewChild(InquireFabricAvilabilitySharedReportWdComponent, {static : true})inquireFabricAvilabilitySharedReportWd!:InquireFabricAvilabilitySharedReportWdComponent;

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  inquireFabricForm = new FormGroup({
    dyedFabricId: new FormControl(null, [Validators.required]),
    fabricId: new FormControl(null, [Validators.required]),
    colorId: new FormControl(null, [Validators.required]),
    colorCode: new FormControl(null, [Validators.required]),
    wasteRatio: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumberNotZero)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any
  colors: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "fabric_name_code" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش"

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('fabric_name_code', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

  // --------------- Color --------------
  // maps the appropriate column to fields property
  public fieldsColor: Object = { value: "color_id", text: "color_name_code" };
  // set the placeholder to the AutoComplete input
  public textColor: string = "اللون"

  public onFilteringColor(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('color_name_code', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors, query);
  }

  constructor(
    private _fabricService: FabricService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _dyeingColorsPricesService: DyeingColorsPricesService,
    private _sessionManagerService: SessionManagerService,
    private _reportWeService: ReportWeService,
    public _exportDataService: ExportDataService,
    protected patterns: ValidatorPatternService,

  ) {

  }

  ngOnInit(): void {

    
    this.getData()
  }

  getData() {
    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.fabrics = response
    })

    this._dyeingColorsPricesService.selectAll().subscribe((response: any) => {
      this.colors = response
    })
  }

  //  Fabric
  selectFabric(index: { itemData: any; }) {
    let indexData = this.fabrics.indexOf(index.itemData)
    if (this.fabrics[indexData] !== index.itemData) {
      this.inquireFabricForm.controls['dyedFabricId'].setValue(null)
      this.inquireFabricForm.controls['fabricId'].setValue(null)
      this.inquireFabricForm.controls['wasteRatio'].setValue(null)
    }
    else {
      this.inquireFabricForm.controls['dyedFabricId'].setValue(index.itemData.id)
      this.inquireFabricForm.controls['fabricId'].setValue(index.itemData.fabric_id)
      this.inquireFabricForm.controls['wasteRatio'].setValue(index.itemData.waste_ratio)
    }
  }

  //  Color
  selectColor(index: { itemData: any; }) {
    let indexData = this.colors.indexOf(index.itemData)
    if (this.colors[indexData] !== index.itemData) {
      this.inquireFabricForm.controls['colorId'].setValue(null)
      this.inquireFabricForm.controls['colorCode'].setValue(null)
    }
    else {
      this.inquireFabricForm.controls['colorId'].setValue(index.itemData.color_id)
      this.inquireFabricForm.controls['colorCode'].setValue(index.itemData.code)
    }
  }

  async onSubmitForm() {
    this.inquireFabricAvilabilitySharedReportWd.onSubmitForm()
    // this.onSubmitFormFun.emit();
  }

  // this.loading = true;
  // this._reportWeService.salesReport().subscribe((response: any) => {
  //   this.results = response

  //   // PrimeNG Table
  //   this.primengConfig.ripple = true;
  //   this.loading = false;
  // })

}

