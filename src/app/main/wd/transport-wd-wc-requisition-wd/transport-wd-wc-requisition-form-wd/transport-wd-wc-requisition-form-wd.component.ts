import { Component, Inject, Input, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WdService } from "src/app/services/main/wd/wd.service";
import { TransportWdWcRequisitionDetailsWdService } from "src/app/services/main/wd/transport-wd-wc-requisition-details-wd.service";
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

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transport-wd-wc-requisition-form-wd',
  templateUrl: './transport-wd-wc-requisition-form-wd.component.html',
  styleUrls: ['./transport-wd-wc-requisition-form-wd.component.css']
})
export class TransportWdWcRequisitionFormWdComponent implements OnInit {

  @Input() selectedData: any

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  transportWdWcRequisitionForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    dyeingId: new FormControl("", [Validators.required]),
    warehouseId: new FormControl("", [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any = []
  dyers: any = []
  currentQuantity: any = []
  requisitionId: string = '';
  consigments: any = []
  fabricOrder: any = []
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  listFabricPrices:any = []
  listFabricPricesDollar:any = []
  dyersDetails:any = []

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
    private _wdService: WdService,
    private _transportWdWcRequisitionDetailsWdService: TransportWdWcRequisitionDetailsWdService,
    private _fabricOrderRequisitionWcService: FabricOrderRequisitionWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private route: ActivatedRoute,
    private _consigmentDyeingService: ConsigmentDyeingService,
private _reportWdService: ReportWdService

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
    this.route.queryParams.subscribe(params => {
      this.transportWdWcRequisitionForm.controls['id'].setValue(params['id'])
      this.requisitionId = params['id']
    })
  }

  ngAfterViewInit(){
    
    this._fabricOrderRequisitionWcService.selectByDyeingWd(this.selectedData.dyeing_id).subscribe((response: any) => {
      this.fabricOrder = response
    })

    this.transportWdWcRequisitionForm.controls['dyeingId'].setValue(this.selectedData.dyeing_id)
    this.transportWdWcRequisitionForm.controls['warehouseId'].setValue(this.selectedData.warehouse_id)
  }

  getData() {
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      ordersRequisitionsId: new FormControl("", [Validators.required]),
      fabricOrderId: new FormControl("", [Validators.required]),
      fabricId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      fabricName: new FormControl(""),
      consigmentDyeingId: new FormControl("", [Validators.required]),
      consigmentManufacturingNumber: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.transportWdWcRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.transportWdWcRequisitionForm.get('items');
    control.removeAt(index);
  }

  //  Fabric Order
  selectFabricOrder(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabricOrder.indexOf(event.itemData)

    if (this.fabricOrder[indexData] !== event.itemData) {
      row.controls['ordersRequisitionsId'].setValue("")
      row.controls['fabricOrderId'].setValue("")
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['consigmentDyeingId'].setValue("")
      row.controls['consigmentManufacturingNumber'].setValue("")
      this.currentQuantity[index] = 0
      this.fabrics[index] = []
    }
    else {
      row.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._wdService.selectQuantityByDyeingByFabricOrderWd(
        this.transportWdWcRequisitionForm.controls['dyeingId'].value!, 
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
      row.controls['fabricId'].setValue(null)
      row.controls['fabricCode'].setValue(null)
      row.controls['fabricName'].setValue(null)
      row.controls['quantity'].setValue(null)
      row.controls['consigmentDyeingId'].setValue("")
      row.controls['consigmentManufacturingNumber'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['fabricCode'].setValue(event.itemData.fabric_code)
      row.controls['fabricName'].setValue(event.itemData.fabric_name)
      
      this._wdService.selectConsigmentDyeingQuantityByFabricByDyeingWd(
        event.itemData.fabric_id, 
        this.transportWdWcRequisitionForm.controls['dyeingId'].value!,
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
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)
      row.controls['consigmentManufacturingNumber'].setValue(event.itemData.number)

      // Get Prices
      this._reportWdService.selectPriceByFabricByDyeingByConsigmentDyeingInWd(
        row.controls['fabricId'].value, 
        this.transportWdWcRequisitionForm.controls['dyeingId'].value!,
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

  async onTransportWdWcRequisition() {
    this.transportWdWcRequisitionForm.markAllAsTouched();
    if (this.transportWdWcRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityTwoItems(
        this.transportWdWcRequisitionForm.controls.items.value, this.transportWdWcRequisitionForm.controls.items.value,
        'consigmentDyeingId', 'consigmentDyeingId',
        'fabricId',  'fabricId', 
        'quantity', 'fabricName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.transportWdWcRequisitionForm, 'items',
          ['fabricName', 'fabricCode', 'validQuantity'])
        this._constantsService.spinner.show()
        this._transportWdWcRequisitionDetailsWdService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.reloadPageWithParams(this.requisitionId);
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
