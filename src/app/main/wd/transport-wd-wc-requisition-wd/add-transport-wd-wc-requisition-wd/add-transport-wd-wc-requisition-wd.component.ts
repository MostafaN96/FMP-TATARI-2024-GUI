import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WdService } from "src/app/services/main/wd/wd.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { TransportWdWcRequisitionWdService } from "src/app/services/main/wd/transport-wd-wc-requisition-wd.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { ConsigmentDyeingService } from "src/app/services/main/consigment-dyeing.service";
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transport-wd-wc-requisition-wd',
  templateUrl: './add-transport-wd-wc-requisition-wd.component.html',
  styleUrls: ['./add-transport-wd-wc-requisition-wd.component.css']
})
export class AddTransportWdWcRequisitionWdComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  transportWdWcRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    dyeingId: new FormControl(null, [Validators.required]),
    warehouseId: new FormControl(this._constantsService.DEFAULT_WC_WAREHOUSE_ID, [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  warehouses: any = []
  fabrics: any = []
  dyers: any = []
  currentQuantity: any = []
  consigments: any = []
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

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('fabric_name', 'contains', e.text);
    predicate = predicate.or('fabric_code', 'contains', e.text);
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
    private _consigmentDyeingService: ConsigmentDyeingService,
    private _wdService: WdService,
    private _bussinessmanService: BussinessmanService,
    private _transportWdWcRequisitionWdService: TransportWdWcRequisitionWdService,
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
    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })

    this._bussinessmanService.selectDyeingFromWd().subscribe((response: any) => {
      this.dyers = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fabricId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      fabricName: new FormControl(""),
      consigmentDyeingId: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      consigmentManufacturingNumber: new FormControl('', [Validators.required]),
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

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics.indexOf(event.itemData)

    if (this.fabrics[indexData] !== event.itemData) {
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['consigmentDyeingId'].setValue("")
      row.controls['consigmentManufacturingNumber'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['fabricCode'].setValue(event.itemData.fabric_code)
      row.controls['fabricName'].setValue(event.itemData.fabric_name)

      this._wdService.selectConsigmentDyeingQuantityByFabricByDyeingWd(event.itemData.fabric_id, this.transportWdWcRequisitionForm.controls['dyeingId'].value!).subscribe((response: any) => {
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

  selectDyeing(event: { itemData: any; }) {
    if (this.dyers.includes(event.itemData)) {
      this._wdService.selectQuantityByDyeingWd(event.itemData.id).subscribe((response: any) => {
        this.fabrics = response
      })
    }
    else {
      this.transportWdWcRequisitionForm.controls['dyeingId'].setValue(null)
      this.transportWdWcRequisitionForm.controls.items = new FormArray([this.initItem()])
      this.fabrics = []
    }
  }

  //  Warehouse
  selectWarehouse(event: { itemData: any; }) {
    if (!this.warehouses.includes(event.itemData)) {
      this.transportWdWcRequisitionForm.controls['warehouseId'].setValue(null)
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
        this.listFabricPrices[index] = [this._sharedComponentService.getAvgPrice2(this.dyersDetails[0]) , this._sharedComponentService.getAvgInputesPrice2(this.dyersDetails[0]), parseFloat(this.dyersDetails[0].latest_price)]
        this.listFabricPricesDollar[index] = [this._sharedComponentService.getAvgInputesPriceDynamicDetails(this.dyersDetails[0], 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPrice2DynamicDetails(this.dyersDetails[0], 'quantity', 'price_dollar'), parseFloat(this.dyersDetails[0].latest_price_dollar)]
      })
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

  async onTransportWdWcRequisition() {
    this.transportWdWcRequisitionForm.markAllAsTouched();
    if (this.transportWdWcRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityTwoItems(
        this.transportWdWcRequisitionForm.controls.items.value, this.transportWdWcRequisitionForm.controls.items.value,
        'consigmentDyeingId', 'consigmentDyeingId',
        'fabricId', 'fabricId', 
        'quantity', 'fabricName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.transportWdWcRequisitionForm, 'items',
          ['fabricName', 'fabricCode', 'validQuantity'])
        this._constantsService.spinner.show()
        this._transportWdWcRequisitionWdService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[57]}/details`, { id: response.id });
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
