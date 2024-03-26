import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { ReconcilitionRequisitionWeService } from "src/app/services/main/we/reconcilition-requisition-we.service";
import { ReportWeService } from "src/app/services/main/we/report-we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { WeService } from "src/app/services/main/we/we.service";

// Child Components
import { CurrentStockReportWeComponent } from "../../reports/current-stock-report-we/current-stock-report-we.component";

@Component({
  selector: 'app-add-reconcilition-requisition-we',
  templateUrl: './add-reconcilition-requisition-we.component.html',
  styleUrls: ['./add-reconcilition-requisition-we.component.css']
})
export class AddReconcilitionRequisitionWeComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport') currentStockReport!: CurrentStockReportWeComponent;

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  reconcilitionRequisitionWEForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any
  dyersAndRequisitionsFabrics: any
  dyersAndRequisitions: any
  colorCategories: any
  colors: any = []
  disabledColorCategory: any = []
  currentQuantity: any = []
  fabricsDetails: any
  listFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر صباغة", "آخر سعر"]

  constructor(
    private _reconcilitionRequisitionWeService: ReconcilitionRequisitionWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWeService: ReportWeService,
    private _weService: WeService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._weService.selectStoreWe().subscribe((response: any) => {
      this.currentStockReport.dyersAndRequisitionsFabrics = response
      this.currentStockReport.listen();
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

  getPrices(data: any, formIndex) {
    // Get Prices
    this._reportWeService.selectPriceWe(data.dyed_fabric_id, data.color_id, data.color_code).subscribe((response: any) => {
      this.fabricsDetails = response
      this.listFabricPrices[formIndex] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails), this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails), this.fabricsDetails[0].latest_dyeing_price, this.fabricsDetails[0].latest_price]
      
      this.listFabricPricesDollar[formIndex] = [
        this._sharedComponentService.getAvgPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), 
        this._sharedComponentService.getAvgInputesPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), 
        this.fabricsDetails[0].latest_dyeing_price_dollar, 
        this.fabricsDetails[0].latest_price_dollar
      ]
    })
  }

  // Initialize Form Builder
  initItem(data: any, index, formIndex) {
    this.getPrices(data, formIndex)
    return new FormGroup({
      index: new FormControl(index),
      supplierName: new FormControl(data.supplier_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      weId: new FormControl(data.we_id, [Validators.required]),
      warehouseId: new FormControl(data.warehouse_id, [Validators.required]),
      warehouseName: new FormControl(data.warehouse_name),
      dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
      dyedFabricCode: new FormControl(data.dyed_fabric_code),
      colorCategoryId: new FormControl(data.color_category_id, [Validators.required]),
      colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorId: new FormControl(data.color_id, [Validators.required]),
      colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorCode: new FormControl(data.color_code),
      consigmentDyeingNumber: new FormControl(data.consigment_dyeing_number),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
      inputOutput: new FormControl('1', [Validators.required]),
      workOrderNumber: new FormControl(data.work_order_number, [Validators.required]),
      numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    });
  }

  addItem(data: any) {
    let index = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(data)
    const control = <FormArray>this.reconcilitionRequisitionWEForm.get('items');
    control.push(this.initItem(data, index, control.controls.length));
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.reconcilitionRequisitionWEForm.get('items');
    for (let i = 0; i < control.value.length; i++) {
      const element = control.value[i];
      if (element.index == index) {
        control.removeAt(i)
        this.listFabricPrices.splice(i, 1);
        this.listFabricPricesDollar.splice(i, 1);
      }
    }
  }


  validate(row: FormGroup) {
    if ((parseFloat(row.controls['quantity'].value) > parseFloat(row.controls['validQuantity'].value)) && !+row.controls['inputOutput'].value) {
      row.controls['quantity'].setErrors({ 'incorrect': true });
    }
    else {
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
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

  async onReconcilitionRequisitionWe() {
    this.reconcilitionRequisitionWEForm.markAllAsTouched();
    if (this.reconcilitionRequisitionWEForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.reconcilitionRequisitionWEForm, 'items',
        ['index', 'supplierName', 'warehouseName', 'dyedFabricName', 'dyedFabricCode',
          'colorCategoryName', 'colorName', 'validQuantity'])

      this._constantsService.spinner.show()
      this._reconcilitionRequisitionWeService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[81]}/details`, { id: response.id });
          this._sharedComponentService.reloadPage();
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
        }
      });
    }
  }
}
