import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { SellRequisitionWcService } from "src/app/services/main/wc/sell-requisition-wc.service";
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
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
  selector: 'app-add-sell-requisition-wc',
  templateUrl: './add-sell-requisition-wc.component.html',
  styleUrls: ['./add-sell-requisition-wc.component.css']
})
export class AddSellRequisitionWcComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  sellRequisitionWCForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    warehouseId: new FormControl("", [Validators.required]),
    sellerId: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  warehouses: any = []
  fabrics: any = []
  fabricOrder: any = []
  sellers: any = []
  consigments: any = []
  currentQuantity: any = []
  fabricsDetails: any
  listFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر تصنيع", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

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

  // --------------- Seller --------------
  // maps the appropriate column to fields property
  public fieldsSeller: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textSeller: string = "العميل"

  public onFilteringSeller(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.sellers, query);
  }

  // --------------- Warehouse --------------
  // maps the appropriate column to fields property
  public fieldsWarehouse: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textWarehouse: string = "المخزن"

  public onFilteringWarehouse(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.warehouses, query);
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
    private _warehouseService: WarehouseService,
    private _wcService: WcService,
    private _fabricService: FabricService,
    private _sellerService: BussinessmanService,
    private _sellRequisitionWcService: SellRequisitionWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWcService: ReportWcService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private _fabricOrderRequisitionWcService: FabricOrderRequisitionWcService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._sellerService.selectSeller().subscribe((response: any) => {
      this.sellers = response
    })

    this._warehouseService.selectWhereInWc().subscribe((response: any) => {
      this.warehouses = response

      this.selectByWarehouseWc()
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      ordersRequisitionsId: new FormControl("", [Validators.required]),
      fabricOrderId: new FormControl("", [Validators.required]),
      fabricId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      fabricName: new FormControl(""),
      consigmentManufacturingId: new FormControl("", [Validators.required]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
  
  //  Warehouse
  selectWarehouse(event: { itemData: any; }) {
    if (!this.warehouses.includes(event.itemData)) {
      this.sellRequisitionWCForm.controls['warehouseId'].setValue("")
      this.sellRequisitionWCForm.controls.items.reset()
      this.currentQuantity = 0
      this.consigments = []
      this.fabrics = []
    } else {
      this.selectByWarehouseWc(event.itemData.id)
    }
  }

  selectByWarehouseWc(id = this._constantsService.DEFAULT_WC_WAREHOUSE_ID) {
    this.sellRequisitionWCForm.controls['warehouseId'].setValue(id)
    this._fabricOrderRequisitionWcService.selectByWarehouseWc(id).subscribe((response: any) => {
      this.fabricOrder = response
    })
  }

  //  Fabric Order
  selectFabricOrder(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabricOrder.indexOf(event.itemData)

    if (this.fabricOrder[indexData] !== event.itemData) {
      row.controls['ordersRequisitionsId'].setValue("")
      row.controls['fabricOrderId'].setValue("")
      row.controls['fabricId'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      this.currentQuantity[index] = 0
      this.fabrics[index] = []
    }
    else {
      row.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._fabricService.selectByWarehouseWc(
        this.sellRequisitionWCForm.controls['warehouseId'].value!, 
        event.itemData.id
      ).subscribe((response: any) => {
        this.fabrics[index] = response
      })

    }
  }

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics[index].indexOf(event.itemData)

    if (this.fabrics[index][indexData] !== event.itemData) {
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['price'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      this.consigments[index] = []
      this.currentQuantity[index] = []
    }
    else {
      row.controls['fabricCode'].setValue(event.itemData.code)
      row.controls['fabricName'].setValue(event.itemData.name)

      this._wcService.selectConsigmentManufacturingQuantityByWarehouseByFabricWc(
        this.sellRequisitionWCForm.controls['warehouseId'].value!, 
        event.itemData.id,
        row.controls['fabricOrderId'].value
      ).subscribe((response: any) => {
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

  //  Seller
  selectSeller(event: { itemData: any; }) {
    if (!this.sellers.includes(event.itemData)) {
      this.sellRequisitionWCForm.controls.sellerId.setValue(null)
    }
  }

  //  consigmentManufacturing
  selectConsigment(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.consigments[index].includes(event.itemData)) {
      row.controls['price'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
      this.listFabricPricesDollar[index] = []
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
    if (type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  async onSellRequisition() {
    this.sellRequisitionWCForm.markAllAsTouched();
    if (this.sellRequisitionWCForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityTwoItems(
        this.sellRequisitionWCForm.controls.items.value, this.sellRequisitionWCForm.controls.items.value,
        'consigmentManufacturingId', 'consigmentManufacturingId',
        'fabricId', 'fabricId',
        'quantity', 'fabricName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.sellRequisitionWCForm, 'items',
          ['fabricName', 'fabricCode', 'validQuantity'])
        this._constantsService.spinner.show()
        this._sellRequisitionWcService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[36]}/details`, { id: response.id });
            this._sharedComponentService.reloadPage();
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
