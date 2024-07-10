import { Component, Inject, Input, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { SellRequisitionDetailsWcService } from "src/app/services/main/wc/sell-requisition-details-wc.service";
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";
import { WcService } from "src/app/services/main/wc/wc.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-sell-requisition-form-wc',
  templateUrl: './add-sell-requisition-form-wc.component.html',
  styleUrls: ['./add-sell-requisition-form-wc.component.css']
})
export class AddSellRequisitionFormWcComponent implements OnInit {

  @Input() selectedData: any

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  sellRequisitionWCForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    warehouseId: new FormControl("", [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any = []
  consigments: any = []
  currentQuantity: any = []
  fabricsDetails: any
  listFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر تصنيع", "آخر سعر"]
  requisitionId: string = ""

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم الصنف"

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    predicate = predicate.or('dyeing_code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

  // --------------- Consigments --------------
  // maps the appropriate column to fields property
  public fieldsConsigment: Object = { value: "id", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigment: string = "رقم الرسالة"

  public onFilteringConsigments(e: any, index: number) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigments[index], query);
  }

  constructor(
    private _fabricService: FabricService,
    private _wcService: WcService,
    private _sellRequisitionDetailsWcService: SellRequisitionDetailsWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWcService: ReportWcService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private route: ActivatedRoute,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.sellRequisitionWCForm.controls.id.setValue(params['id'])
      this.requisitionId = params['id']
    })

    
  }

  ngOnChanges() {
    this.sellRequisitionWCForm.controls['warehouseId'].setValue(this.selectedData?.warehouse_id)
    this._fabricService.selectByWarehouseWc(this.selectedData?.warehouse_id).subscribe((response: any) => {
      this.fabrics = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fabricId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      fabricName: new FormControl(""),
      consigmentManufacturingId: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      numberFabricPieces: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.sellRequisitionWCForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.sellRequisitionWCForm.get('items');
    control.removeAt(index);

    // Price
    this.listFabricPrices[index] = delete this.listFabricPrices[index];
    this.listFabricPrices.splice(index, 1);
    this.listFabricPricesDollar[index] = delete this.listFabricPricesDollar[index];
    this.listFabricPricesDollar.splice(index, 1);
  }

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics.indexOf(event.itemData)

    if (this.fabrics[indexData] !== event.itemData) {
      row.controls['fabricId'].setValue(null)
      row.controls['fabricCode'].setValue(null)
      row.controls['fabricName'].setValue(null)
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['fabricCode'].setValue(event.itemData.code)
      row.controls['fabricName'].setValue(event.itemData.name)
      
      this._wcService.selectConsigmentManufacturingQuantityByWarehouseByFabricWc(
        this.sellRequisitionWCForm.controls['warehouseId'].value!, 
        event.itemData.id).subscribe((response: any) => {        
        this.consigments[index] = response
      })

    }
    this.validate(row, index)
  }

  validate(row: FormGroup, index) {
    if (parseFloat(row.controls['quantity'].value) > parseFloat(this.currentQuantity[index])) {
      row.controls['quantity'].setErrors({ 'incorrect': true });
    }
    else {
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  //  consigmentManufacturing
  selectConsigment(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.consigments[index].includes(event.itemData)) {
      row.controls['price'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
    } else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)

      // Get Prices
      this._reportWcService.selectPriceByFabricByConsigmentManufacturingInWc(row.controls['fabricId'].value!, event.itemData.id).subscribe((response: any) => {
        this.fabricsDetails = response
        this.listFabricPrices[index] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails), this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails), this.fabricsDetails[0].latest_manufacturing_price, this.fabricsDetails[0].latest_price]
        this.listFabricPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this.fabricsDetails[0].latest_manufacturing_price_dollar, this.fabricsDetails[0].latest_price_dollar]
      })
    }
  }

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['priceDollar'].value))
    }
  }

  async onSellRequisition() {
    this.sellRequisitionWCForm.markAllAsTouched();
    if (this.sellRequisitionWCForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityTwoItems(
        this.sellRequisitionWCForm.controls.items.value,this.sellRequisitionWCForm.controls.items.value, 
        'consigmentManufacturingId', 'consigmentManufacturingId', 
        'fabricId',  'fabricId', 
        'quantity', 'fabricName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.sellRequisitionWCForm, 'items',
          ['fabricCode', 'fabricName', 'validQuantity'])
        this._constantsService.spinner.show()
        this._sellRequisitionDetailsWcService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.reloadPageWithParams(this.requisitionId);
          }
          else {
            if (response.msg == "quantity is wrong") {
              this._constantsService.quantityErrorMessage(response.spentQuantity, response.newQuantity)
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
