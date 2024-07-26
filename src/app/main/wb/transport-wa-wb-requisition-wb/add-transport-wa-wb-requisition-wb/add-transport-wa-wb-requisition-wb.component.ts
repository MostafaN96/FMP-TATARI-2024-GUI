import { Component, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { TransportWaWbService } from "src/app/services/main/wb/transport-wa-wb-requisition-wb.service";
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { WaService } from "src/app/services/main/wa/wa.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { ConsigmentYarnService } from "src/app/services/main/consigment-yarn.service";
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transport-wa-wb-requisition-wb',
  templateUrl: './add-transport-wa-wb-requisition-wb.component.html',
  styleUrls: ['./add-transport-wa-wb-requisition-wb.component.css']
})
export class AddTransportWaWbRequisitionWbComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  transportWaWbForm = new FormGroup({
    warehouseId: new FormControl(this._constantsService.DEFAULT_WA_WAREHOUSE_READY_ORDER_ID, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  warehouses: any = []
  yarns: any = []
  lots: any = []
  fromConsigmentsYarns: any = []
  consigmentsYarns: any = []
  industries: any = []
  fabrics: any = []
  currentQuantity: any = []
  yarnsDetails: any = []
  requisitionsOrder: any = []
  listYarnPrices: any = []
  listYarnPricesDollar: any = []
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر", "آخر سعر الرسالة"]
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

  public onFilteringYarnName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarns, query);
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

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
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

  // --------------- Lot --------------
  // maps the appropriate column to fields property
  public fieldsLot: Object = { value: "id", text: "code" };
  // set the placeholder to the AutoComplete input
  public textLot: string = "اللوط"

  public onFilteringLot(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.lots, query);
  }

  // --------------- From Consigment Yarn --------------
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

  // --------------- Requisitio nOrder --------------
  // maps the appropriate column to fields property
  public fieldsRequisitionOrderName: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textRequisitionsOrderName: string = "اسم الطلبية"


  public onFilteringRequisitionOrderName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.requisitionsOrder, query);
  }

  constructor(
    private _warehouseService: WarehouseService,
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _waService: WaService,
    private _bussinessmanService: BussinessmanService,
    private _transportWaWbService: TransportWaWbService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    private _reportWaService: ReportWaService,
    private _fabricService: FabricService,
    private _consigmentYarnService: ConsigmentYarnService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()

    this.transportWaWbForm.controls['warehouseId'].disable()

  }

  getData() {
    this._warehouseService.selectWhereInWa().subscribe((response: any) => {
      this.warehouses = response
      this.selectByWarehouseWa();
    })

    // this._yarnService.selectRemaining().subscribe((response: any) => {
    //   this.yarns = response
    // })

    this._bussinessmanService.selectManufacturer().subscribe((response: any) => {
      this.industries = response
    })

    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })

    this._consigmentYarnService.selectAll().subscribe((response: any) => {
      this.consigmentsYarns = response
    })

    this._dyedFabricOrderRequisitionWeService.selectAll('opened').subscribe((response: any) => {
      this.requisitionsOrder = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
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

  //  Warehouse
  selectWarehouse(event: { itemData: any; }) {
    if (!this.warehouses.includes(event.itemData)) {
      this.transportWaWbForm.controls['warehouseId'].setValue(null)
      this.transportWaWbForm.controls.items.reset()
      this.currentQuantity = []
      this.yarns = []
    } else {
      this.selectByWarehouseWa(event.itemData.id)
    }
  }

  selectByWarehouseWa(warehouseId = this._constantsService.DEFAULT_WA_WAREHOUSE_READY_ORDER_ID) {
    this._yarnService.selectByWarehouseWa(warehouseId).subscribe((response: any) => {
      this.yarns = response

      if (Array.isArray(this.yarns) && this.yarns.length < 1) {
        this.transportWaWbForm.controls['warehouseId'].setValue(null)
      }
      
    })
  }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns.indexOf(event.itemData)

    if (this.yarns[indexData] !== event.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['yarnName'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['yarnLotId'].setValue("")
      row.controls['fromConsigmentYarnId'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['yarnCode'].setValue(event.itemData.code)
      row.controls['yarnName'].setValue(event.itemData.name)

      this._yarnLotService.selectByWarehouseByYarnWa(this.transportWaWbForm.controls['warehouseId'].value!, event.itemData.id).subscribe((response: any) => {
        this.lots = response
        if(this.lots[0] != null) {
          row.controls['yarnLotId'].setValue(this.lots[0].id)
          this.getRemainingByWarehouseByYarnByLotWa(
            this.transportWaWbForm.controls['warehouseId'].value!,
            event.itemData.id,
            this.lots[0].id,
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
      row.controls['industryId'].setValue("")
    }
  }

  //  Fabric
  selectFabric(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.fabrics.indexOf(index.itemData)
    if (this.fabrics[indexData] !== index.itemData) {
      row.controls['fabricToBeManufacturedId'].setValue("")
      row.controls['fabricCode'].setValue("")
    }
    else {
      row.controls['fabricCode'].setValue(index.itemData.code)
    }
  }

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots.indexOf(event.itemData)
    if (this.lots[indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      row.controls['fromConsigmentYarnId'].setValue("")
      this.currentQuantity[index] = 0
    } else {
      this.getRemainingByWarehouseByYarnByLotWa(this.transportWaWbForm.controls['warehouseId'].value!,
      row.controls['yarnId'].value!,
      event.itemData.id, index)
    }
  }

  getRemainingByWarehouseByYarnByLotWa(warehouseId: string, yarnId: string, lotId:string, index) {
    this._waService.selectRemainingByWarehouseByYarnByLotWa(
      warehouseId,
      yarnId,
      lotId).subscribe((response: any) => {
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

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
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
        this._transportWaWbService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[25]}/details`, { id: response.id });
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
