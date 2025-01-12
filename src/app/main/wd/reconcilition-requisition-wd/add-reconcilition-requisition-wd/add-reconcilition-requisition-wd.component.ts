import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WdService } from "src/app/services/main/wd/wd.service";
import { ReconcilitionRequisitionWdService } from "src/app/services/main/wd/reconcilition-requisition-wd.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { ConsigmentDyeingService } from "src/app/services/main/consigment-dyeing.service";
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";
import { FabricOrderRequisitionWcService } from "src/app/services/main/wc/fabric-order-requisition-wc.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-reconcilition-requisition-wd',
  templateUrl: './add-reconcilition-requisition-wd.component.html',
  styleUrls: ['./add-reconcilition-requisition-wd.component.css']
})
export class AddReconcilitionRequisitionWdComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  reconcilitionRequisitionWDForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    dyeingId: new FormControl(null, [Validators.required]),
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
  dyers: any = []
  dyersDetails: any = []
  fabricOrder: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  listFabricPrices: any = []
  listFabricPricesDollar: any = []

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "fabric_id", text: "fabric_name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "نوع القماش"
  
  public onFilteringFabricName(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('fabric_name', 'contains', e.text);
    predicate = predicate.or('fabric_code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics[index], query);
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

  // --------------- Requisition nOrder --------------
  // maps the appropriate column to fields property
  public fieldsFabricOrder: Object = { value: "wc_fabric_order_requisition_id", text: "wc_fabric_order_requisition_name" };
  // set the placeholder to the AutoComplete input
  public textFabricOrder: string = "اسم الطلبية"


  public onFilteringFabricOrder(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('wc_fabric_order_requisition_name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabricOrder, query);
  }

  constructor(
    private _consigmentDyeingService: ConsigmentDyeingService,
    private _wdService: WdService,
    private _bussinessmanService: BussinessmanService,
    private _reconcilitionRequisitionWdService: ReconcilitionRequisitionWdService,
    private _fabricOrderRequisitionWcService: FabricOrderRequisitionWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private _reportWdService: ReportWdService

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectDyeingFromWd().subscribe((response: any) => {
      this.dyers = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      ordersRequisitionsId: new FormControl("", [Validators.required]),
      fabricOrderId: new FormControl("", [Validators.required]),
      fabricId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      consigmentDyeingId: new FormControl("", [Validators.required]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
      inputOutput: new FormControl('1', [Validators.required]),
    });
  }

  addItem() {
    const control = <FormArray>this.reconcilitionRequisitionWDForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.reconcilitionRequisitionWDForm.get('items');
    control.removeAt(index);

    // Price
    this.listFabricPrices[index] = delete this.listFabricPrices[index];
    this.listFabricPrices.splice(index, 1);
    this.listFabricPricesDollar[index] = delete this.listFabricPricesDollar[index];
    this.listFabricPricesDollar.splice(index, 1);
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
      this.fabrics[index] = []
    }
    else {
      row.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._wdService.selectQuantityByDyeingByFabricOrderWd(
        this.reconcilitionRequisitionWDForm.controls['dyeingId'].value!, 
        event.itemData.wc_fabric_order_requisition_id
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
      row.controls['quantity'].setValue("")
      row.controls['consigmentDyeingId'].setValue("")
      this.currentQuantity[index] = 0
      this.listFabricPrices[index] = []
      this.listFabricPricesDollar[index] = []
    }
    else {
      row.controls['fabricCode'].setValue(event.itemData.fabric_code)
      
      this._wdService.selectConsigmentDyeingQuantityByFabricByDyeingWd(
        event.itemData.fabric_id, 
        this.reconcilitionRequisitionWDForm.controls['dyeingId'].value!,
        row.controls['fabricOrderId'].value
      ).subscribe((response: any) => {
        this.consigments[index] = response
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

  //  Dyeing
  selectDyeing(event: { itemData: any; }) {
    if (this.dyers.includes(event.itemData)) {

      this._fabricOrderRequisitionWcService.selectByDyeingWd(event.itemData.id).subscribe((response: any) => {
        this.fabricOrder = response
      })

    }
    else {
      this.reconcilitionRequisitionWDForm.controls['dyeingId'].setValue(null)
      this.fabrics = []
      this.currentQuantity = []
      this.consigments = []
    }
  }

  //  consigmentDyeing
  selectConsigment(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.consigments[index].includes(event.itemData)) {
      row.controls['price'].setValue("")
      row.controls['consigmentDyeingId'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
      this.listFabricPrices[index] = []
      this.listFabricPricesDollar[index] = []
    } else {
      this.currentQuantity[index] = event.itemData.current_quantity

      // Get Prices
      this._reportWdService.selectPriceByFabricByDyeingByConsigmentDyeingInWd(
        row.controls['fabricId'].value, 
        this.reconcilitionRequisitionWDForm.controls['dyeingId'].value!,
        event.itemData.id
      ).subscribe((response: any) => {
        this.dyersDetails = response

        this.listFabricPrices[index] = [
          this._sharedComponentService.getAvgPrice(this.dyersDetails), 
          this._sharedComponentService.getAvgInputesPrice(this.dyersDetails), 
          parseFloat(this.dyersDetails[0].latest_price)
        ]

        this.listFabricPricesDollar[index] = [
          this._sharedComponentService.getAvgPriceDynamic(
            this.dyersDetails, 
            'quantity', 
            'price_dollar'
          ), 
          this._sharedComponentService.getAvgInputesPriceDynamic(
            this.dyersDetails, 
            'quantity', 
            'price_dollar'
          ), parseFloat(this.dyersDetails[0].latest_price_dollar)
        ]
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

  async onReconcilitionRequisitionWD() {
    this.reconcilitionRequisitionWDForm.markAllAsTouched();
    if (this.reconcilitionRequisitionWDForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityTwoItemsReconciliation(
        this.reconcilitionRequisitionWDForm.controls['items'].value, this.reconcilitionRequisitionWDForm.controls['items'].value, 
        'fabricId', 'fabricId',
        'consigmentDyeingId', 'consigmentDyeingId',
        'quantity', 'fabricCode', this.currentQuantity, "inputOutput")) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.reconcilitionRequisitionWDForm, 'items',
          ['fabricCode'])
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionWdService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[55]}/details`, { id: response.id });
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
