import { Component, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { AddPurchaseOrderDetailsWaService } from "src/app/services/main/wa/add-purchase-order-details-wa.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-add-purchase-form-details-order-wa',
  templateUrl: './add-add-purchase-form-details-order-wa.component.html',
  styleUrls: ['./add-add-purchase-form-details-order-wa.component.css']
})
export class AddAddPurchaseFormDetailsOrderWaComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addOrderForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    items: new FormArray([this.initItem()]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  yarns: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarn: string = "نوع الخيط"

  public onFilteringYarnName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarns, query);
  }

  constructor(
    private _yarnService: YarnService,
    private route: ActivatedRoute,
    private _addPurchaseOrderDetailsWaService: AddPurchaseOrderDetailsWaService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _exportDataService: ExportDataService,
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.addOrderForm.controls.id.setValue(params['id'])
    })

    this._yarnService.selectAll().subscribe((response: any) => {
      this.yarns = response
    })

  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl("", [Validators.required]),
      yarnCode: new FormControl(""),
      quantity: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.addOrderForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.addOrderForm.get('items');
    control.removeAt(index);
  }

  // Start Yarn Autocomplete Section
  //  Yarn
  selectYarn(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.yarns.indexOf(index.itemData)
    if (this.yarns[indexData] !== index.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
    }
    else {
      row.controls['yarnCode'].setValue(index.itemData.code)
    }
  }
  // End Yarn Autocomplete Section

  async onAddRequisition() {
    this.addOrderForm.markAllAsTouched();
    if (this.addOrderForm.valid) {
      this._constantsService.spinner.show()
      this._addPurchaseOrderDetailsWaService.add(this.addOrderForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithParams(response.id);
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else if (response.msg == "duplicated data") {
            this._constantsService.duplicateDataErrorMessage()
          }
          else {
            this._constantsService.userErrorMessage()
          }
        }
      });
    }
  }

}

