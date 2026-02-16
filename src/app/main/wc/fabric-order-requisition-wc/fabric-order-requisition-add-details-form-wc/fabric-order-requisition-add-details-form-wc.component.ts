import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { FabricOrderRequisitionDetailsWcService } from "src/app/services/main/wc/fabric-order-requisition-details-wc.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-fabric-order-requisition-add-details-form-wc',
  templateUrl: './fabric-order-requisition-add-details-form-wc.component.html',
  styleUrls: ['./fabric-order-requisition-add-details-form-wc.component.css']
})
export class FabricOrderRequisitionAddDetailsFormWcComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addOrderForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    ordersRequisitionsId: new FormControl(null, [Validators.required]),
    items: new FormArray([this.initItem()]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any
  @Input() selectedData: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "نوع القماش"

  public onFilteringSelerFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

  constructor(
    private _fabricService: FabricService,
    private route: ActivatedRoute,
    private _fabricOrderRequisitionDetailsWcService: FabricOrderRequisitionDetailsWcService,
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
    console.log(this.selectedData);

    this.route.queryParams.subscribe(params => {
      this.addOrderForm.controls.id.setValue(params['id'])
      this.addOrderForm.controls.ordersRequisitionsId.setValue(this.selectedData['orders_requisitions_id'])
    })

    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })

  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fabricId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      quantity: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      fabricWidth: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      fabricQuantityM2: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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

  // Start Fabric Autocomplete Section
  // Fabric
  selectFabric(element: { itemData: any; }, row: FormGroup) {
    let indexData = this.fabrics.indexOf(element.itemData)
    if (this.fabrics[indexData] !== element.itemData) {
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
    }
    else {
      row.controls['fabricCode'].setValue(element.itemData.code)
      row.controls['fabricQuantityM2'].setValue(element.itemData.fabric_quantity_m2)

    }
  }
  // End Fabric Autocomplete Section

  async onAddRequisition() {
    this.addOrderForm.markAllAsTouched();
    if (this.addOrderForm.valid) {
      this._constantsService.spinner.show()
      this._fabricOrderRequisitionDetailsWcService.add(this.addOrderForm.value).subscribe(response => {
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


