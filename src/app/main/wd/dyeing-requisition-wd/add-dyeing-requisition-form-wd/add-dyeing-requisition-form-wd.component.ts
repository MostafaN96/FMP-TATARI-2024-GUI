import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { DyeingServicesService } from "src/app/services/main/dyeing-services.service";
import { DyeingRequisitionDetailsWdService } from "src/app/services/main/wd/dyeing-requisition-details-wd.service";
import { FormDyeingRequisitionDetailsWdService } from 'src/app/services/main/wd/form-dyeing-requisition-details-wd.service';
import { GradeItemService } from "src/app/services/main/grade-item.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ActivatedRoute } from '@angular/router';
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Child Components
import { CurrentStockFormDyeingWdComponent } from "../../reports/current-stock-form-dyeing-wd/current-stock-form-dyeing-wd.component";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-dyeing-requisition-form-wd',
  templateUrl: './add-dyeing-requisition-form-wd.component.html',
  styleUrls: ['./add-dyeing-requisition-form-wd.component.css']
})
export class AddDyeingRequisitionFormWdComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport') currentStockReport!: CurrentStockFormDyeingWdComponent;

  @Input() selectedData: any
  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];
  isCalcDyeingNet = '0'
  fabricMap = new Map()
  isShowAdd = true
  gradeItems: any = []

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  dyeingServices: any

///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Grade Item --------------
  // maps the appropriate column to fields property
  public fieldsGradeItem: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textGradeItem: string = "نوع الدرجة"

  public onFilteringGradeItem(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.gradeItems, query);
  }

  constructor(
    private _dyeingServicesService: DyeingServicesService,
    private _dyeingRequisitionDetailsWdService: DyeingRequisitionDetailsWdService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _exportDataService: ExportDataService,
    private _formDyeingRequisitionDetailsWdService: FormDyeingRequisitionDetailsWdService,
    private _gradeItemService: GradeItemService,
    private route: ActivatedRoute,
    private _sessionManagerService: SessionManagerService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnChanges() {
    this.getData(this.selectedData?.dyeing_id)
    
    this.isCalcDyeingNet = this.selectedData?.is_calc_dyeing_net
  }

  getData(dyeingId) {
    this.route.queryParams.subscribe(params => {
      this.addRequisitionForm.controls.id.setValue(params['id'])
    })
    this._dyeingServicesService.selectByDeying(dyeingId).subscribe((response: any) => {
      this.dyeingServices = response
    })

    this._formDyeingRequisitionDetailsWdService.selectByDyeing(dyeingId).subscribe((response: any) => {
      this.currentStockReport.formDyeingFabricsByDyer = response
      
      this.currentStockReport.listen();
    })

    this._gradeItemService.selectAll().subscribe((response: any) => {
      this.gradeItems = response
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
      ordersRequisitionsId: new FormControl(data.orders_requisitions_id, [Validators.required]),
      fabricOrderId: new FormControl(data.wc_fabric_order_requisition_id, [Validators.required]),
      fabricOrderName: new FormControl(data.wc_fabric_order_requisition_name ?? ""),
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
      gradeItemId: new FormControl("", [Validators.required]),
      dyeingFee: new FormControl(data.color_price, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      addedCost: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      dyeingQuantity: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      costPrice: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      price: new FormControl((data.price != 0) ? data.price : data.price_dollar, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(data.current_quantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity),
      numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      fabricWidth: new FormControl(data.fabric_width, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      fabricQuantityM2: new FormControl(data.fabric_quantity_m2, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      workOrderNumber: new FormControl(data.work_order_number_details, [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
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

  validateDyeingQuantity(row: FormGroup) {
    const rowQuantity = parseFloat(row.controls['quantity'].value)
    const dyeingQuantity = parseFloat(row.controls['dyeingQuantity'].value)
    if (rowQuantity > 0) {
      if (dyeingQuantity > rowQuantity) {
        const ratio = (rowQuantity / dyeingQuantity) * 100
        const calcRatio = 100 - ratio
        if (calcRatio <= 10) {

        } else { 
          row.controls['dyeingQuantity'].setErrors({ 'incorrect': null });
          row.controls['dyeingQuantity'].updateValueAndValidity()
        }
      }
    } else {
      row.controls['dyeingQuantity'].setErrors({ 'incorrect': null });
      row.controls['dyeingQuantity'].updateValueAndValidity()
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
    const control = <FormArray>this.addRequisitionForm.get('items');

    let sum = 0
    for (let index = 0; index < dataSourceSearchTabel.length; index++) {
      const element = dataSourceSearchTabel[index];
      sum = sum + this._sharedComponentService.getTotalCost(
        element.price, 
        element.quantity, 
        dyeingServices[index].dyeingServices,
        (parseFloat(element.dyeingFee)), 
        element.numberFabricPieces,
      element.addedCost
      )

        control['controls'][index]['controls']['costPrice'].setValue((this._sharedComponentService.getTotalCost(
          element.price, 
          element.quantity, 
          dyeingServices[index]?.dyeingServices,
          (parseFloat(element.dyeingFee)), 
          element.numberFabricPieces,
          element.addedCost
        ) / element.dyeingQuantity).toFixed(3))
    }
    return sum
  }

  getWast(quantity: number, dyeingQuantity: number) {
    let result = quantity - dyeingQuantity
    return (result / quantity) * 100
  }

  //  Grade item
  selectGradeItem(event: { itemData: any; }, row: FormGroup) {
    if (!this.gradeItems.includes(event.itemData)) {
      row.controls['gradeItemId'].setValue("")
    }
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
      'consigmentDyeingNumber','dyedFabricName', 'dyedFabricCode', 
      'colorCategoryId', 'colorCategoryName', 'colorId', 'colorName', 'colorCode', 'validQuantity'])

      this._constantsService.spinner.show()
      this._dyeingRequisitionDetailsWdService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({id: response.id, dyeingid: this.selectedData?.dyeing_id });
        }
        else{
          if (response.msg == "quantity is wrong") {
            this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else if (response.msg == "duplicated data") {
             this._constantsService.duplicateDataErrorMessage()
           }
           else{
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

