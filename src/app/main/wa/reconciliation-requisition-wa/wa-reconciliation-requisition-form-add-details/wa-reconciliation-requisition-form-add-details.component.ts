import { Component, Inject, Input, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { ReconcilitionRequisitionDetailsWaService } from "src/app/services/main/wa/reconcilition-requisition-details-wa.service";
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";
import { WaService } from "src/app/services/main/wa/wa.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-wa-reconciliation-requisition-form-add-details',
  templateUrl: './wa-reconciliation-requisition-form-add-details.component.html',
  styleUrls: ['./wa-reconciliation-requisition-form-add-details.component.css']
})
export class WaReconciliationRequisitionFormAddDetailsComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  reconcilitionRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    warehouseId: new FormControl("", [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  @Input() selectedData: any
  yarns: any = []
  lots: any = []
  consigmentsYarns: any = []
  warehouses: any = []
  currentQuantity: any = []
  yarnsDetails: any
  listYarnPrices: any = []
  listYarnPricesDollar:any = []
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر", "آخر سعر الرسالة"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الصنف"

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

  // --------------- Lot --------------
  // maps the appropriate column to fields property
  public fieldsLot: Object = { value: "id", text: "code" };
  // set the placeholder to the AutoComplete input
  public textLot: string = "اللوط"

  public onFilteringLot(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarns, query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "id", text:"number"};
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentYarn (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.consigmentsYarns, query);
  }

  constructor(
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _waService: WaService,
    private _reconcilitionRequisitionDetailsWaService: ReconcilitionRequisitionDetailsWaService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private _reportWaService: ReportWaService

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getData()
  }

  getData() {
    this.reconcilitionRequisitionForm.controls.id.setValue(this.selectedData[0]['requisition_id'])
    this.reconcilitionRequisitionForm.controls.warehouseId.setValue(this.selectedData[0]['warehouse_id'])

    this._yarnService.selectByWarehouseWa(this.selectedData[0]['warehouse_id']).subscribe((response: any) => {
      this.yarns = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl("", [Validators.required]),
      yarnName: new FormControl(""),
      yarnCode: new FormControl(""),
      yarnLotId: new FormControl("", [Validators.required]),
      consigmentYarnId: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
      inputOutput: new FormControl('1', [Validators.required]),
    });
  }

  addItem() {
    const control = <FormArray>this.reconcilitionRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.reconcilitionRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
    this.listYarnPricesDollar[index] = delete this.listYarnPricesDollar[index];
    this.listYarnPricesDollar.splice(index, 1);
  }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns.indexOf(event.itemData)

    if (this.yarns[indexData] !== event.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['yarnLotId'].setValue("")
      row.controls['consigmentYarnId'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['yarnCode'].setValue(event.itemData.code)
      row.controls['yarnName'].setValue(event.itemData.name)

      this._yarnLotService.selectByWarehouseByYarnWa(this.reconcilitionRequisitionForm.controls['warehouseId'].value!, event.itemData.id).subscribe((response: any) => {
        this.lots = response
      })

    }
    this.validate(row, index)
  }

  validate(row: FormGroup, index) {
    if ((parseFloat(row.controls['quantity'].value) > parseFloat(this.currentQuantity[index])) && !+row.controls['inputOutput'].value) {
      row.controls['quantity'].setErrors({ 'incorrect': true });
    }
    else {
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots.indexOf(event.itemData)
    if (this.lots[indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      this.currentQuantity[index] = 0
    } else {
      this._waService.selectRemainingByWarehouseByYarnByLotWa(
        this.reconcilitionRequisitionForm.controls['warehouseId'].value!,
        row.controls['yarnId'].value!,
        event.itemData.id).subscribe((response: any) => {
          this.consigmentsYarns = response
        })
    }
  }
  // End Yarn Lot Autocomplete Section

  // Start Consigment Yarn Autocomplete Section
  //  Consigment Yarn
  selectConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.consigmentsYarns.indexOf(event.itemData)
    if (this.consigmentsYarns[indexData] !== event.itemData) {
      row.controls['consigmentYarnId'].setValue(null)
      row.controls['validQuantity'].setValue(null)
      this.currentQuantity[index] = 0
    }
    else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)
      
      // Get Prices
      this._reportWaService.selectPriceWa(row.controls['yarnId'].value, event.itemData.id).subscribe((response: any) => {
        this.yarnsDetails = response
        this.listYarnPrices[index] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails), this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), this.yarnsDetails[0].latest_price, this.yarnsDetails[0].latest_consigment_price]
        this.listYarnPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this.yarnsDetails[0].latest_price_dollar, this.yarnsDetails[0].latest_consigment_price_dollar]
      })
    }    
  }
  // End Consigment Yarn Autocomplete Section

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['priceDollar'].value))
    }
  }

  async onReconcilitionRequisition() {
    this.reconcilitionRequisitionForm.markAllAsTouched();
    if (this.reconcilitionRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityThreeItemsReconciliation(
        this.reconcilitionRequisitionForm.controls['items'].value, this.reconcilitionRequisitionForm.controls['items'].value, 
        'yarnId', 'yarnId',
        'yarnLotId', 'yarnLotId',
        'consigmentYarnId', 'consigmentYarnId',
        'quantity', 'yarnCode', this.currentQuantity, "inputOutput")) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.reconcilitionRequisitionForm, 'items',
          ['yarnName', 'yarnCode', 'validQuantity'])
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionDetailsWaService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({ id: this.selectedData[0]['requisition_id']});
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
}
