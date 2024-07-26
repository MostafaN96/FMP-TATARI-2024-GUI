import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { WdTransportWcWdRequisitionDetailsService } from "src/app/services/main/wc/wd-transport-wc-wd-requisition-details.service";
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";
import { WcService } from "src/app/services/main/wc/wc.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transport-wc-wd-requisition-form-wc',
  templateUrl: './add-transport-wc-wd-requisition-form-wc.component.html',
  styleUrls: ['./add-transport-wc-wd-requisition-form-wc.component.css']
})
export class AddTransportWcWdRequisitionFormWcComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  transportWcWdForm = new FormGroup({
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
  consigments: any = []
  dyers: any = []
  currentQuantity: any = []
  fabricsDetails: any
  getListFabricPrices: any = []
  listFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر تصنيع", "آخر سعر"]
  fabricMap = new Map()
  isShowAdd = true

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش"

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

  // --------------- Dyeing --------------
  // maps the appropriate column to fields property
  public fieldsDyeing: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyeing: string = "المصبغة"


  public onFilteringDyeing(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyers, query);
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

  constructor(
    private _wcService: WcService,
    private _fabricService: FabricService,
    private _bussinessmanService: BussinessmanService,
    private _wdTransportWcWdRequisitionDetailsService: WdTransportWcWdRequisitionDetailsService,
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
  ngOnChanges() {
    this.transportWcWdForm.controls['warehouseId'].setValue(this.selectedData?.warehouse_id)

    this._fabricService.selectByWarehouseWc(this.selectedData?.warehouse_id).subscribe((response: any) => {
      this.fabrics = response
    })
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.transportWcWdForm.controls.id.setValue(params['id'])
    })

    this._bussinessmanService.selectDyer().subscribe((response: any) => {
      this.dyers = response
    })

  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      dyeingId: new FormControl("", [Validators.required]),
      consigmentManufacturingId: new FormControl("", [Validators.required]),
      fabricId: new FormControl("", [Validators.required]),
      fabricName: new FormControl(""),
      fabricCode: new FormControl(""),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      consigmentDyeingNumber: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.transportWcWdForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.transportWcWdForm.get('items');
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
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['price'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      this.consigments[index] = []
      this.currentQuantity[index] = 0
    }
    else {

      row.controls['fabricCode'].setValue(event.itemData.code)
      row.controls['fabricName'].setValue(event.itemData.name)

      this._wcService.selectConsigmentManufacturingQuantityByWarehouseByFabricWc(this.selectedData?.warehouse_id, event.itemData.id).subscribe((response: any) => {
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

  //  Dyeing
  selectDyeing(event: { itemData: any; }, row: FormGroup) {
    let indexData = this.dyers.indexOf(event.itemData)

    if (this.dyers[indexData] !== event.itemData) {
      row.controls['dyeingId'].setValue(null)
    }
  }

  //  consigmentManufacturing
  selectConsigment(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.consigments[index].includes(event.itemData)) {
      row.controls['price'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
      this.listFabricPrices[index] = []
      this.listFabricPricesDollar[index] = []
    } else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)
      row.controls['consigmentDyeingNumber'].setValue(event.itemData.number)

      
      // Get Prices
      this._reportWcService.selectPriceByFabricByConsigmentManufacturingInWc(row.controls['fabricId'].value, event.itemData.id).subscribe((response: any) => {
        this.fabricsDetails = response
        this.listFabricPrices[index] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails), this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails), this.fabricsDetails[0].latest_manufacturing_price, this.fabricsDetails[0].latest_price]
        this.listFabricPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this.fabricsDetails[0].latest_manufacturing_price_dollar, this.fabricsDetails[0].latest_price_dollar]
        row.controls['price'].setValue(this.fabricsDetails[0].latest_manufacturing_price)
        row.controls['priceDollar'].setValue(this.fabricsDetails[0].latest_manufacturing_price_dollar)

        this.changePrice("priceEG", row)
        this.changePrice("priceDollar", row)
      })
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

  async onTransportWcWdRequisition() {
    this.isShowAdd = false

    this.transportWcWdForm.markAllAsTouched();
    if (this.transportWcWdForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityTwoItems(
        this.transportWcWdForm.controls.items.value, this.transportWcWdForm.controls.items.value, 
        'consigmentManufacturingId', 'consigmentManufacturingId', 
        'fabricId', 'fabricId', 
        'quantity', 'fabricName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.transportWcWdForm, 'items',
          ['fabricCode', 'fabricName', 'validQuantity'])
        this._constantsService.spinner.show()
        this._wdTransportWcWdRequisitionDetailsService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.reloadPageWithDynamicParams({id: response.id, warehouseId: this.selectedData?.warehouse_id});
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
            this.isShowAdd = true
          }
        });
      } else {
        this.isShowAdd = true
      }
    } else {
      this.isShowAdd = true
    }
  }
}
