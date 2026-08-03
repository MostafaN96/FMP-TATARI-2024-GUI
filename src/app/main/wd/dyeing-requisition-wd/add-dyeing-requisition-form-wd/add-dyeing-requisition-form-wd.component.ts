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
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";
import { DyedFabricOrderRequisitionDetailsWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-details-we.service";

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
  dyedFabricOrderRequisitions: any[] = []
  wcFabricOrderRequisitionIds: string[] = []
  wasteRatioMap = new Map<string, number>()

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

  // --------------- Dyed Fabric Order Requisition --------------
  public fieldsDyedFabricOrderRequisition: Object = { value: "id", text: "name" };
  public textDyedFabricOrderRequisition: string = "طلبية الجاهز"

  public onFilteringGradeItem(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.gradeItems, query);
  }

  public onFilteringDyedFabricOrderRequisition(e: any, index: number) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('number', 'contains', e.text);
    var query = new Query();
    query = (e.text != "") ? query.where(predicate) : query;
    e.updateData(this.dyedFabricOrderRequisitions[index], query);
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
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    private _dyedFabricOrderRequisitionDetailsWeService: DyedFabricOrderRequisitionDetailsWeService,
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

    if (objectData.parent_wc_fabric_order_requisition_id && !this.wcFabricOrderRequisitionIds.includes(objectData.parent_wc_fabric_order_requisition_id)) {
      this.wcFabricOrderRequisitionIds.push(objectData.parent_wc_fabric_order_requisition_id);
    }

    this.loadDyedFabricOrderRequisitions();
  }

  loadDyedFabricOrderRequisitions() {
    const control = <FormArray>this.addRequisitionForm.get('items');
    const rows = control.controls as FormGroup[];

    if (this.wcFabricOrderRequisitionIds.length === 0 || rows.length === 0) {
      return;
    }

    rows.forEach((row, index) => {
      const rowParentWcFabricOrderId = this.selectArrayValues[index]?.parent_wc_fabric_order_requisition_id;
      const rowWcFabricOrderIds = rowParentWcFabricOrderId ? [rowParentWcFabricOrderId] : this.wcFabricOrderRequisitionIds;
      const dyedFabricId = row.controls['dyedFabricId'].value || this.selectArrayValues[index]?.dyed_fabric_id;

      this._dyedFabricOrderRequisitionWeService
        .selectDyedFabricsByWcFabricOrderIds(rowWcFabricOrderIds, dyedFabricId)
        .subscribe((response: any) => {
          this.dyedFabricOrderRequisitions[index] = response;
        });
    });
  }

  // Initialize Form Builder
  initItem(data: any, index: number) {

    return new FormGroup({
      index: new FormControl(index),
      ordersRequisitionsId: new FormControl(null, [Validators.required]),
      fabricOrderId: new FormControl(data.wc_fabric_order_requisition_id, [Validators.required]),
      fabricOrderName: new FormControl(data.wc_fabric_order_requisition_name ?? ""),
      dyedFabricOrderRequisitionId: new FormControl(null, [Validators.required]),
      dyedFabricOrderRequisitionName: new FormControl(""),
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
      wasteRatio: new FormControl(0),
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

    if (objectData.parent_wc_fabric_order_requisition_id) {
      const stillExists = this.selectArrayValues.some(item => item.parent_wc_fabric_order_requisition_id === objectData.parent_wc_fabric_order_requisition_id);
      if (!stillExists) {
        const idIndex = this.wcFabricOrderRequisitionIds.indexOf(objectData.parent_wc_fabric_order_requisition_id);
        if (idIndex > -1) {
          this.wcFabricOrderRequisitionIds.splice(idIndex, 1);
        }
      }
    }

    this.loadDyedFabricOrderRequisitions();
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
    if (!row.controls['dyedFabricOrderRequisitionId'].value) {
      row.controls['dyeingQuantity'].setValue('');
      row.controls['dyeingQuantity'].setErrors(null);
      row.controls['dyeingQuantity'].updateValueAndValidity();
      return;
    }

    // Auto-calculate raw quantity for related rows based on entered dyeingQuantity FIRST
    this.calculateRawQuantityForGroup(row);

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

  // Calculate raw quantity for rows with same workOrderNumber, fabricOrderId, and wdFormRequisitionDetailsId
  // If wdFormDyeingOrderRequisitionDetailsId exists for all rows in the base group,
  // apply it as an extra grouping key to avoid mixing different detail rows.
  // User enters dyeingQuantity for each row, system calculates quantity based on calculated waste_ratio
  calculateRawQuantityForGroup(currentRow: FormGroup) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    const rows = control.controls as FormGroup[];

    const currentWorkOrder = currentRow.controls['workOrderNumber'].value;
    const currentFabricOrderId = currentRow.controls['fabricOrderId'].value;
    const currentWdFormRequisitionDetailsId = currentRow.controls['wdFormRequisitionDetailsId'].value;
    const currentWdFormDyeingOrderRequisitionDetailsId = currentRow.controls['wdFormDyeingOrderRequisitionDetailsId'].value;
    const currentDyeingQuantity = parseFloat(currentRow.controls['dyeingQuantity'].value) || 0;

    if (currentDyeingQuantity <= 0) {
      return;
    }

    if (!currentWorkOrder || !currentFabricOrderId || !currentWdFormRequisitionDetailsId) {
      currentRow.controls['quantity'].setValue(currentDyeingQuantity.toFixed(3));
      return;
    }

    // Base group: same workOrderNumber, fabricOrderId, and wdFormRequisitionDetailsId
    const baseGroupRows = rows.filter(row =>
      row.controls['workOrderNumber'].value === currentWorkOrder &&
      row.controls['fabricOrderId'].value === currentFabricOrderId &&
      row.controls['wdFormRequisitionDetailsId'].value === currentWdFormRequisitionDetailsId
    );

    if (baseGroupRows.length === 0) {
      return;
    }

    // Optional extra grouping by wdFormDyeingOrderRequisitionDetailsId only when this key exists for all base rows
    const hasDetailIdForAllBaseRows = baseGroupRows.every(row => {
      const value = row.controls['wdFormDyeingOrderRequisitionDetailsId'].value;
      return value !== null && value !== undefined && String(value).trim() !== '';
    });

    let groupRows = baseGroupRows;
    if (hasDetailIdForAllBaseRows && currentWdFormDyeingOrderRequisitionDetailsId !== null && currentWdFormDyeingOrderRequisitionDetailsId !== undefined && String(currentWdFormDyeingOrderRequisitionDetailsId).trim() !== '') {
      groupRows = baseGroupRows.filter(row =>
        row.controls['wdFormDyeingOrderRequisitionDetailsId'].value === currentWdFormDyeingOrderRequisitionDetailsId
      );
    }

    if (groupRows.length === 0) {
      return;
    }

    // Use the first validQuantity (الكمية المشكلة) in the group as requested
    const totalValidQuantity = parseFloat(groupRows[0].controls['validQuantity'].value) || 0;

    // Calculate total dyeingQuantity (كمية المصبوغ) from all rows in the group
    const totalDyeingQuantity = groupRows.reduce((sum, row) =>
      sum + (parseFloat(row.controls['dyeingQuantity'].value) || 0), 0
    );

    if (totalValidQuantity <= 0 || totalDyeingQuantity <= 0) {
      return;
    }

    const calculatedWasteRatio = ((totalValidQuantity - totalDyeingQuantity) / totalValidQuantity) * 100;

    // quantity = dyeingQuantity / (1 - wasteRatio / 100)
    groupRows.forEach(row => {
      const rowDyeingQuantity = parseFloat(row.controls['dyeingQuantity'].value) || 0;
      if (rowDyeingQuantity > 0) {
        const calculatedRawQuantity = rowDyeingQuantity / (1 - calculatedWasteRatio / 100);
        row.controls['quantity'].setValue(calculatedRawQuantity.toFixed(3));
      }
    });
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

  selectDyedFabricOrderRequisition(event: any, row: FormGroup) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    const formRows = control.controls as FormGroup[];
    const rowIndex = formRows.indexOf(row);

    const options = ((rowIndex >= 0 ? this.dyedFabricOrderRequisitions[rowIndex] : null) || [])
      .filter((item: any) => item && typeof item === 'object' && item.id !== undefined && item.id !== null);

    const keys = [
      event?.itemData?.id,
      event?.itemData?.number,
      event?.itemData?.name,
      event?.value,
      row.controls['dyedFabricOrderRequisitionName'].value
    ]
      .filter((v: any) => v !== undefined && v !== null && String(v).trim() !== '')
      .map((v: any) => String(v).trim());

    const matchedOption = options.find((item: any) => {
      const itemId = String(item.id).trim();
      const itemNumber = String(item.number ?? '').trim();
      const itemName = String(item.name ?? '').trim();
      return keys.some((key: string) => key === itemId || key === itemNumber || key === itemName);
    });

    const resolvedItem = matchedOption ? {
      ...matchedOption,
      orders_requisitions_id:
        matchedOption.orders_requisitions_id ??
        matchedOption.ordersRequisitionsId ??
        row.controls['ordersRequisitionsId'].value
    } : null;

    if (resolvedItem) {
      row.controls['dyedFabricOrderRequisitionId'].setValue(resolvedItem.id);
      row.controls['ordersRequisitionsId'].setValue(resolvedItem.orders_requisitions_id);
      row.controls['dyedFabricOrderRequisitionName'].setValue(resolvedItem.name || resolvedItem.number || '');

      const dyedFabricId = row.controls['dyedFabricId'].value;
      if (dyedFabricId) {
        this._dyedFabricOrderRequisitionDetailsWeService.getWasteRatio(resolvedItem.id, dyedFabricId).subscribe((response: any) => {
          const wasteRatio = response.wasteRatio || 0;
          row.controls['wasteRatio'].setValue(wasteRatio);
          this.wasteRatioMap.set(resolvedItem.id + '_' + dyedFabricId, wasteRatio);
          this.applyWasteRatioToGroup(row, wasteRatio);
        });
      }
    } else {
      row.controls['dyedFabricOrderRequisitionId'].setValue(null);
      row.controls['dyedFabricOrderRequisitionName'].setValue("");
      row.controls['wasteRatio'].setValue(0);
      row.controls['dyeingQuantity'].setValue('');
    }
  }

  applyWasteRatioToGroup(currentRow: FormGroup, wasteRatio: number) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    const rows = control.controls as FormGroup[];

    const currentWorkOrder = currentRow.controls['workOrderNumber'].value;
    const currentDyedFabricId = currentRow.controls['dyedFabricId'].value;
    const currentFabricOrderId = currentRow.controls['fabricOrderId'].value;

    if (!currentWorkOrder || !currentDyedFabricId || !currentFabricOrderId) {
      return;
    }

    const groupRows = rows.filter(row =>
      row.controls['workOrderNumber'].value === currentWorkOrder &&
      row.controls['dyedFabricId'].value === currentDyedFabricId &&
      row.controls['fabricOrderId'].value === currentFabricOrderId
    );

    groupRows.forEach(row => {
      row.controls['wasteRatio'].setValue(wasteRatio);
    });
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
      'colorCategoryName', 'colorName', 'validQuantity', 'dyedFabricOrderRequisitionName', 'wasteRatio'])

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

