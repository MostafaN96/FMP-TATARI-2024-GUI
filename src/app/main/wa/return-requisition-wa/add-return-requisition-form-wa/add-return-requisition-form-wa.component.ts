import { Component, Inject, Input, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { ReturnRequisitionDetailsWaService } from "src/app/services/main/wa/return-requisition-details-wa.service";
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";
import { WaService } from "src/app/services/main/wa/wa.service";
import { YarnOrderRequisitionWaService } from 'src/app/services/main/wa/yarn-order-requisition-wa.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-return-requisition-form-wa',
  templateUrl: './add-return-requisition-form-wa.component.html',
  styleUrls: ['./add-return-requisition-form-wa.component.css']
})
export class AddReturnRequisitionFormWaComponent implements OnInit {
  @Input() selectedData: any

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  returnRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    warehouseId: new FormControl(null, [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  yarns: any = []
  lots: any = []
  yarnOrder: any = []
  consigmentsYarns: any = []
  suppliers: any = []
  currentQuantity: any = []
  yarnsDetails: any = []
  listYarnPrices: any = []
  listYarnPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر", "آخر سعر الرسالة"]
  requisitionId: string = '';

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الصنف"

  public onFilteringYarnName(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarns[index], query);
  }

  // --------------- Lot --------------
  // maps the appropriate column to fields property
  public fieldsLot: Object = { value: "id", text: "code" };
  // set the placeholder to the AutoComplete input
  public textLot: string = "اللوط"

  public onFilteringLot(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.lots[index], query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "id", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentYarn(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigmentsYarns[index], query);
  }

  // --------------- Requisition nOrder --------------
  // maps the appropriate column to fields property
  public fieldsYarnOrder: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarnOrder: string = "اسم الطلبية"


  public onFilteringYarnOrder(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarnOrder, query);
  }

  constructor(
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _waService: WaService,
    private _returnRequisitionDetailsWaService: ReturnRequisitionDetailsWaService,
    private _yarnOrderRequisitionWaService: YarnOrderRequisitionWaService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWaService: ReportWaService,
    private route: ActivatedRoute,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.returnRequisitionForm.controls.id.setValue(params['id'])
      this.returnRequisitionForm.controls.warehouseId.setValue(this.selectedData[0]['warehouse_id'])
      this.requisitionId = params['id']
    })

    this._yarnOrderRequisitionWaService.selectByWarehouseBySupplierWa(this.selectedData[0]['warehouse_id'], this.selectedData[0]['supplier_id']).subscribe((response: any) => {
      this.yarnOrder = response
    })
  }
  ngOnChanges() {
    this.getData()
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      ordersRequisitionsId: new FormControl("", [Validators.required]),
      yarnOrderId: new FormControl("", [Validators.required]),
      yarnId: new FormControl("", [Validators.required]),
      yarnCode: new FormControl(""),
      yarnName: new FormControl(""),
      yarnLotId: new FormControl("", [Validators.required]),
      consigmentYarnId: new FormControl("", [Validators.required]),
      price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.returnRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    this.listYarnPrices = []
    this.listYarnPricesDollar = []

    const control = <FormArray>this.returnRequisitionForm.get('items');
    control.removeAt(index);

    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
    this.listYarnPricesDollar[index] = delete this.listYarnPricesDollar[index];
    this.listYarnPricesDollar.splice(index, 1);
  }


  //  Yarn Order
  selectYarnOrder(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarnOrder.indexOf(event.itemData)

    if (this.yarnOrder[indexData] !== event.itemData) {
      row.controls['yarnOrderId'].setValue("")
      row.controls['yarnId'].setValue(null)
      row.controls['yarnCode'].setValue(null)
      row.controls['yarnName'].setValue(null)
      row.controls['yarnLotId'].setValue(null)
      row.controls['consigmentYarnId'].setValue("")
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
      this.consigmentsYarns[index] = []
      this.yarns[index] = []
    }
    else {
      row.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._yarnService.selectStoredWaYarnsBySupplier(
        this.selectedData[0]['supplier_id'],
        this.returnRequisitionForm.controls['warehouseId'].value!,
        event.itemData.id
      ).subscribe((response: any) => {
        this.yarns[index] = response
      })

    }
    this.validate(row, index)
  }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns[index].indexOf(event.itemData)

    if (this.yarns[index][indexData] !== event.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['yarnName'].setValue("")
      row.controls['yarnLotId'].setValue("")
      row.controls['consigmentYarnId'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
      this.consigmentsYarns[index] = []
    }
    else {
      row.controls['yarnCode'].setValue(event.itemData.code)
      row.controls['yarnName'].setValue(event.itemData.name)

      this._yarnLotService.selectBySupplierByWarehouseByYarnWa(
        this.selectedData[0]['supplier_id'],
        this.returnRequisitionForm.controls['warehouseId'].value!,
        event.itemData.id,
        row.controls['yarnOrderId'].value!,
      ).subscribe((response: any) => {
        this.lots[index] = response
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

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots[index].indexOf(event.itemData)
    if (this.lots[index][indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      this.currentQuantity[index] = 0
    } else {
      this._waService.selectRemainingBySupplierByWarehouseByYarnByLotForReturn(
        this.selectedData[0]['supplier_id'],
        this.selectedData[0]['warehouse_id'],
        row.controls['yarnId'].value!,
        event.itemData.id,
        row.controls['yarnOrderId'].value!
      ).subscribe((response: any) => {
          this.consigmentsYarns[index] = response
        })
    }
  }
  // End Yarn Lot Autocomplete Section

  // Start Consigment Yarn Autocomplete Section
  //  Consigment Yarn
  selectConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.consigmentsYarns[index].indexOf(event.itemData)
    if (this.consigmentsYarns[index][indexData] !== event.itemData) {
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
    if (type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  async onReturnRequisition() {
    this.returnRequisitionForm.markAllAsTouched();
    if (this.returnRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantity(
        this.returnRequisitionForm.controls['items'].value, this.returnRequisitionForm.controls['items'].value, 
        'yarnId', 'yarnId',
        'yarnLotId', 'yarnLotId',
        'consigmentYarnId', 'consigmentYarnId',
        'quantity', 'yarnCode', this.currentQuantity)) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.returnRequisitionForm, 'items',
          ['yarnName', 'yarnCode', 'validQuantity'])
        this._constantsService.spinner.show()
        this._returnRequisitionDetailsWaService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.reloadPageWithDynamicParams({ id: this.requisitionId });
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
