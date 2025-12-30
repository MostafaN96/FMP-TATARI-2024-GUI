import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { WbTransportWaWbRequisitionDetailsService } from "src/app/services/main/wb/wb-transport-wa-wb-requisition-details.service";
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { WaService } from "src/app/services/main/wa/wa.service";
import { ConsigmentYarnService } from 'src/app/services/main/consigment-yarn.service';
import { YarnOrderRequisitionWaService } from "src/app/services/main/wa/yarn-order-requisition-wa.service";
import { AddPurchaseOrderWaService } from "src/app/services/main/wa/add-purchase-order-wa.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ActivatedRoute } from '@angular/router';
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transport-wa-wb-requisition-form-wb',
  templateUrl: './add-transport-wa-wb-requisition-form-wb.component.html',
  styleUrls: ['./add-transport-wa-wb-requisition-form-wb.component.css']
})
export class AddTransportWaWbRequisitionFormWbComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  transportWaWbForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    warehouseId: new FormControl(null, [Validators.required]),
    fromOrdersRequisitionsId: new FormControl("", [Validators.required]),
      fromYarnOrderId: new FormControl("", [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  lots: any = []
  fromConsigmentsYarns: any = []
  consigmentsYarns: any = []
  fromYarnOrder: any = []
  yarnOrder: any = []
  yarns: any = []
  industries: any = []
  fabrics: any = []
  currentQuantity: any = []
  neededYarnQuantity: any = []
  yarnsDetails: any
  getListYarnPrices: any = []
  listYarnPrices: any = []
  listYarnPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر", "آخر سعر الرسالة"]
  @Input() selectedData: any
  isShowAdd = true

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

  // --------------- Industry --------------
  // maps the appropriate column to fields property
  public fieldsIndustry: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textIndustry: string = "المصنع"


  public onFilteringIndustry(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.industries, query);
  }

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "القماش المراد تصنيعه"

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
  public fieldsFromConsigmentYarn: Object = { value: "id", text: "number" };
  // set the placeholder to the AutoComplete input
  public textFromConsigmentYarn: string = "رقم الرسالة"

  public onFilteringFromConsigmentYarn(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fromConsigmentsYarns[index], query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "number", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "الى رقم الرسالة"

  public onFilteringConsigmentYarn(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigmentsYarns, query);
  }

  // --------------- From Requisition nOrder --------------
  // maps the appropriate column to fields property
  public fieldsFromYarnOrder: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFromYarnOrder: string = "من طلبية"


  public onFilteringFromYarnOrder(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fromYarnOrder, query);
  }

  
  // --------------- Requisition Order --------------
  // maps the appropriate column to fields property
  public fieldsYarnOrder: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarnOrder: string = "الى طلبية"

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
    private _waService: WaService,
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _bussinessmanService: BussinessmanService,
    private _wbTransportWaWbRequisitionDetailsService: WbTransportWaWbRequisitionDetailsService,
    private _yarnOrderRequisitionWaService: YarnOrderRequisitionWaService,
    private _addPurchaseOrderWaService: AddPurchaseOrderWaService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    private _reportWaService: ReportWaService,
    private _fabricService: FabricService,
    private _consigmentYarnService: ConsigmentYarnService,
    private route: ActivatedRoute,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getData()
  }

  getData() {    
    this.route.queryParams.subscribe(params => {
      this.transportWaWbForm.controls.id.setValue(params['id'])
      this.transportWaWbForm.controls.warehouseId.setValue(this.selectedData[0]['warehouse_id'])
      this.transportWaWbForm.controls.fromOrdersRequisitionsId.setValue(this.selectedData[0]['from_orders_requisitions_id'])
      this.transportWaWbForm.controls.fromYarnOrderId.setValue(this.selectedData[0]['from_wa_yarn_order_requisition_id'])

      // this._yarnOrderRequisitionWaService.selectByWarehouseWa(this.selectedData[0]['warehouse_id']).subscribe((response: any) => {
      //   this.fromYarnOrder = response
      // })
    })


    this._bussinessmanService.selectManufacturer().subscribe((response: any) => {
      this.industries = response
    })

    this._consigmentYarnService.selectAll().subscribe((response: any) => {
      this.consigmentsYarns = response
    })

    
    this._yarnOrderRequisitionWaService.selectAll("opened").subscribe((response: any) => {
      this.yarnOrder = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      waYarnOrderRequisitionDetailsId: new FormControl(""),
      yarnOrderId: new FormControl("", [Validators.required]),
      ordersRequisitionsId: new FormControl("", [Validators.required]),
      yarnId: new FormControl("", [Validators.required]),
      industryId: new FormControl("", [Validators.required]),
      fabricToBeManufacturedId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      yarnName: new FormControl(""),
      yarnCode: new FormControl(""),
      yarnLotId: new FormControl("", [Validators.required]),
      fromConsigmentYarnId: new FormControl("", [Validators.required]),
      consigmentYarnId: new FormControl(""),
      consigmentYarnNumber: new FormControl("", [Validators.required]),
      price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      exceededRatio: new FormControl(10, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.transportWaWbForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.transportWaWbForm.get('items');
    control.removeAt(index);

    // Price
    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
    this.listYarnPricesDollar[index] = delete this.listYarnPricesDollar[index];
    this.listYarnPricesDollar.splice(index, 1);
  }

  // // From Yarn Order
  // selectFromYarnOrder(event: { itemData: any; }, row: FormGroup, index) {
  //   let indexData = this.fromYarnOrder.indexOf(event.itemData)

  //   if (this.fromYarnOrder[indexData] !== event.itemData) {
  //     row.controls['fromOrdersRequisitionsId'].setValue("")
  //     row.controls['fromYarnOrderId'].setValue("")
  //     row.controls['yarnId'].setValue("")
  //     row.controls['yarnCode'].setValue("")
  //     row.controls['yarnName'].setValue("")
  //     row.controls['quantity'].setValue("")
  //     row.controls['yarnLotId'].setValue("")
  //     row.controls['fromConsigmentYarnId'].setValue("")
  //     this.currentQuantity[index] = 0
  //     this.neededYarnQuantity[index] = 0
  //     this.fabrics[index] = []
  //     this.yarns[index] = []
  //   }
  //   else {
  //     row.controls['fromOrdersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

  //     this._yarnService.selectByWarehouseWa(this.transportWaWbForm.controls['warehouseId'].value!, event.itemData.id).subscribe((response: any) => {
  //       this.yarns[index] = response
  //     })

  //   }
  //   this.validate(row, index)
  // }

  
  //  Yarn Order
  selectYarnOrder(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarnOrder.indexOf(event.itemData)

    if (this.yarnOrder[indexData] !== event.itemData) {
      row.controls['ordersRequisitionsId'].setValue("")
      row.controls['waYarnOrderRequisitionDetailsId'].setValue("")
      row.controls['yarnOrderId'].setValue("")
      row.controls['fabricToBeManufacturedId'].setValue("")
      row.controls['fabricCode'].setValue("")
      this.fabrics[index] = []
    }
    else {
      row.controls['ordersRequisitionsId'].setValue(event.itemData.requestionDetails[0].orders_requisitions_id)
      row.controls['yarnOrderId'].setValue(event.itemData.id)
      
      
    this._fabricService.selectFabricsByOrder(event.itemData.requestionDetails[0].orders_requisitions_id).subscribe((response: any) => {
      this.fabrics[index] = response
    })
    }
  }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns[index].indexOf(event.itemData)

    if (this.yarns[index][indexData] !== event.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['yarnName'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['yarnLotId'].setValue("")
      row.controls['fromConsigmentYarnId'].setValue("")
      this.currentQuantity[index] = 0
      this.neededYarnQuantity[index] = 0
      this.lots[index] = []
      this.fromConsigmentsYarns[index] = []
      // this.yarnOrder[index] = []
    }
    else {
      row.controls['yarnCode'].setValue(event.itemData.code)
      row.controls['yarnName'].setValue(event.itemData.name)

      this._yarnLotService.selectByWarehouseByYarnWa(
        this.transportWaWbForm.controls['warehouseId'].value!, 
        event.itemData.id,
        this.transportWaWbForm.controls['fromYarnOrderId'].value!
      ).subscribe((response: any) => {
        this.lots[index] = response
        if(this.lots[index][0] != null) {
          row.controls['yarnLotId'].setValue(this.lots[index][0].id)
          this.getRemainingByWarehouseByYarnByLotWa(
            this.transportWaWbForm.controls['warehouseId'].value!,
            event.itemData.id,
            this.lots[index][0].id,
            this.transportWaWbForm.controls['fromYarnOrderId'].value!,
            index
          )
        }
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

  //  Industry
  selectIndustry(event: { itemData: any; }, row: FormGroup) {
    let indexData = this.industries.indexOf(event.itemData)

    if (this.industries[indexData] !== event.itemData) {
      row.controls['industryId'].setValue(null)
    }
  }

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics[index].indexOf(event.itemData)
    if (this.fabrics[index][indexData] !== event.itemData) {
      row.controls['fabricToBeManufacturedId'].setValue("")
      row.controls['fabricCode'].setValue("")
      this.neededYarnQuantity[index] = 0
      this.lots[index] = []
      this.yarns[index] = []
      this.fromConsigmentsYarns[index] = []
    }
    else {
      row.controls['fabricCode'].setValue(event.itemData.code)
      
      this._yarnService.selectByWarehouseWaByFabricByFromYarnOrder(
        this.transportWaWbForm.controls['warehouseId'].value!, 
        event.itemData.id,
        this.transportWaWbForm.controls['fromYarnOrderId'].value!
      ).subscribe((response: any) => {
        this.yarns[index] = response
      })
      
    this._addPurchaseOrderWaService.getCurrentNeededYarnQuantityOfFabricForOrder({
      ordersRequisitionsId: row.controls['ordersRequisitionsId'].value, 
      yarnId: row.controls['yarnId'].value, 
      fabricId: event.itemData.id
    }).subscribe((response: any) => {
      this.neededYarnQuantity[index] = response[0]?.needed_quantity ?? 0
      row.controls['quantity'].setValue(this._sharedComponentService.getValueWithRatio(response[0]?.needed_quantity ?? 0, row.controls['exceededRatio'].value))
    })
    }
  }

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots[index].indexOf(event.itemData)
    if (this.lots[index][indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      row.controls['fromConsigmentYarnId'].setValue("")
      this.currentQuantity[index] = 0
      this.neededYarnQuantity[index] = 0
      this.fromConsigmentsYarns[index] = []
    } else {
      this.getRemainingByWarehouseByYarnByLotWa(
        this.transportWaWbForm.controls['warehouseId'].value!,
      row.controls['yarnId'].value!,
      event.itemData.id, 
      this.transportWaWbForm.controls['fromYarnOrderId'].value!,
      index)
    }
  }

  getRemainingByWarehouseByYarnByLotWa(
    warehouseId: string, 
    yarnId: string, 
    lotId:string, 
    fromYarnOrderId:string, 
    index) {
    this._waService.selectRemainingByWarehouseByYarnByLotWa(
      warehouseId,
      yarnId,
      lotId,
      fromYarnOrderId
    ).subscribe((response: any) => {
        this.fromConsigmentsYarns[index] = response
      })
  }
  // End Yarn Lot Autocomplete Section

  // Start Consigment Yarn Autocomplete Section
  //  Consigment Yarn
  selectFromConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.fromConsigmentsYarns[index].indexOf(event.itemData)
    if (this.fromConsigmentsYarns[index][indexData] !== event.itemData) {
      row.controls['fromConsigmentYarnId'].setValue("")
      row.controls['consigmentYarnId'].setValue("")
      row.controls['consigmentYarnNumber'].setValue("")
      row.controls['validQuantity'].setValue("")
      this.currentQuantity[index] = 0
      this.neededYarnQuantity[index] = 0
    }
    else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)

      row.controls['consigmentYarnId'].setValue(event.itemData.id)
      row.controls['consigmentYarnNumber'].setValue(event.itemData.number)
      
      // Get Prices
      this._reportWaService.selectPriceWa(row.controls['yarnId'].value, event.itemData.id).subscribe((response: any) => {
        this.yarnsDetails = response        
        this.listYarnPrices[index] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails), this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), this.yarnsDetails[0].latest_price, this.yarnsDetails[0].latest_consigment_price]
        this.listYarnPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this.yarnsDetails[0].latest_price_dollar, this.yarnsDetails[0].latest_consigment_price_dollar]
        row.controls['price'].setValue(this.yarnsDetails[0].latest_price)
        row.controls['priceDollar'].setValue(this.yarnsDetails[0].latest_price_dollar)
      })
    }
  }
  // End Consigment Yarn Autocomplete Section

  //  ConsigmentYarn
  selectConsigmentYarn(event: { itemData: any; }, row: FormGroup) {
    if (!this.consigmentsYarns.includes(event.itemData)) {
      row.controls['consigmentYarnId'].setValue("")
    }
  }

  // exceededRatio
  changeExceededRatio(event, row: FormGroup, index) {
    row.controls['quantity'].setValue(0)
    row.controls['quantity'].setValue(this._sharedComponentService.getValueWithRatio(this.neededYarnQuantity[index] ?? 0, event.target.value))
  }

  // getRatioWithValue
  getRatioWithValue(event, row: FormGroup, index) {
    row.controls['exceededRatio'].setValue(this._sharedComponentService.getRatioWithValue(event.target.value, this.neededYarnQuantity[index]))
  }

  // price
  changePrice(type, row: FormGroup) {
    if (type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  async onTransportWaWbRequisition() {
    this.isShowAdd = false

    this.transportWaWbForm.markAllAsTouched();
    if (this.transportWaWbForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantity(
        this.transportWaWbForm.controls.items.value, this.transportWaWbForm.controls.items.value,
        'fromConsigmentYarnId', 'fromConsigmentYarnId',
        'yarnLotId', 'yarnLotId',
        'yarnId', 'yarnId',
        'quantity', 'yarnName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.transportWaWbForm, 'items',
          ['fabricCode', 'yarnName', 'yarnCode', 'validQuantity'])
        this._constantsService.spinner.show()
        this._wbTransportWaWbRequisitionDetailsService.create(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.reloadPageWithDynamicParams({ id: this.selectedData[0]['requisition_id'], warehouseId: this.selectedData[0]['warehouse_id'] });
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
