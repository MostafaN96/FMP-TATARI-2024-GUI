import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { TransportWbWaRequisitionWbService } from "src/app/services/main/wb/transport-wb-wa-requisition-wb.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { WbService } from "src/app/services/main/wb/wb.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transport-wb-wa-requisition-wb',
  templateUrl: './add-transport-wb-wa-requisition-wb.component.html',
  styleUrls: ['./add-transport-wb-wa-requisition-wb.component.css']
})
export class AddTransportWbWaRequisitionWbComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  transportWbWaRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    industryId: new FormControl(null, [Validators.required]),
    warehouseId: new FormControl(this._constantsService.DEFAULT_WA_WAREHOUSE_ID, [Validators.required]),
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
  consigmentsYarns: any = []
  industries: any = []
  currentQuantity: any = []
  yarnsDetails: any = []
  listYarnPrices: any = []
  listYarnPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الخيط"

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

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "id", text:"number"};
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentYarn (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.consigmentsYarns[index], query);
  }

  constructor(
    private _warehouseService: WarehouseService,
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _wbService: WbService,
    private _bussinessmanService: BussinessmanService,
    private _transportWbWaRequisitionWbService: TransportWbWaRequisitionWbService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private _reportWbService: ReportWbService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })

    this._bussinessmanService.selectTransportedManufacturersInWb().subscribe((response: any) => {
      this.industries = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl("", [Validators.required]),
      yarnCode: new FormControl(""),
      yarnName: new FormControl(""),
      yarnLotId: new FormControl("", [Validators.required]),
      consigmentYarnId: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.transportWbWaRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.transportWbWaRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
    this.listYarnPricesDollar[index] = delete this.listYarnPricesDollar[index];
    this.listYarnPricesDollar.splice(index, 1);
  }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns.indexOf(event.itemData)

    if (this.yarns[indexData] !== event.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['yarnName'].setValue("")
      row.controls['yarnLotId'].setValue("")
      row.controls['consigmentYarnId'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['yarnId'].setValue(event.itemData.id)
      row.controls['yarnCode'].setValue(event.itemData.code)
      row.controls['yarnName'].setValue(event.itemData.name)

      this._yarnLotService.selectByIndustryByYarnWb(
        this.transportWbWaRequisitionForm.controls['industryId'].value!,
        event.itemData.id
        ).subscribe((response: any) => {
        this.lots = response

        if(this.lots[0] != null) {
          row.controls['yarnLotId'].setValue(this.lots[0].id)
          this.getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(
            this.transportWbWaRequisitionForm.controls['industryId'].value!,
            event.itemData.id,
            this.lots[0].id,
            index
          )
        }
      })

      // Get Prices
      this._reportWbService.selectPriceInWb(event.itemData.id, this.transportWbWaRequisitionForm.controls['industryId'].value!).subscribe((response: any) => {
        this.yarnsDetails = response
        this.listYarnPrices[index] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails) , this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), this.yarnsDetails[0].latest_price]
        this.listYarnPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this.yarnsDetails[0].latest_price_dollar]
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

  selectIndustry(event: { itemData: any; }) {
    if (this.industries.includes(event.itemData)) {
      this._yarnService.selectByIndustryWb(event.itemData.id).subscribe((response: any) => {
        this.yarns = response
      })

    }
    else {
      this.transportWbWaRequisitionForm.controls['industryId'].setValue(null)
      // this.transportWbWaRequisitionForm.controls.items = new FormArray([this.initItem()])
      this.yarns = []
    }
  }

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots.indexOf(event.itemData)
    if (this.lots[indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      row.controls['consigmentYarnId'].setValue("")
      this.currentQuantity[index] = 0
    } else {
      this.getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(
        this.transportWbWaRequisitionForm.controls['industryId'].value!,
        row.controls['yarnId'].value!,
        event.itemData.id, index
      )
    }
  }

  getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(industryId: string, yarnId: string, lotId:string, index) {
    this._wbService.selectConsigmentYarnQuantityByYarnByIndustryByLotWb(
      yarnId,
      industryId, 
      lotId
      ).subscribe((response: any) => {
        this.consigmentsYarns[index] = response
      })
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
    }    
  }
  // End Consigment Yarn Autocomplete Section

  //  Warehouse
  selectWarehouse(event: { itemData: any; }) {
    if (!this.warehouses.includes(event.itemData)) {
      this.transportWbWaRequisitionForm.controls['warehouseId'].setValue(null)
    }
  }

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue("0")
    } else if (type == "priceDollar") {
      row.controls['price'].setValue("0")
    }
  }

  async onTransportWbWaRequisition() {
    this.transportWbWaRequisitionForm.markAllAsTouched();
    if (this.transportWbWaRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantity(
        this.transportWbWaRequisitionForm.controls.items.value, this.transportWbWaRequisitionForm.controls.items.value,
        'consigmentYarnId', 'consigmentYarnId',
        'yarnLotId', 'yarnLotId',
        'yarnId', 'yarnId',
        'quantity', 'yarnName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.transportWbWaRequisitionForm, 'items',
          ['yarnCode', 'yarnName', 'validQuantity'])
        this._constantsService.spinner.show()
        this._transportWbWaRequisitionWbService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[31]}/details`, { id: response.id });
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
