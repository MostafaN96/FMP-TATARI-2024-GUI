import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { TransitionBetweenOrdersRequisitionWeService } from "src/app/services/main/we/transition-between-orders-requisition-we.service";
import { WeService } from "src/app/services/main/we/we.service";
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { ConsigmentDyeingService } from "src/app/services/main/consigment-dyeing.service";
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

// Child Components
import { CurrentStockReportWeComponent } from "../../reports/current-stock-report-we/current-stock-report-we.component";

@Component({
  selector: 'app-add-transition-between-orders-requisition-we',
  templateUrl: './add-transition-between-orders-requisition-we.component.html',
  styleUrls: ['./add-transition-between-orders-requisition-we.component.css']
})
export class AddTransitionBetweenOrdersRequisitionWeComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport') currentStockReport!: CurrentStockReportWeComponent;

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addtransitionOrdersRequisitionForm = new FormGroup({
    fabricOrderId: new FormControl("", [Validators.required]),
    ordersRequisitionsId: new FormControl("", [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  selectArrayValues: any[] = [];
  toConsigmentsDyeing: any = []
  fabrics: any = []
  fromWarehouses: any = []
  fromFabricOrder: any = []
  toOrders: any
  currentQuantity: any = []
  fabricsDetails: any = []
  getListFabricPrices: any = []
  listFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر تصنيع", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "نوع القماش"

  public onFilteringFabricName(e: any, index) {
    e.preventDefaultAction = true;
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
  public fieldsFromWarehouse: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFromWarehouse: string = "من مخزن"


  public onFilteringFromWarehouse(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fromWarehouses, query);
  }

  // maps the appropriate column to fields property
  public fieldsToOrder: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textToOrder: string = "الى طلبية"
  public onFilteringToOrder(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.toOrders, query);
  }

  // --------------- to consigment dyeing --------------
  // maps the appropriate column to fields property
  public fieldsToConsigmentDyeing: Object = { value: "number", text: "number" };
  // set the placeholder to the AutoComplete input
  public textToConsigmentDyeing: string = "الى رقم الرسالة"

  public onFilteringToConsigmentDyeing(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.toConsigmentsDyeing, query);
  }

  // --------------- Requisition nOrder --------------
  // maps the appropriate column to fields property
  public fieldsFromFabricOrder: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFromFabricOrder: string = "من الطلبية"


  public onFilteringFromFabricOrder(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fromFabricOrder, query);
  }

  constructor(
    private _weService: WeService,
    private _consigmentDyeingService: ConsigmentDyeingService,
    private _fabricService: FabricService,
    private _warehouseService: WarehouseService,
    private _transitionBetweenOrdersRequisitionWeService: TransitionBetweenOrdersRequisitionWeService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    private _reportWeService: ReportWeService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {

    this._dyedFabricOrderRequisitionWeService.selectAll("isOppened").subscribe((response: any) => {
      this.toOrders = response
    })

    this._consigmentDyeingService.selectAll().subscribe((response: any) => {
      this.toConsigmentsDyeing = response
    })
  }

  getSelectedIndex(objectData: any) {
    if (this.selectArrayValues.includes(objectData)) {
      let index = this.selectArrayValues.indexOf(objectData);
      this.selectArrayValues[index] = delete this.selectArrayValues[index];
      this.selectArrayValues.splice(index, 1);

      let indexData = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(objectData)
      this.removeItem(indexData)
    }
    else {
      this.selectArrayValues.push(objectData);
      this.addItem(objectData)
    }
  }

  // Initialize Form Builder
  initItem(data: any, index: number) {
    return new FormGroup({
      fromOrdersRequisitionsId: new FormControl(data.orders_requisitions_id, [Validators.required]),
      fromDyedFabricOrderId: new FormControl(data.we_dyed_fabric_order_requisition_id, [Validators.required]),
      fromDyedFabricOrderName: new FormControl(data.we_dyed_fabric_order_requisition_name, [Validators.required]),
      weId: new FormControl(data.we_id, [Validators.required]),
      warehouseId: new FormControl(data.warehouse_id, [Validators.required]),
      warehouseName: new FormControl(data.warehouse_name),
      dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
      dyedFabricCode: new FormControl(data.dyed_fabric_code),
      colorCategoryId: new FormControl(data.color_category_id, [Validators.required]),
      colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorId: new FormControl(data.color_id, [Validators.required]),
      colorCode: new FormControl(data.color_code),
      gradeItemId: new FormControl(data.grade_item_id, [Validators.required]),
      gradeItemName: new FormControl(data.grade_item_name, [Validators.required]),
      consigmentDyeingId: new FormControl(data.consigment_dyeing_id),
      newConsigmentDyeingNumber: new FormControl(data.consigment_dyeing_number),
      fromConsigmentDyeingNumber: new FormControl(data.consigment_dyeing_number, [Validators.required]),
      fromConsigmentDyeingId: new FormControl(data.consigment_dyeing_id, [Validators.required]),
      price: new FormControl(data.price, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl(data.price_dollar, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(data.current_quantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      numberFabricPieces: new FormControl(data.fabric_piece, [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      workOrderNumber: new FormControl(data.work_order_number, [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(data: any) {
    let index = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(data)
    const control = <FormArray>this.addtransitionOrdersRequisitionForm.get('items');
    control.push(this.initItem(data, index));
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.addtransitionOrdersRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listFabricPrices[index] = delete this.listFabricPrices[index];
    this.listFabricPrices.splice(index, 1);
    this.listFabricPricesDollar[index] = delete this.listFabricPricesDollar[index];
    this.listFabricPricesDollar.splice(index, 1);
  }


  // To Order
  selectToOrder(event: { itemData: any; }) {
    if (!this.toOrders.includes(event.itemData)) {
      this.addtransitionOrdersRequisitionForm.controls['fabricOrderId'].setValue(null)
      this.addtransitionOrdersRequisitionForm.controls['ordersRequisitionsId'].setValue(null)
      this.currentStockReport.dyersAndRequisitionsFabrics = []
      this.currentStockReport.listen();
      const formGroup = <FormGroup>this.addtransitionOrdersRequisitionForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));
    } else {
      this.addtransitionOrdersRequisitionForm.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._weService.selectStoreWeByWeDyedFabricOrderRequisitionIdOfOrderDyedFabrics(event.itemData.id).subscribe((response: any) => {
        this.currentStockReport.dyersAndRequisitionsFabrics = response
        this.currentStockReport.listen();
      })
    }
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

  // price
  changePrice(type, row: FormGroup) {
    if (type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  async onAddTransitionOrdersRequisition() {
    this.addtransitionOrdersRequisitionForm.markAllAsTouched();
    if (this.addtransitionOrdersRequisitionForm.valid) {
      this._constantsService.spinner.show()
      this._transitionBetweenOrdersRequisitionWeService.add(this.addtransitionOrdersRequisitionForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[213]}`, { id: response.id });
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

