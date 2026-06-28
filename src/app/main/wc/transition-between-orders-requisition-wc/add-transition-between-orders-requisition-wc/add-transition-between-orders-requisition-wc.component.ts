import { Component, Inject, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { TransitionBetweenOrdersRequisitionWcService } from "src/app/services/main/wc/transition-between-orders-requisition-wc.service";
import { WcService } from "src/app/services/main/wc/wc.service";
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";
import { ConsigmentManufacturingService } from "src/app/services/main/consigment-manufacturing.service";
import { FabricOrderRequisitionWcService } from "src/app/services/main/wc/fabric-order-requisition-wc.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transition-between-orders-requisition-wc',
  templateUrl: './add-transition-between-orders-requisition-wc.component.html',
  styleUrls: ['./add-transition-between-orders-requisition-wc.component.css']
})
export class AddTransitionBetweenOrdersRequisitionWcComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addtransitionOrdersRequisitionForm = new FormGroup({
    fabricOrderId: new FormControl("", [Validators.required]),
    ordersRequisitionsId: new FormControl("", [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([
      this.initItem(),
    ]),
  personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fromConsigmentsManufacturing: any = []
  toConsigmentsManufacturing: any = []
  fabrics:any = []
  fromWarehouses:any = []
  fromFabricOrder: any = []
  currentQuantity:any = []
  fabricsDetails:any = []
  getListFabricPrices:any = []
  listFabricPrices:any = []
  listFabricPricesDollar:any = []
  toOrders:any
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر تصنيع", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textFabric: string = "نوع القماش"

  public onFilteringFabricName (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fabrics[index], query);
  }

  // --------------- From Warehouse --------------
  // maps the appropriate column to fields property
  public fieldsFromWarehouse: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textFromWarehouse: string = "من مخزن"


  public onFilteringFromWarehouse (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fromWarehouses, query);
  }

  // maps the appropriate column to fields property
  public fieldsToOrder: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textToOrder: string = "الى طلبية"
  public onFilteringToOrder (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.toOrders, query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentsManufacturing: Object = { value: "id", text:"number"};
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentsManufacturing (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fromConsigmentsManufacturing[index], query);
  }

  // --------------- to consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsToConsigmentManufacturing: Object = { value: "number", text:"number"};
  // set the placeholder to the AutoComplete input
  public textToConsigmentManufacturing: string = "الى رقم الرسالة"

  public onFilteringToConsigmentManufacturing (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.toConsigmentsManufacturing, query);
  }

  // --------------- Requisition nOrder --------------
  // maps the appropriate column to fields property
  public fieldsFromFabricOrder: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFromFabricOrder: string = "من الطلبية"


  public onFilteringFromFabricOrder(e: any, index: number) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fromFabricOrder[index], query);
  }

  constructor(
    private _wcService: WcService,
    private _consigmentManufacturingService: ConsigmentManufacturingService,
    private _fabricService: FabricService,
    private _warehouseService: WarehouseService,
    private _transitionBetweenOrdersRequisitionWcService: TransitionBetweenOrdersRequisitionWcService,
    private _fabricOrderRequisitionWcService: FabricOrderRequisitionWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    private _reportWcService: ReportWcService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._warehouseService.selectWhereInWc().subscribe((response: any) => {
      this.fromWarehouses = response
    })

    this._fabricOrderRequisitionWcService.selectAll("isOppened").subscribe((response: any) => {
      this.toOrders = response
    })

    this._consigmentManufacturingService.selectAll().subscribe((response: any) => {
      this.toConsigmentsManufacturing = response
    })
  }
  

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fromOrdersRequisitionsId: new FormControl("", [Validators.required]),
      fromFabricOrderId: new FormControl("", [Validators.required]),
      warehouseId: new FormControl("", [Validators.required]),
      fabricId: new FormControl("", [Validators.required]),
      fabricName: new FormControl(""),
      fabricCode: new FormControl(""),
      consigmentManufacturingId: new FormControl(''),
      newConsigmentManufacturingNumber: new FormControl(''),
      fromConsigmentManufacturingId: new FormControl("", [Validators.required]),
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
    const control = <FormArray>this.addtransitionOrdersRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {    
    return form.controls.items.controls;
  }

  removeItem(index: number){
    const control = <FormArray>this.addtransitionOrdersRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listFabricPrices[index] = delete this.listFabricPrices[index];
    this.listFabricPrices.splice(index, 1);
    this.listFabricPricesDollar[index] = delete this.listFabricPricesDollar[index];
    this.listFabricPricesDollar.splice(index, 1);
   }

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics[index].indexOf(event.itemData)

    if (this.fabrics[index][indexData] !== event.itemData) {
      row.controls['fromConsigmentManufacturingId'].setValue("")
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['fabricName'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      let flag = true
      row.controls['fabricCode'].setValue(event.itemData.code)
      row.controls['fabricName'].setValue(event.itemData.name)
        
        if(this.fabrics[0] != null) {
          this.getSelectConsigmentManufacturingQuantityByFabricByWarehouseWc(
            row.controls['warehouseId'].value!,
            event.itemData.id,
            row.controls['fromFabricOrderId'].value!,
            index
          )
          }

      // for (let i = 0; i < this.addtransitionOrdersRequisitionForm.controls.items['controls'].length; i++) {
      //   if(this.addtransitionOrdersRequisitionForm.controls.items['controls'][i].value.fabricId?.includes(event.itemData.id)) {
      //     row.controls['fabricId'].setValue("")
      //     row.controls['fabricCode'].setValue("")
      //     row.controls['fabricName'].setValue("")
      //     row.controls['quantity'].setValue("")
      //     this.currentQuantity[index] = 0
      //     flag = false
      //   }
      // }
      // if(flag) {
      //   row.controls['fabricId'].setValue(event.itemData.id)
      //   row.controls['fabricCode'].setValue(event.itemData.code)
      //   row.controls['fabricName'].setValue(event.itemData.name)
      // }
    }
    this.validate(row, index)    
  }

  validate(row: FormGroup, index) {
    if(parseFloat(row.controls['quantity'].value)  > parseFloat(this.currentQuantity[index])) {
      row.controls['quantity'].setErrors({'incorrect': true});
    }
    else {
      row.controls['quantity'].setErrors({'incorrect': null});
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  getSelectConsigmentManufacturingQuantityByFabricByWarehouseWc(warehouseId: string, fabricId: string, fromFabricOrderId: string, index) {
    this._wcService.selectConsigmentManufacturingQuantityByWarehouseByFabricWc(
      warehouseId, 
      fabricId,
      fromFabricOrderId
      ).subscribe((response: any) => {
        this.fromConsigmentsManufacturing[index] = response
      })
  }

  // Start Consigment Manufacturing Autocomplete Section
  //  Consigment Manufacturing
  selectConsigmentManufacturing(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.fromConsigmentsManufacturing[index].indexOf(event.itemData)
    if (this.fromConsigmentsManufacturing[index][indexData] !== event.itemData) {
      row.controls['fromConsigmentManufacturingId'].setValue("")
      row.controls['validQuantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)
      row.controls['consigmentManufacturingId'].setValue(event.itemData.id)
      row.controls['newConsigmentManufacturingNumber'].setValue(event.itemData.number)

       // Get Prices
       this._reportWcService.selectPriceByFabricByConsigmentManufacturingInWc(row.controls['fabricId'].value!, event.itemData.id ).subscribe((response: any) => {
        this.fabricsDetails = response
        
        this.listFabricPrices[index] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails) ?? 0, this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails) ?? 0, this.fabricsDetails[0].latest_manufacturing_price, this.fabricsDetails[0].latest_price ?? 0]
        this.listFabricPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this.fabricsDetails[0].latest_manufacturing_price_dollar, this.fabricsDetails[0].latest_price_dollar]
        row.controls['price'].setValue(this.fabricsDetails[0].latest_manufacturing_price)
        row.controls['priceDollar'].setValue((parseFloat(this.fabricsDetails[0].latest_manufacturing_price_dollar)).toFixed(3))
      })
    }    
  }
  // End Consigment Manufacturing Autocomplete Section

  //  Fabric Order
  selectFromFabricOrder(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fromFabricOrder[index].indexOf(event.itemData)

    if (this.fromFabricOrder[index][indexData] !== event.itemData) {
      row.controls['fromOrdersRequisitionsId'].setValue("")
      row.controls['fromFabricOrderId'].setValue("")
      row.controls['fabricId'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['fromOrdersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._fabricService.selectByWarehouseWcForTransitionBetweenOrder(
        row.controls['warehouseId'].value!, 
        event.itemData.id,
        this.addtransitionOrdersRequisitionForm.controls['fabricOrderId'].value!
      ).subscribe((response: any) => {
        this.fabrics[index] = response
      })

    }
  }

  //  From Warehouses
  selectFromWarehouse(event: { itemData: any; }, row: FormGroup, index: number) {
    if (!this.fromWarehouses.includes(event.itemData)) {
      row.controls['fromOrdersRequisitionsId'].setValue("")
      row.controls['fromFabricOrderId'].setValue("")
      row.controls['warehouseId'].setValue("")
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
      this.fabrics[index] = []
      this.fromFabricOrder[index] = []
    }
    else {

      this._fabricOrderRequisitionWcService.selectByWarehouseWc(event.itemData?.id).subscribe((response: any) => {
        this.fromFabricOrder[index] = response
      })

    }
  }

  // To Warehouse
  selectToOrder(event: { itemData: any; }) {
    if (!this.toOrders.includes(event.itemData)) {
      this.addtransitionOrdersRequisitionForm.controls['fabricOrderId'].setValue(null)
      this.addtransitionOrdersRequisitionForm.controls['ordersRequisitionsId'].setValue(null)
    } else {
      this.addtransitionOrdersRequisitionForm.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)
    }
  }

  // Start to Consigment Manufacturing Autocomplete Section
  //  to Consigment Manufacturing
  selectToConsigmentManufacturing(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.toConsigmentsManufacturing.indexOf(event.itemData)
    if (this.toConsigmentsManufacturing[indexData] == event.itemData) {
      row.controls['consigmentManufacturingId'].setValue(event.itemData.id)
    } else {
      row.controls['consigmentManufacturingId'].setValue("")
    }.00
  }
  // End to Consigment Manufacturing Autocomplete Section

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }
  
  async onAddTransitionOrdersRequisition() {
    this.addtransitionOrdersRequisitionForm.markAllAsTouched();
    if (this.addtransitionOrdersRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantity(
        this.addtransitionOrdersRequisitionForm.controls.items.value, this.addtransitionOrdersRequisitionForm.controls.items.value, 
        'fromFabricOrderId', 'fromFabricOrderId', 
        'fromConsigmentManufacturingId', 'fromConsigmentManufacturingId', 
        'fabricId', 'fabricId', 
        'quantity', 'fabricName', 'validQuantity')) {
      this._constantsService.spinner.show()
      this._transitionBetweenOrdersRequisitionWcService.add(this.addtransitionOrdersRequisitionForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[206]}`, { id: response.id });
          this._sharedComponentService.reloadPage();
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

