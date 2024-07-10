import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { ReturnRequisitionWcService } from "src/app/services/main/wc/return-requisition-wc.service";
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { WcService } from "src/app/services/main/wc/wc.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-return-requisition-wc',
  templateUrl: './add-return-requisition-wc.component.html',
  styleUrls: ['./add-return-requisition-wc.component.css']
})
export class AddReturnRequisitionWcComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  returnRequisitionWCForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    warehouseId: new FormControl("", [Validators.required]),
    supplierId: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  warehouses: any = []
  consigments: any = []
  fabrics: any = []
  suppliers: any = []
  currentQuantity: any = []
  fabricsDetails: any
  listFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر تصنيع", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش"

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

  // --------------- Supplier --------------
  // maps the appropriate column to fields property
  public fieldsSupplier: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textSupplier: string = "المورد"

  public onFilteringSupplier(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.suppliers, query);
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
    private _supplierService: BussinessmanService,
    private _returnRequisitionWcService: ReturnRequisitionWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWcService: ReportWcService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._supplierService.selectSupplierBuyingFabric().subscribe((response: any) => {
      this.suppliers = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fabricId: new FormControl("", [Validators.required]),
      fabricName: new FormControl(""),
      fabricCode: new FormControl(""),
      consigmentManufacturingId: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      numberFabricPieces: new FormControl('0', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)])
    });
  }

  addItem() {
    const control = <FormArray>this.returnRequisitionWCForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.returnRequisitionWCForm.get('items');
    control.removeAt(index);

    // Price
    this.listFabricPrices[index] = delete this.listFabricPrices[index];
    this.listFabricPrices.splice(index, 1);
    this.listFabricPricesDollar[index] = delete this.listFabricPricesDollar[index];
    this.listFabricPricesDollar.splice(index, 1);
  }

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics.indexOf(event.itemData)

    if (this.fabrics[indexData] !== event.itemData) {
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      this.currentQuantity[index] = 0
      this.consigments[index] = []
    }
    else {
      row.controls['fabricCode'].setValue(event.itemData.code)
      row.controls['fabricName'].setValue(event.itemData.name)

      this._wcService.selectConsigmentManufacturingQuantityByWarehouseByFabricForReturn(
        this.returnRequisitionWCForm.controls['supplierId'].value!,
        this.returnRequisitionWCForm.controls['warehouseId'].value!,
        event.itemData.id).subscribe((response: any) => {
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

  //  Supplier
  selectSupplier(event: { itemData: any; }) {
    if (!this.suppliers.includes(event.itemData)) {
      this.returnRequisitionWCForm.controls['supplierId'].setValue(null)
      this.returnRequisitionWCForm.controls.items.reset()
    }
    else {
      this._warehouseService.selectWhereInWcBySupplier(event.itemData.id).subscribe((response: any) => {
        this.warehouses = response

        this.selectBySupplierByWarehouseWc(event.itemData.id)
      })

    }
  }

  //  Warehouse
  selectWarehouse(event: { itemData: any; }) {
    if (!this.warehouses.includes(event.itemData)) {
      this.returnRequisitionWCForm.controls['warehouseId'].setValue("")
      this.returnRequisitionWCForm.controls.items.reset()
      this.currentQuantity = []
      this.consigments = []
      this.fabrics = []
      this.listFabricPrices = []
      this.listFabricPricesDollar = []
    } else {
      this.selectBySupplierByWarehouseWc(this.returnRequisitionWCForm.controls['supplierId'].value!, event.itemData.id)
    }
  }

  selectBySupplierByWarehouseWc(supplierId, warehouseId = this._constantsService.DEFAULT_WC_WAREHOUSE_ID) {
    this.returnRequisitionWCForm.controls['warehouseId'].setValue(warehouseId)
    this._fabricService.selectBySupplierByWarehouseWc(supplierId, warehouseId).subscribe((response: any) => {
      this.fabrics = response

      if(this.fabrics[0] == null) {
        this.returnRequisitionWCForm.controls['warehouseId'].setValue("")
      }
    })
  }

  //  consigmentManufacturing
  selectConsigment(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.consigments[index].includes(event.itemData)) {
      row.controls['price'].setValue("")
      row.controls['consigmentManufacturingId'].setValue("")
      row.controls['quantity'].setValue(null)
      row.controls['validQuantity'].setValue(null)
      this.currentQuantity[index] = 0
      this.listFabricPrices[index] = []
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
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['priceDollar'].value))
    }
  }

  async onReturnRequisitionWC() {
    this.returnRequisitionWCForm.markAllAsTouched();
    if (this.returnRequisitionWCForm.valid) {
      if (this._quantityOccurrencesValidationService.validateQuantity(this.returnRequisitionWCForm.controls.items.value, 'fabricId', this.returnRequisitionWCForm.controls.items.value, 'fabricId', 'quantity', 'fabricName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.returnRequisitionWCForm, 'items',
          ['fabricName', 'fabricCode', 'validQuantity'])
        this._constantsService.spinner.show()
        this._returnRequisitionWcService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[40]}/details`, { id: response.id });
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
