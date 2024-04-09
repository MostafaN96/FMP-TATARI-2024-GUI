import { Component, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { WarehouseService } from 'src/app/services/main/warehouse.service';
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { ExecuteOrderRequisitionWeService } from "src/app/services/main/we/execute-order-requisition-we.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-execute-order-requisition-add-we',
  templateUrl: './execute-order-requisition-add-we.component.html',
  styleUrls: ['./execute-order-requisition-add-we.component.css']
})
export class ExecuteOrderRequisitionAddWeComponent implements OnInit {

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('dt2') dt2: Table | undefined;
  loadingDyeingFabrics: boolean = true;
  selectedStoredDyedFabricsArrayValues: any[] = [];
  selectedDyedFabricCodes: any[] = []
  selectedDyedFabricNames: any[] = []
  selectedConsigmentDyeing: any[] = []
  selectedWarehouses: any[] = []
  selectedTypeOfRequisition: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedCodes: any[] = []

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    warehouseId: new FormControl(this._constantsService.DEFAULT_WE_WAREHOUSE_ID, [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    weDyedFabricOrderRequisitionId: new FormControl("", [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  orderedDyedFabrics: any = []
  storedWeFabrics: any = []
  warehouses: any = []
  colorCategories: any = []
  colors: any = []
  dyedFabricOrderRequisitionId = ""
  dyedFabricOrderRequisitionDetailsId = ""
  dyedFabricOrderCurrentQuantity = "0"
  dyedFabricOrderPrice = "0"
  dyedFabricOrderPriceDollar = "0"

  requisitionsOrder: any
  dyedFabricsPricesDetails: any[] = [];
  getListDyedFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  selectedStoredDyedFabricsMap = new Map()
  filter = "";
  selectedStoredDyedFabrics: any = {}
  selectedOrderedDyedFabric: any = {}
  isShowAdd = true
  selectedColorCategories: any[] = []
  selectedColors: any[] = []

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

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

    // --------------- Color Category --------------
  // maps the appropriate column to fields property
  public fieldsColorCategory: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColorCategory: string = "فئة اللون"

  public onFilteringColorCategoryName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colorCategories, query);
  }

  // --------------- Color --------------
  // maps the appropriate column to fields property
  public fieldsColor: Object = { value: "id", text: "color_name_code" };
  // set the placeholder to the AutoComplete input
  public textColor: string = "اللون"

  public onFilteringColorName(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('color_name_code', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors[index], query);
  }

  constructor(
    private _fabricService: FabricService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWeService: ReportWeService,
    public _exportDataService: ExportDataService,
    private _executeOrderRequisitionWeService: ExecuteOrderRequisitionWeService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    private _warehouseService: WarehouseService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()

    this.customFilterForDyedFabricCodes();
    this.customFilterForDyedFabricNames();
this.customFilterForColorCategory();
    this.customFilterForColorName();

    this.customFilterForWarehouse();
    this.customFilterForTypeOfRequisition();
    this.customFilterForConsigmentDyeing();
  }

  getData() {
    this._dyedFabricOrderRequisitionWeService.selectAll('opened').subscribe((response: any) => {
      this.requisitionsOrder = response
    })

    this._warehouseService.selectWhereInWe().subscribe((response: any) => {
      this.warehouses = response
    })

    this._colorCategoryService.selectAll().subscribe((response: any) => {
      this.colorCategories = response
    })
  }

  //  Dyeing
  selectRequisitionsOrderName(event: { itemData: any; }) {
    if (this.requisitionsOrder.includes(event.itemData)) {
      this._dyedFabricOrderRequisitionWeService.selectDyedFabricsOrderRequisition(event.itemData.id).subscribe((response: any) => {
        this.orderedDyedFabrics = response

        // PrimeNG Table
        this.primengConfig.ripple = true;
        this.loadingDyeingFabrics = false;
      })
    } else {
      this.orderedDyedFabrics = []
    }
  }

  selectRowFabric(objectData: any) {
    if (objectData) {
      this._fabricService.selectStoredDyedFabricsByDyedFabricByColorByColorCodeWe(objectData.dyed_fabric_id, objectData.color_id, objectData.color_code).subscribe((response: any) => {
        this.storedWeFabrics = response
        this.dyedFabricOrderRequisitionId = objectData.requisition_id
        this.dyedFabricOrderRequisitionDetailsId = objectData.id
        this.dyedFabricOrderCurrentQuantity = objectData.current_quantity
        this.dyedFabricOrderPrice = objectData.price
        this.dyedFabricOrderPriceDollar = objectData.price_dollar
        // PrimeNG Table
        this.loading = false;
      })
    } else {
      this.storedWeFabrics = []
      this.dyedFabricOrderRequisitionId = ""
      this.dyedFabricOrderRequisitionDetailsId = ""
      this.dyedFabricOrderCurrentQuantity = "0"
      this.dyedFabricOrderPrice = "0"
      this.dyedFabricOrderPriceDollar = "0"
    }
  }

  getSelectedStoredDyedFabrics(selectedStoredDyedFabrics: any) {
    console.log("selectedStoredDyedFabrics ::: ", selectedStoredDyedFabrics);
    

    if (this.selectedStoredDyedFabricsArrayValues.filter(objOfArr =>
      objOfArr.requisition_details_id == selectedStoredDyedFabrics.requisition_details_id
    ).length < 1) {
      this.selectedStoredDyedFabricsMap.set(selectedStoredDyedFabrics, selectedStoredDyedFabrics?.current_quantity)

      this.selectedStoredDyedFabricsArrayValues.push(selectedStoredDyedFabrics);
      this.addItem(selectedStoredDyedFabrics)
      // Get Prices
      this._reportWeService.selectPriceWe(selectedStoredDyedFabrics.id,
        selectedStoredDyedFabrics.color_id,
        selectedStoredDyedFabrics.color_code
        ).subscribe((response: any) => {
        this.dyedFabricsPricesDetails = response

        this.getListDyedFabricPrices[this.selectedStoredDyedFabricsArrayValues.length - 1] = 
        [
          this._sharedComponentService.getAvgPrice(this.dyedFabricsPricesDetails), 
          this._sharedComponentService.getAvgInputesPrice(this.dyedFabricsPricesDetails), 
          parseFloat(this.dyedFabricsPricesDetails[0].latest_price)
        ]

        this.listFabricPricesDollar[this.selectedStoredDyedFabricsArrayValues.length - 1] = 
        [
          this._sharedComponentService.getAvgPriceDynamic(this.dyedFabricsPricesDetails, 'quantity', 'price_dollar'), 
          this._sharedComponentService.getAvgInputesPriceDynamic(this.dyedFabricsPricesDetails, 'quantity', 'price_dollar'), 
          parseFloat(this.dyedFabricsPricesDetails[0].latest_price_dollar)
        ]
      })
    }

  }

  // Initialize Form Builder
  initItem(selectedStoredDyedFabrics: any) {
    return new FormGroup({
      typeOfRequisition: new FormControl(selectedStoredDyedFabrics.type_of_requisition, [Validators.required]),
      typeOfRequisitionTrans: new FormControl(selectedStoredDyedFabrics.type_of_requisition_trans, [Validators.required]),
      weRequisitionDetailsId: new FormControl(selectedStoredDyedFabrics.requisition_details_id, [Validators.required]),
      weDyedFabricOrderRequisitionId: new FormControl(this.dyedFabricOrderRequisitionId, [Validators.required]),
      weDyedFabricOrderRequisitionDetailsId: new FormControl(this.dyedFabricOrderRequisitionDetailsId, [Validators.required]),
      dyedFabricId: new FormControl(selectedStoredDyedFabrics.id, [Validators.required]),
      dyedFabricCode: new FormControl(selectedStoredDyedFabrics.code),
      dyedFabricName: new FormControl(selectedStoredDyedFabrics.name),
      fromWarehouseId: new FormControl(selectedStoredDyedFabrics.warehouse_id, [Validators.required]),
      fromConsigmentDyeingId: new FormControl(selectedStoredDyedFabrics.consigment_dyeing_id, [Validators.required]),
      consigmentDyeingNumber: new FormControl(selectedStoredDyedFabrics.consigment_dyeing_number, [Validators.required]),
      newConsigmentDyeingNumber: new FormControl(this.requisitionsOrder[0].name, [Validators.required]),
      weId: new FormControl(selectedStoredDyedFabrics.we_id, [Validators.required]),
      colorCategoryId: new FormControl(selectedStoredDyedFabrics.color_category_id, [Validators.required]),
      colorCategoryName: new FormControl(selectedStoredDyedFabrics.color_category_name, [Validators.required]),
      colorId: new FormControl(selectedStoredDyedFabrics.color_id, [Validators.required]),
      colorName: new FormControl(selectedStoredDyedFabrics.color_name_code),
      colorCode: new FormControl(selectedStoredDyedFabrics.color_code),
      price: new FormControl(this.dyedFabricOrderPrice, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl(this.dyedFabricOrderPriceDollar, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl((this.dyedFabricOrderCurrentQuantity <= selectedStoredDyedFabrics.current_quantity) ? this.dyedFabricOrderCurrentQuantity : selectedStoredDyedFabrics.current_quantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(selectedStoredDyedFabrics.current_quantity),
      note: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(selectedStoredDyedFabrics: any) {
    this.selectedStoredDyedFabricsArrayValues.indexOf(selectedStoredDyedFabrics)
    const control = <FormArray>this.addRequisitionForm.get('items');
    let row = this.initItem(selectedStoredDyedFabrics)
    control.push(row);
    this.goalQuantityOfOrder()

    // get Colors
    this._colorService.selectByCategory(selectedStoredDyedFabrics.color_category_id).subscribe((response: any) => {
      this.colors[control.length] = response        
    })
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number, objectData: any) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.getListDyedFabricPrices.splice(index, 1)
    this.listFabricPricesDollar.splice(index, 1)
    this._quantityOccurrencesValidationService.removeIndexFromMapAndArray(this.selectedStoredDyedFabricsMap, index, objectData, this.selectedStoredDyedFabricsArrayValues)
  }




  validate(row: FormGroup) {

    if (parseFloat(row.controls['quantity'].value) > parseFloat(row.controls['validQuantity'].value)) {
      console.log("if");
      row.controls['quantity'].setErrors({ 'incorrect': true });
      // row.controls['quantity'].updateValueAndValidity()
      this.addRequisitionForm.markAllAsTouched();
    }
    else {
      console.log("else");
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
      this.goalQuantityOfOrder()
    }
  }

  goalQuantityOfOrder() {
    const control = <FormArray>this.addRequisitionForm.get('items');

    for (let i = 0; i < this.orderedDyedFabrics.length; i++) {
      const orderedDyedFabric = this.orderedDyedFabrics[i];
      orderedDyedFabric.added_quantity = 0

      for (let j = 0; j < control.controls.length; j++) {
        const controls = control.controls[j];

        if (orderedDyedFabric.dyed_fabric_id == controls['controls']['dyedFabricId'].value &&
        orderedDyedFabric.color_id == controls['controls']['colorId'].value &&
        orderedDyedFabric.color_code == controls['controls']['colorCode'].value ) {
          orderedDyedFabric.added_quantity = parseFloat(orderedDyedFabric.added_quantity + parseFloat(controls['controls']['quantity'].value))
        }
      }

    }

  }

  //  Warehouse
  selectWarehouse(event: { itemData: any; }) {
    if (!this.warehouses.includes(event.itemData)) {
      this.addRequisitionForm.controls['warehouseId'].setValue(null)
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

  async onAddRequisition() {
    this.isShowAdd = false

    this.addRequisitionForm.markAllAsTouched();
    if (this.addRequisitionForm.valid && this.addRequisitionForm.get('items')!['controls'].length > 0) {
      if (
        this._quantityOccurrencesValidationService.validateQuantityDynamic(
          this.selectedStoredDyedFabricsMap, this.addRequisitionForm.controls['items'].value,
          'id', 'dyedFabricId',
          'consigment_dyeing_id', 'fromConsigmentDyeingId',
          'requisition_details_id', 'weRequisitionDetailsId',
          'quantity', 'name')) {

        this._constantsService.spinner.show()
        this._executeOrderRequisitionWeService.add(this.addRequisitionForm.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[193]}`, { id: response.id });
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


  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForWarehouse() {
    const customFilterName = "warehouse-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehouses

      if (this.selectedWarehouses[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].warehouse_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForConsigmentDyeing() {
    const customFilterName = "consigment-dyeing-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedConsigmentDyeing

      if (this.selectedConsigmentDyeing[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].consigment_dyeing_number) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForTypeOfRequisition() {
    const customFilterName = "type-of-requisition-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedTypeOfRequisition

      if (this.selectedTypeOfRequisition[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].type_of_requisition_trans) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }


  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedConsigmentDyeing = []
    this.selectedWarehouses = []
    this.selectedTypeOfRequisition = []
    // this.getData();
  }

  onMultiselectedConsigmentDyeing(event) {
    this.selectedConsigmentDyeing = event
    this.dt2?._filter()
  }

  onMultiselectedWarehouses(event) {
    this.selectedWarehouses = event
    this.dt1?._filter()
  }

  onMultiselectedTypeOfRequisition(event) {
    this.selectedTypeOfRequisition = event
    this.dt1?._filter()
  }

  customFilterForDyedFabricCodes() {
    const customFilterName = "dyed-fabric-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyedFabricCodes

      if (this.selectedDyedFabricCodes[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].dyed_fabric_code) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }


  customFilterForDyedFabricNames() {
    const customFilterName = "dyed-fabric-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyedFabricNames

      if (this.selectedDyedFabricNames[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].dyed_fabric_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForColorCategory() {
    const customFilterName = "color-category-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCategories

      if (this.selectedColorCategories[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].color_category_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForColorName() {
    const customFilterName = "color-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColors

      if (this.selectedColors[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].color_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  clearOrderFabrics(table: Table) {
    table.clear();
    table.reset();
    this.selectedDyedFabricCodes = []
    this.selectedDyedFabricNames = []
    this.selectedColorCategories = []
    this.selectedColors = []
  }

  onMultiselectedDyedFabricCodes(event) {
    this.selectedDyedFabricCodes = event
    this.dt2?._filter()
  }

  onMultiselectedDyedFabricNames(event) {
    this.selectedDyedFabricNames = event
    this.dt2?._filter()
  }

  onMultiselectedColorCategory(event) {
    this.selectedColorCategories = event
    this.dt1?._filter()
  }

  onMultiselectedColorName(event) {
    this.selectedColors = event
    this.dt1?._filter()
  }
}
