import { Component, Inject, Input, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { ReconcilitionRequisitionDetailsWcService } from "src/app/services/main/wc/reconcilition-requisition-details-wc.service";
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";
import { WcService } from "src/app/services/main/wc/wc.service";
import { FabricOrderRequisitionWcService } from "src/app/services/main/wc/fabric-order-requisition-wc.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-wc-reconciliation-requisition-form-add-details',
  templateUrl: './wc-reconciliation-requisition-form-add-details.component.html',
  styleUrls: ['./wc-reconciliation-requisition-form-add-details.component.css']
})
export class WcReconciliationRequisitionFormAddDetailsComponent implements OnInit {

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
  fabrics: any = []
  warehouses: any = []
  consigments: any = []
  currentQuantity: any = []
  fabricsDetails: any
  fabricOrder: any = []
  listFabricPrices: any = []
  listYarnPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر تصنيع", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش"

  public onFilteringFabricName(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    predicate = predicate.or('dyeing_code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics[index], query);
  }

  // --------------- Consigments --------------
  // maps the appropriate column to fields property
  public fieldsConsigment: Object = { value: "id", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigment: string = "رقم الرسالة"

  public onFilteringConsigments(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigments[index], query);
  }

  // --------------- Requisition nOrder --------------
  // maps the appropriate column to fields property
  public fieldsFabricOrder: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabricOrder: string = "اسم الطلبية"


  public onFilteringFabricOrder(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabricOrder, query);
  }

  constructor(
    private _fabricService: FabricService,
    private _wcService: WcService,
    private _reconcilitionRequisitionDetailsWcService: ReconcilitionRequisitionDetailsWcService,
    private _fabricOrderRequisitionWcService: FabricOrderRequisitionWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private _reportWcService: ReportWcService

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

    this._fabricOrderRequisitionWcService.selectByWarehouseWc(this.selectedData[0]['warehouse_id']).subscribe((response: any) => {
      this.fabricOrder = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      ordersRequisitionsId: new FormControl("", [Validators.required]),
      fabricOrderId: new FormControl("", [Validators.required]),
      fabricId: new FormControl("", [Validators.required]),
      fabricName: new FormControl(""),
      fabricCode: new FormControl(""),
      consigmentManufacturingId: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      numberFabricPieces: new FormControl('0', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    this.listFabricPrices[index] = delete this.listFabricPrices[index];
    this.listFabricPrices.splice(index, 1);
    this.listYarnPricesDollar[index] = delete this.listYarnPricesDollar[index];
    this.listYarnPricesDollar.splice(index, 1);
  }

  //  Fabric Order
  selectFabricOrder(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabricOrder.indexOf(event.itemData)

    if (this.fabricOrder[indexData] !== event.itemData) {
      row.controls['ordersRequisitionsId'].setValue("")
      row.controls['fabricOrderId'].setValue("")
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._fabricService.selectByWarehouseWc(
        this.reconcilitionRequisitionForm.controls['warehouseId'].value!, 
        event.itemData.id
      ).subscribe((response: any) => {
        this.fabrics[index] = response
      })

    }
  }

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics.indexOf(event.itemData)

    if (this.fabrics[indexData] !== event.itemData) {
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['fabricCode'].setValue(event.itemData.code)
      row.controls['fabricName'].setValue(event.itemData.name)

      this._wcService.selectConsigmentManufacturingQuantityByWarehouseByFabricWc(
        this.reconcilitionRequisitionForm.controls['warehouseId'].value!, 
        event.itemData.id, 
        row.controls['fabricOrderId'].value
      ).subscribe((response: any) => {
        this.consigments[index] = response
      })

      // Get Prices
      this._reportWcService.selectPriceWc(event.itemData.id).subscribe((response: any) => {
        this.fabricsDetails = response
        this.listFabricPrices[index] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails), this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails), this.fabricsDetails[0].latest_price]
        this.listYarnPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this.fabricsDetails[0].latest_manufacturing_price, this.fabricsDetails[0].latest_price]
        row.controls['price'].setValue(this.fabricsDetails[0].latest_price)
        row.controls['priceDollar'].setValue(this.fabricsDetails[0].latest_price_dollar)
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

  //  consigmentManufacturing
  selectConsigment(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.consigments[index].includes(event.itemData)) {
      row.controls['price'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['validQuantity'].setValue(null)

      this.currentQuantity[index] = 0
      this.listFabricPrices[index] = []
      this.listYarnPricesDollar[index] = []
    } else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)

    }
  }

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  async onReconcilitionRequisition() {
    this.reconcilitionRequisitionForm.markAllAsTouched();
    if (this.reconcilitionRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityTwoItemsReconciliation(
        this.reconcilitionRequisitionForm.controls['items'].value, this.reconcilitionRequisitionForm.controls['items'].value, 
        'fabricId', 'fabricId',
        'consigmentManufacturingId', 'consigmentManufacturingId',
        'quantity', 'fabricCode', this.currentQuantity, "inputOutput")) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.reconcilitionRequisitionForm, 'items',
        ['fabricName', 'fabricCode', 'validQuantity'])
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionDetailsWcService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({ id: this.selectedData[0]['requisition_id'] });
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
