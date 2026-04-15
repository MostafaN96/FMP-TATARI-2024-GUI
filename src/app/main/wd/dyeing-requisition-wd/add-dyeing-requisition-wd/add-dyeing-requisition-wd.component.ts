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
import { DyeingRequisitionDetailsWdService } from 'src/app/services/main/wd/dyeing-requisition-details-wd.service';
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { GradeItemService } from "src/app/services/main/grade-item.service";
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";
import { DyedFabricOrderRequisitionDetailsWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-details-we.service";

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
    releaseProcess: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    isCalcDyeingNet: new FormControl("", [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  dyerName = ""
  warehouses: any = []
  gradeItems: any = []
  dyers: any = []
  dyeingServices: any = []
  isCalcDyeingNet = '0'
  fabricMap = new Map()
  isShowAdd = true
  maxWorkOrderNumberResult:any = ""
  dyedFabricOrderRequisitions: any[] = []
  wcFabricOrderRequisitionIds: string[] = []
  wasteRatioMap = new Map<string, number>() // Map to store waste_ratio by dyedFabricOrderRequisitionId

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

  // --------------- Dyed Fabric Order Requisition --------------
  // maps the appropriate column to fields property
  public fieldsDyedFabricOrderRequisition: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyedFabricOrderRequisition: string = "طلبية الجاهز"

  public onFilteringDyedFabricOrderRequisition(e: any, index: number) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyedFabricOrderRequisitions[index], query);
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
    private _dyeingRequisitionDetailsWdService: DyeingRequisitionDetailsWdService,
    private _gradeItemService: GradeItemService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    private _dyedFabricOrderRequisitionDetailsWeService: DyedFabricOrderRequisitionDetailsWeService,

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

    this._dyeingRequisitionDetailsWdService.selectMaxWorkOrderNumber().subscribe((response: any) => {      
      if (Array.isArray(response) && response.length > 0) {
        if(response[0].work_order_number != null) {
          this.maxWorkOrderNumberResult = String(parseFloat(response[0].work_order_number) + 1)
        } else {
          this.maxWorkOrderNumberResult = "1"
        }
      } else {        
        this.maxWorkOrderNumberResult = "1"
      }        
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
    
    // Collect parent_wc_fabric_order_requisition_id (child order IDs)
    if (objectData.parent_wc_fabric_order_requisition_id && !this.wcFabricOrderRequisitionIds.includes(objectData.parent_wc_fabric_order_requisition_id)) {
      this.wcFabricOrderRequisitionIds.push(objectData.parent_wc_fabric_order_requisition_id);
    }
    
    // Load dyed fabric order requisitions for all collected parent_wc_fabric_order_requisition_id
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
      fabricWidth: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      fabricQuantityM2: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      workOrderNumber: new FormControl(
        // this.maxWorkOrderNumberResult
        data.work_order_number_details
        , [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
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
    
    // Remove parent_wc_fabric_order_requisition_id from array if no other rows use it
    if (objectData.parent_wc_fabric_order_requisition_id) {
      const stillExists = this.selectArrayValues.some(item => item.parent_wc_fabric_order_requisition_id === objectData.parent_wc_fabric_order_requisition_id);
      if (!stillExists) {
        const idIndex = this.wcFabricOrderRequisitionIds.indexOf(objectData.parent_wc_fabric_order_requisition_id);
        if (idIndex > -1) {
          this.wcFabricOrderRequisitionIds.splice(idIndex, 1);
        }
      }
    }
    
    // Reload dyed fabric orders with updated IDs
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
    // Safety: do not allow entering dyeing quantity before selecting ready order
    if (!row.controls['dyedFabricOrderRequisitionId'].value) {
      row.controls['dyeingQuantity'].setValue('');
      row.controls['dyeingQuantity'].setErrors(null);
      row.controls['dyeingQuantity'].updateValueAndValidity();
      return;
    }

    // Auto-calculate raw quantity for related rows based on entered dyeingQuantity FIRST
    this.calculateRawQuantityForGroup(row);
    
    // Then validate after calculation
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
      this.wcFabricOrderRequisitionIds = []
      this.dyedFabricOrderRequisitions = []
    }
  }

  selectWarehouse(event: { itemData: any; }) {
    if (!this.warehouses.includes(event.itemData)) {
      this.addRequisitionForm.controls['warehouseId'].setValue("")
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
      
      sum = sum + this._sharedComponentService.getTotalCost(
        element.price, element.quantity, 
        dyeingServices[index]?.dyeingServices,
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

  //  Dyed Fabric Order Requisition
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
      
      // Get waste_ratio from backend based on requisitionId and dyedFabricId
      const dyedFabricId = row.controls['dyedFabricId'].value;
      if (dyedFabricId) {
        this._dyedFabricOrderRequisitionDetailsWeService.getWasteRatio(resolvedItem.id, dyedFabricId).subscribe((response: any) => {
          const wasteRatio = response.wasteRatio || 0;
          row.controls['wasteRatio'].setValue(wasteRatio);
          this.wasteRatioMap.set(resolvedItem.id + '_' + dyedFabricId, wasteRatio);
          
          // Apply waste_ratio to all rows with same workOrderNumber, dyedFabricId, and fabricOrderId
          this.applyWasteRatioToGroup(row, wasteRatio);
        });
      }
    } else {
      row.controls['dyedFabricOrderRequisitionId'].setValue(null);
      row.controls['dyedFabricOrderRequisitionName'].setValue("");
      row.controls['wasteRatio'].setValue(0);
    }
  }

  // Apply waste_ratio to all rows in the same group
  applyWasteRatioToGroup(currentRow: FormGroup, wasteRatio: number) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    const rows = control.controls as FormGroup[];

    const currentWorkOrder = currentRow.controls['workOrderNumber'].value;
    const currentDyedFabricId = currentRow.controls['dyedFabricId'].value;
    const currentFabricOrderId = currentRow.controls['fabricOrderId'].value;

    if (!currentWorkOrder || !currentDyedFabricId || !currentFabricOrderId) {
      return;
    }

    // Find all rows with same workOrderNumber, dyedFabricId, and fabricOrderId (including current row)
    const groupRows = rows.filter(row => 
      row.controls['workOrderNumber'].value === currentWorkOrder &&
      row.controls['dyedFabricId'].value === currentDyedFabricId &&
      row.controls['fabricOrderId'].value === currentFabricOrderId
    );

    // Apply waste_ratio to all rows in group (don't calculate anything yet, user will enter dyeingQuantity)
    groupRows.forEach(row => {
      row.controls['wasteRatio'].setValue(wasteRatio);
    });
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
      return; // No dyeing quantity entered, nothing to calculate
    }

    if (!currentWorkOrder || !currentFabricOrderId || !currentWdFormRequisitionDetailsId) {
      // No grouping criteria, just set quantity = dyeingQuantity for current row
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

    // Calculate total dyeingQuantity (كمية المصبوغ) from all rows that have dyeingQuantity entered
    const totalDyeingQuantity = groupRows.reduce((sum, row) => 
      sum + (parseFloat(row.controls['dyeingQuantity'].value) || 0), 0
    );

    if (totalValidQuantity <= 0 || totalDyeingQuantity <= 0) {
      return;
    }

    // Calculate general waste ratio: (totalValid - totalDyeing) / totalValid * 100
    const calculatedWasteRatio = ((totalValidQuantity - totalDyeingQuantity) / totalValidQuantity) * 100;

    // Store the calculated waste ratio in the wasteRatio field for display/reference
    groupRows.forEach(row => {
      row.controls['wasteRatio'].setValue(calculatedWasteRatio.toFixed(2));
    });

    // Calculate each row's raw quantity based on its dyeingQuantity and the calculated waste ratio
    // quantity = dyeingQuantity / (1 - wasteRatio / 100)
    groupRows.forEach(row => {
      const rowDyeingQuantity = parseFloat(row.controls['dyeingQuantity'].value) || 0;
      if (rowDyeingQuantity > 0) {
        const calculatedRawQuantity = rowDyeingQuantity / (1 - calculatedWasteRatio / 100);
        row.controls['quantity'].setValue(calculatedRawQuantity.toFixed(3));
      }
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
            'consigmentDyeingNumber', 'dyedFabricName', 'dyedFabricCode',
            'colorCategoryId', 'colorCategoryName', 'colorId', 'colorName', 'colorCode', 'validQuantity', 'dyedFabricOrderRequisitionName', 'wasteRatio'])

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

