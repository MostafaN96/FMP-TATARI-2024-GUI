import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Call Service
import { WbService } from "src/app/services/main/wb/wb.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { ManufacturingRequisitionWbService } from "src/app/services/main/wb/manufacturing-requisition-wb.service";
import { WbManufacturingOutputService } from "src/app/services/main/wb/wb-manufacturing-output.service";
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { CircularKnittingMachineBussinessmanService } from "src/app/services/main/circular-knitting-machine-bussinessman.service";
import { ConsigmentManufacturingService } from "src/app/services/main/consigment-manufacturing.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { YarnOrderRequisitionWaService } from "src/app/services/main/wa/yarn-order-requisition-wa.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-manufacturing-requisition-wb',
  templateUrl: './add-manufacturing-requisition-wb.component.html',
  styleUrls: ['./add-manufacturing-requisition-wb.component.css']
})
export class AddManufacturingRequisitionWbComponent implements OnInit {

  inputesQuantity = "0"

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];
  latestManufacturingFee: any[] = [];
  latestManufacturingFeeDollar: any[] = [];
  selection = new SelectionModel(true);

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addManufacturingRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    industryId: new FormControl("", [Validators.required]),
    ordersRequisitionsId: new FormControl("", [Validators.required]),
    yarnOrderId: new FormControl(null, [Validators.required]),
    consigmentManufacturingId: new FormControl(""),
    circularKnittingMachineId: new FormControl(""),
    isNewConsigment: new FormControl(true, [Validators.required]),
    warehouseId: new FormControl(this._constantsService.DEFAULT_WC_WAREHOUSE_ID, [Validators.required]),
    items: new FormArray([]),
    fabricId: new FormControl("", [Validators.required]),
    fabricCode: new FormControl(""),
    fabricPrice: new FormControl(""),
    fabricPriceDollar: new FormControl(""),
    fabricQuantity: new FormControl(this.inputesQuantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    manufacturingFee: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    manufacturingFeeDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    consigmentNumber: new FormControl(""),
    numberFabricPieces: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    document: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  yarns: any = []
  circularKnittingMachines: any = []
  consigments: any = []
  warehouses: any = []
  yarnOrder: any = []
  manufacturerName = ""
  fabrics: any = []
  fabricName = ""
  industries: any = []
  yarnsDetails: any = []
  getListYarnPrices: any = []
  listYarnPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  isShowAdd = true

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['select', 'date', 'yarn_code', 'yarn_name', 'yarn_lot_code', 'consigment_yarn_number', 'quantity'];
  dataSourceSearchTabel: any;

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

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

  // --------------- circular_knitting_machine --------------
  // maps the appropriate column to fields property
  public fieldsCircularKnittingMachine: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textCircularKnittingMachine: string = "الماكينة"


  public onFilteringCircularKnittingMachine(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.circularKnittingMachines, query);
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
    predicate = predicate.or('dyeing_code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

  // --------------- Consigment --------------
  // maps the appropriate column to fields property
  public fieldsConsigment: Object = { value: "id", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigment: string = "رقم الرسالة"

  public onFilteringConsigment(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigments, query);
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

  // --------------- Requisitio nOrder --------------
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
    private _warehouseService: WarehouseService,
    private _wbService: WbService,
    private _fabricService: FabricService,
    private _yarnOrderRequisitionWaService: YarnOrderRequisitionWaService,
    private _bussinessmanService: BussinessmanService,
    private _manufacturingRequisitionWbService: ManufacturingRequisitionWbService,
    private _wbManufacturingOutputService: WbManufacturingOutputService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    private _reportWbService: ReportWbService,
    private _circularKnittingMachineBussinessmanService: CircularKnittingMachineBussinessmanService,
    private _consigmentManufacturingService: ConsigmentManufacturingService,
    public _exportDataService: ExportDataService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
    this.sortColumns.sort(({ id: 'code', start: 'asc' }) as MatSortable);
  }

  getData() {
    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })

    this._bussinessmanService.selectTransportedManufacturersInWb().subscribe((response: any) => {
      this.industries = response
    })

    this._consigmentManufacturingService.selectAll().subscribe((response: any) => {
      this.consigments = response
    })
  }

  getSelectedIndex(objectData: any) {
    if (this.selectArrayValues.includes(objectData)) {
      let index = this.selectArrayValues.indexOf(objectData);
      this.selectArrayValues[index] = delete this.selectArrayValues[index];
      this.selectArrayValues.splice(index, 1);

      let indexData = this.yarns.indexOf(objectData)
      this.removeItem(indexData)
    }
    else {

      // Get Prices
      this._reportWbService.selectPriceInWb(objectData.yarn_id, this.addManufacturingRequisitionForm.controls['industryId']['value'] ?? "").subscribe((response: any) => {
        this.yarnsDetails = response
        this.getListYarnPrices[this.selectArrayValues.length - 1] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails), this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), parseFloat(this.yarnsDetails[0].latest_price)]
        this.listYarnPricesDollar[this.selectArrayValues.length - 1] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsDetails, 'price_dollar', 'quantity'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsDetails, 'price_dollar', 'quantity'), parseFloat(this.yarnsDetails[0].latest_price_dollar)]
        
        objectData.latest_price = this.yarnsDetails[0].latest_price
        objectData.latest_price_dollar = this.yarnsDetails[0].latest_price_dollar
        this.selectArrayValues.push(objectData);
        this.addItem(objectData)

      })
    }
  }

  // Initialize Form Builder
  initItem(data: any, index: number) {
    return new FormGroup({
      index: new FormControl(index),
      waYarnOrderRequisitionDetailsId: new FormControl(data.wa_yarn_order_requisition_details_id, [Validators.required]),
      yarnId: new FormControl(data.yarn_id, [Validators.required]),
      yarnName: new FormControl(data.yarn_name),
      yarnCode: new FormControl(data.yarn_code),
      yarnLotId: new FormControl(data.yarn_lot_id, [Validators.required]),
      yarnLotCode: new FormControl(data.yarn_lot_code, [Validators.required]),
      consigmentYarnId: new FormControl(data.consigment_yarn_id, [Validators.required]),
      consigmentYarnNumber: new FormControl(data.consigment_yarn_number),
      price: new FormControl(data.latest_price, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl(data.latest_price_dollar, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      ratio: new FormControl(String(data.ratio), [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      wastRatio: new FormControl(String(data.wast_ratio), [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity),
      quantityWithWaste: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      statement: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(data: any) {
    let index = this.yarns.indexOf(data)
    const control = <FormArray>this.addManufacturingRequisitionForm.get('items');
    control.push(this.initItem(data, index));

    this.addManufacturingRequisitionForm.controls['consigmentNumber'].setValue(this.yarns[0].consigment_yarn_number)
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.addManufacturingRequisitionForm.get('items');
    for (let i = 0; i < control.value.length; i++) {
      const element = control.value[i];
      if (element.index == index) {
        control.removeAt(i)
        // Remove index Price
        this.getListYarnPrices.splice(i, 1)
        this.listYarnPricesDollar.splice(i, 1)
      }
    }

  }


  //  Industry
  selectIndustry(event: { itemData: any; }) {
    if (this.industries.includes(event.itemData)) {
      this.manufacturerName = event.itemData.name

      this._fabricService.selectFabricToBeManufacturedWb(event.itemData.id).subscribe((response: any) => {
        this.fabrics = response
      })

      this._wbService.selectQuantityByIndustryWb(event.itemData.id).subscribe((response: any) => {
        this.yarns = response
        this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);
        this.dataSourceSearchTabel.sort = this.sortColumns;
      })

      this._circularKnittingMachineBussinessmanService.selectByManufacture(event.itemData.id).subscribe((response: any) => {
        this.circularKnittingMachines = response

        this.addManufacturingRequisitionForm.controls['circularKnittingMachineId'].setValue(this.circularKnittingMachines[0]?.id)
      })

    }
    else {
      const formGroup = <FormGroup>this.addManufacturingRequisitionForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));

      this.addManufacturingRequisitionForm.controls['industryId'].setValue("")
      this.addManufacturingRequisitionForm.controls['yarnOrderId'].setValue(null)
      this.addManufacturingRequisitionForm.controls['fabricId'].setValue(null)
      this.addManufacturingRequisitionForm.controls['fabricCode'].setValue(null)
      this.fabricName = ""
      this.manufacturerName = ""

      this.addManufacturingRequisitionForm.controls['document'].setValue("")
      this.addManufacturingRequisitionForm.controls['statement'].setValue("")
      this.addManufacturingRequisitionForm.controls['circularKnittingMachineId'].setValue("")

      this.fabrics = []
      this.yarns = []
      this.dataSourceSearchTabel = []
      this.circularKnittingMachines = []
    }
  }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns.indexOf(event.itemData)

    if (this.yarns[indexData] !== event.itemData) {
      row.controls['yarnId'].setValue(null)
      row.controls['yarnName'].setValue(null)
      row.controls['yarnCode'].setValue(null)
      row.controls['quantity'].setValue(null)
      row.controls['waYarnOrderRequisitionDetailsId'].setValue(null)
      const inputs = document.querySelectorAll('[name="ratio"]')
      inputs[index]['value'] = ""
    }
    else {
      row.controls['waYarnOrderRequisitionDetailsId'].setValue(event.itemData.wa_yarn_order_requisition_details_id)
      row.controls['yarnCode'].setValue(event.itemData.code)
    }
    this.validate(row, index)
  }




  validate(row: FormGroup, index) {
    // (1) 17-1-2022
    // let quantityWithWaste = parseFloat((((parseFloat(row.controls['quantity'].value) * parseFloat(row.controls['wastRatio'].value)) / 100) + parseFloat(row.controls['quantity'].value)).toFixed(2)) || ''
    // let quantityWithWaste = parseFloat((((parseFloat(row.controls['quantity'].value) * parseFloat(row.controls['wastRatio'].value)) / 100) + parseFloat(row.controls['quantity'].value)).toFixed(3)) || 0
    let quantityWithWaste = parseFloat((((parseFloat(row.controls['quantity'].value) / (1 - (parseFloat(row.controls['wastRatio'].value) / 100)) )) ).toFixed(3)) || 0
    if (quantityWithWaste > parseFloat(row.controls['validQuantity'].value)) {
      row.controls['quantity'].setErrors({ 'incorrect': true });
      row.controls['quantity'].markAsTouched()
      this.inputesQuantity = "0"
    }
    else {
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
      // this.inputesQuantity = (this.sumInputQuantity()).toFixed()
      row.controls['quantityWithWaste'].setValue(String(quantityWithWaste));
    }
  }

  //  CircularKnittingMachine
  selectCircularKnittingMachine(event: { itemData: any; }) {
    let indexData = this.circularKnittingMachines.indexOf(event.itemData)
    if (this.circularKnittingMachines[indexData] !== event.itemData) {
      this.addManufacturingRequisitionForm.controls['circularKnittingMachineId'].setValue("")
    }
  }

  //  consigmentManufacturing
  selectConsigment(event: { itemData: any; }) {
    let indexData = this.consigments.indexOf(event.itemData)
    if (this.consigments[indexData] !== event.itemData) {
      this.addManufacturingRequisitionForm.controls['consigmentManufacturingId'].setValue("")
    }
  }

  //  Fabric
  selectFabric(index: { itemData: any; }) {
    let indexData = this.fabrics.indexOf(index.itemData)
    if (this.fabrics[indexData] !== index.itemData) {
      this.addManufacturingRequisitionForm.controls['yarnOrderId'].setValue(null)
      this.addManufacturingRequisitionForm.controls['fabricId'].setValue(null)
      this.addManufacturingRequisitionForm.controls['fabricCode'].setValue(null)
      this.yarns = []
      this.dataSourceSearchTabel = []
      this.latestManufacturingFee = []
      this.latestManufacturingFeeDollar = []
      this.manufacturerName = ""
      this.fabricName = ""

      const formGroup = <FormGroup>this.addManufacturingRequisitionForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));
      // this.addManufacturingRequisitionForm.controls.items = new FormArray([])
      this.addManufacturingRequisitionForm.controls['consigmentNumber'].setValue(null)
    }
    else {
      this.fabricName = index.itemData.name
      this.addManufacturingRequisitionForm.controls['fabricCode'].setValue(index.itemData.code)

      
    this._yarnOrderRequisitionWaService.selectByIndustryByFabricWb(this.addManufacturingRequisitionForm.controls['industryId']['value'] ?? '', index.itemData.id).subscribe((response: any) => {
      this.yarnOrder = response
    })

      // this._wbService.selectQuantityByIndustryByFabricWb(this.addManufacturingRequisitionForm.controls['industryId']['value'] ?? '', index.itemData.id).subscribe((response: any) => {
      //   this.yarns = response

      //   this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);
      //   this.dataSourceSearchTabel.sort = this.sortColumns;
      // })

      this._wbManufacturingOutputService.selectLatestManufacturingFeeByIndustryByFabric(this.addManufacturingRequisitionForm.controls['industryId']['value'] ?? '', index.itemData.id).subscribe((response: any) => {
        this.latestManufacturingFee = response
      })

      this._wbManufacturingOutputService.selectLatestManufacturingFeeByIndustryByFabric(this.addManufacturingRequisitionForm.controls['industryId']['value'] ?? '', index.itemData.id).subscribe((response: any) => {
        this.latestManufacturingFeeDollar = [{manufacturing_fee_dollar: 0}]
      })

    }
  }

  
  //  Yarn Order
  selectYarnOrder(event: { itemData: any; }) {
    let indexData = this.yarnOrder.indexOf(event.itemData)
    if (this.yarnOrder[indexData] !== event.itemData) {
      this.yarns = []
      this.dataSourceSearchTabel = []
      this.addManufacturingRequisitionForm.controls['ordersRequisitionsId'].setValue("")

      const formGroup = <FormGroup>this.addManufacturingRequisitionForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));
    }
    else {
      this.addManufacturingRequisitionForm.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._wbService.selectQuantityByIndustryByFabricWb(this.addManufacturingRequisitionForm.controls['industryId']['value'] ?? '', this.addManufacturingRequisitionForm.controls['fabricId']['value'] ?? '', event.itemData.id).subscribe((response: any) => {
        this.yarns = response

        this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);
        this.dataSourceSearchTabel.sort = this.sortColumns;
      })

    }
  }

  selectWarehouse(event: { itemData: any; }) {
    if (!this.warehouses.includes(event.itemData)) {
      this.addManufacturingRequisitionForm.controls['warehouseId'].setValue(null)
    }
  }

  calcQuantityRatio(row: any, index: any) {
    row.controls['quantity'].setValue(String((parseFloat(this.addManufacturingRequisitionForm.controls['fabricQuantity'].value!) * parseFloat(row.controls['ratio'].value) / 100).toFixed(3)))
    this.validate(row, index)
  }

  calcAllQuantitiesRatio() {
    let elements: any = this.addManufacturingRequisitionForm.controls.items["controls"]

    for (let i = 0; i < elements.length; i++) {
      const element = this.addManufacturingRequisitionForm.controls.items["controls"][i];
      this.calcQuantityRatio(element, i)
    }
  }

  // sumInputQuantity() {
  //   return this.addManufacturingRequisitionForm.controls.items.value.map(function (a) { return (((parseFloat(a['quantity']) * parseFloat(a['wastRatio'])) / 100) + parseFloat(a['quantity']))  }).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  // }

  getTotalPriceXQuantityWithWast() {
    return this.addManufacturingRequisitionForm.controls.items.value.map((a) => { return (parseFloat(a['quantity']) * parseFloat(a['price'])) + (((parseFloat(a['price']) * parseFloat(a['quantity'])) * parseFloat(this.notZero(a['wastRatio']))) / 100) }).reduce((acc, value) => acc + value, 0);
  }

  getTotalPriceXQuantityWithWastDollar() {
    return this.addManufacturingRequisitionForm.controls.items.value.map((a) => { return (parseFloat(a['quantity']) * parseFloat(a['priceDollar'])) + (((parseFloat(a['priceDollar']) * parseFloat(a['quantity'])) * parseFloat(this.notZero(a['wastRatio']))) / 100) }).reduce((acc, value) => acc + value, 0);
  }

  avgCost() {
    this.addManufacturingRequisitionForm.controls['fabricPrice'].setValue(String(((parseFloat(this.addManufacturingRequisitionForm.controls['fabricQuantity'].value!) * parseFloat(this.addManufacturingRequisitionForm.controls['manufacturingFee'].value!)) + this.getTotalPriceXQuantityWithWast()) / parseFloat(this.addManufacturingRequisitionForm.controls['fabricQuantity'].value!)))
    this.addManufacturingRequisitionForm.controls['fabricPriceDollar'].setValue(String(((parseFloat(this.addManufacturingRequisitionForm.controls['fabricQuantity'].value!) * parseFloat(this.addManufacturingRequisitionForm.controls['manufacturingFeeDollar'].value!)) + this.getTotalPriceXQuantityWithWastDollar()) / parseFloat(this.addManufacturingRequisitionForm.controls['fabricQuantity'].value!)))
  }

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  calcManufacturingFee(type) {
    if(type == "manufacturingFeeEG") {
      this.addManufacturingRequisitionForm.controls['manufacturingFeeDollar'].setValue((this._sharedComponentService.calcEgpToDollar(this.addManufacturingRequisitionForm.controls['manufacturingFee'].value)).toFixed(3))
    } else if (type == "manufacturingFeeDollar") {
      this.addManufacturingRequisitionForm.controls['manufacturingFee'].setValue((this._sharedComponentService.calcDollarToEgp(this.addManufacturingRequisitionForm.controls['manufacturingFeeDollar'].value)).toFixed(3))
    }
  }

  async onAddRequisition() {
    this.avgCost()
    this.isShowAdd = false
    this.addManufacturingRequisitionForm.markAllAsTouched();
    if (this.addManufacturingRequisitionForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addManufacturingRequisitionForm, 'items',
        ['index', 'yarnName', 'yarnCode', 'yarnLotCode', 'consigmentYarnNumber', 'validQuantity'])
      this._constantsService.spinner.show()
      this._manufacturingRequisitionWbService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[29]}/details`, { id: response.id });
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
  }

  //  Get Average Inputes Price
  notZero(n) {
    n = +n;  // Coerce to number.
    if (!n) {  // Matches +0, -0, NaN
      n = 1
    }
    return n;
  }

  // Get Avg Inputes Price
  getTotalAmountQuantityInput(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice(yarns) {
    return this.getInputAmount(yarns) / this.notZero(this.getTotalAmountQuantityInput(yarns))
  }

  // AVG Price
  getOutputAmount(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '0') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getItemAmount(yarns) {
    return this.getInputAmount(yarns) - this.getOutputAmount(yarns)
  }

  getAvgPrice(yarns) {
    return this.getItemAmount(yarns) / this.notZero(yarns.current_quantity)
  }
}
