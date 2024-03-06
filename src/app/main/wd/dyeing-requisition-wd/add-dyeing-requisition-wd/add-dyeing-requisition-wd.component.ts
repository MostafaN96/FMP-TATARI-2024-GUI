import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { DyeingServicesService } from "src/app/services/main/dyeing-services.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { DyeingRequisitionWdService } from "src/app/services/main/wd/dyeing-requisition-wd.service";
import { FormDyeingRequisitionDetailsWdService } from 'src/app/services/main/wd/form-dyeing-requisition-details-wd.service';
import { WarehouseService } from "src/app/services/main/warehouse.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

// Child Components
import { CurrentStockFormDyeingWdComponent } from "../../reports/current-stock-form-dyeing-wd/current-stock-form-dyeing-wd.component";

@Component({
  selector: 'app-add-dyeing-requisition-wd',
  templateUrl: './add-dyeing-requisition-wd.component.html',
  styleUrls: ['./add-dyeing-requisition-wd.component.css']
})
export class AddDyeingRequisitionWdComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport') currentStockReport!: CurrentStockFormDyeingWdComponent;

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    dyeingId: new FormControl("", [Validators.required]),
    warehouseId: new FormControl(this._constantsService.DEFAULT_WE_WAREHOUSE_ID, [Validators.required]),
    releaseProcess: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    isCalcDyeingNet: new FormControl("", [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  dyerName = ""
  warehouses: any = []
  dyers: any = []
  dyeingServices: any = []
  isCalcDyeingNet = '0'
  fabricMap = new Map()
  isShowAdd = true

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

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

  constructor(
    private _warehouseService: WarehouseService,
    private _dyeingServicesService: DyeingServicesService,
    private _bussinessmanService: BussinessmanService,
    private _dyeingRequisitionWdService: DyeingRequisitionWdService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _exportDataService: ExportDataService,
    private _formDyeingRequisitionDetailsWdService: FormDyeingRequisitionDetailsWdService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectDyerHasForm().subscribe((response: any) => {
      this.dyers = response
    })

    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })
  }

  getSelectedIndex(objectData: any) {
    if (this.selectArrayValues.includes(objectData)) {
      this.fabricMap.set(objectData, objectData?.current_quantity)
    }
    this.selectArrayValues.push(objectData);
    this.addItem(objectData)
  }

  // Initialize Form Builder
  initItem(data: any, index: number) {

    return new FormGroup({
      index: new FormControl(index),
      wdFormDyeingOrderRequisitionDetailsId: new FormControl(data.wd_form_dyeing_order_requisition_details_id ?? ""),
      wdFormRequisitionDetailsId: new FormControl(data.id, [Validators.required]),
      fabricName: new FormControl(data.fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      fabricId: new FormControl(data.fabric_id, [Validators.required]),
      fabricCode: new FormControl(data.fabric_code),
      dyeingCode: new FormControl(data.fabric_dyeing_code),
      consigmentDyeingId: new FormControl(data.consigment_dyeing_id, [Validators.required]),
      consigmentDyeingNumber: new FormControl(data.consigment_dyeing_number, [Validators.required]),
      dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
      dyedFabricCode: new FormControl(data.dyed_fabric_code),
      colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorCategoryId: new FormControl(data.color_category_id, [Validators.required]),
      colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorId: new FormControl(data.color_id, [Validators.required]),
      colorCode: new FormControl(data.color_code),
      dyeingFee: new FormControl(String(data.color_price), [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      dyeingQuantity: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      costPrice: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      price: new FormControl(data.price, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity),
      numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      fabricWidth: new FormControl(data.fabric_width, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      fabricQuantityM2: new FormControl(data.fabric_quantity_m2, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      workOrderNumber: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      storagePlace: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      note1: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
      note2: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(data: any) {
    let index = this.currentStockReport.formDyeingFabricsByDyer.indexOf(data)
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.push(this.initItem(data, index));
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number, objectData: any) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.removeAt(index);

    this._quantityOccurrencesValidationService.removeIndexFromMapAndArray(this.fabricMap, index, objectData, this.selectArrayValues)
  }


  validate(row: FormGroup) {
    if (parseFloat(row.controls['quantity'].value) > parseFloat(row.controls['validQuantity'].value)) {
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
      this.addRequisitionForm.controls['dyeingId'].setValue(event.itemData.id)
      this.addRequisitionForm.controls['isCalcDyeingNet'].setValue(event.itemData.is_calc_dyeing_net)
      this.isCalcDyeingNet = event.itemData.is_calc_dyeing_net
      this._dyeingServicesService.selectByDeying(event.itemData.id).subscribe((response: any) => {
        this.dyeingServices = response
      })

      this._formDyeingRequisitionDetailsWdService.selectByDyeing(event.itemData.id).subscribe((response: any) => {
        this.currentStockReport.formDyeingFabricsByDyer = response
        this.currentStockReport.listen();
      })
    }
    else {
      this.addRequisitionForm.controls['dyeingId'].setValue(null)

      const formGroup = <FormGroup>this.addRequisitionForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));
      // this.addRequisitionForm.controls.items = new FormArray([])
      this.dyeingServices = []
      this.currentStockReport.formDyeingFabricsByDyer = []
      this.currentStockReport.listen();
      this.selectArrayValues = []
    }
  }

  getServicesCost(element, servicePrice) {
    if (servicePrice.is_fabric_piece) {
      return +element.controls['numberFabricPieces'].value * servicePrice.price
    }
    else {
      return +element.controls['quantity'].value * servicePrice.price
    }
  }

  getSumTotalCost(dataSourceSearchTabel, dyeingServices) {
    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }
    const control = <FormArray>this.addRequisitionForm.get('items');
    let sum = 0
    for (let index = 0; index < dataSourceSearchTabel.length; index++) {
      const element = dataSourceSearchTabel[index];
      sum = sum + this._sharedComponentService.getTotalCost(element.price, element.quantity, dyeingServices[index]?.dyeingServices,
        element.dyeingFee, element.numberFabricPieces)

      control['controls'][index]['controls']['costPrice'].setValue((this._sharedComponentService.getTotalCost(element.price, element.quantity, dyeingServices[index]?.dyeingServices,
        element.dyeingFee, element.numberFabricPieces) / element.dyeingQuantity).toFixed(3))
    }
    return sum
  }

  getWast(quantity: number, dyeingQuantity: number) {
    let result = quantity - dyeingQuantity
    return (result / quantity) * 100
  }

  async onAddRequisition() {
    this.isShowAdd = false

    this.addRequisitionForm.markAllAsTouched();
    if (this.addRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateQuantityDynamic(
        this.fabricMap, this.addRequisitionForm.controls['items'].value,
        'dyed_fabric_id', 'dyedFabricId',
        'consigment_dyeing_id', 'consigmentDyeingId',
        'id', 'wdFormRequisitionDetailsId',
        'quantity', 'fabric_name')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addRequisitionForm, 'items',
          ['index', 'fabricId', 'fabricCode', 'fabricName', 'dyeingCode', 'consigmentDyeingId',
            'consigmentDyeingNumber', 'dyedFabricName', 'dyedFabricCode',
            'colorCategoryId', 'colorCategoryName', 'colorId', 'colorName', 'colorCode', 'validQuantity'])

        this._constantsService.spinner.show()
        this._dyeingRequisitionWdService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[97]}/details`, { id: response.id, dyerId: this.addRequisitionForm.controls['dyeingId'].value });
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

