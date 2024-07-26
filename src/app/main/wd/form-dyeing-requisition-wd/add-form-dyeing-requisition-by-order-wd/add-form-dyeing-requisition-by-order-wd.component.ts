import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { WdService } from "src/app/services/main/wd/wd.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";
import { DyeingServicesService } from "src/app/services/main/dyeing-services.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";
import { DyeingOrderDetailsWdService } from "src/app/services/main/wd/dyeing-order-details-wd.service";
import { FormDyeingRequisitionWdService } from "src/app/services/main/wd/form-dyeing-requisition-wd.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-form-dyeing-requisition-by-order-wd',
  templateUrl: './add-form-dyeing-requisition-by-order-wd.component.html',
  styleUrls: ['./add-form-dyeing-requisition-by-order-wd.component.css']
})
export class AddFormDyeingRequisitionByOrderWdComponent implements OnInit {

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('dt2') dt2: Table | undefined;
  loadingDyeingFabrics: boolean = true;
  selectArrayValues: any[] = [];
  selectedFabricCodes: any[] = []
  selectedFabricDyeingCodes: any[] = []
  selectedFabricNames: any[] = []
  selectedConsigmentDyeingNumbers: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedCodes: any[] = []

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    dyeingId: new FormControl(null, [Validators.required]),
    sellerId: new FormControl(null, [Validators.required]),
    // workOrderNumber: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any[] = [];
  dyedFabrics: any[] = [];
  dyerName = ""
  sellerName = ""
  dyers: any[] = [];
  sellers: any[] = [];
  dyeingOrders: any
  selectedDyeingId: any
  colorCategories: any[] = [];
  colors: any[] = [];
  dyeingServicesData: any
  fabricsDetails: any[] = [];
  getListFabricPrices: any = []
  listFabricPricesDollar: any = []
  selectedSeller: any = []
  dyeingOrderDetails: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  fabricMap = new Map()
  filter = "";
  selectedRowFabric: any = {}
  selectedOrderedFabric: any = {}
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
  public fieldsColor: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColor: string = "اللون"

  public onFilteringColorName(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors[index], query);
  }

  // --------------- seller --------------
  // maps the appropriate column to fields property
  public fieldsSeller: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textSeller: string = "العميل"


  public onFilteringSeller(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.sellers, query);
  }

  constructor(
    private _fabricService: FabricService,
    private _wdService: WdService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,
    private _dyeingServicesService: DyeingServicesService,
    private _bussinessmanService: BussinessmanService,
    private _dyeingOrderDetailsWdService: DyeingOrderDetailsWdService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private _formDyeingRequisitionWdService: FormDyeingRequisitionWdService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
    this.customFilterForCode();
    this.customFilterForFabricCodes();
    this.customFilterForFabricDyeingCodes();
    this.customFilterForFabricNames();
    this.customFilterForConsigmentDyeingNumbers();
  }

  getData() {
    this._bussinessmanService.selectDyeingFromWd().subscribe((response: any) => {
      this.dyers = response
    })

    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.dyedFabrics = response
    })

    this._bussinessmanService.selectSellersOrderedFromDyeing().subscribe((response: any) => {
      this.sellers = response
    })
  }

  getSelectedIndex(selectedRowFabric: any, selectedOrderedFabric: any) {
    if (this.selectArrayValues.includes(selectedRowFabric)) {
      this.fabricMap.set(selectedRowFabric, selectedRowFabric?.current_quantity)
    }
    
    this.selectArrayValues.push(selectedRowFabric);
    this.addItem(selectedRowFabric, selectedOrderedFabric)
    // Get Prices
    this._reportWdService.selectPriceByFabricByDyeingByConsigmentDyeingInWd(selectedRowFabric.fabric_id, selectedRowFabric.dyeing_id, selectedRowFabric.consigment_dyeing_id).subscribe((response: any) => {
      this.fabricsDetails = response
      
      this.getListFabricPrices[this.selectArrayValues.length - 1] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails), this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails), parseFloat(this.fabricsDetails[0].latest_price)]
      this.listFabricPricesDollar[this.selectArrayValues.length - 1] = [this._sharedComponentService.getAvgPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), parseFloat(this.fabricsDetails[0].latest_price_dollar)]
    })
  }

  selectRowFabric(objectData: any) {
    this.selectedRowFabric = objectData
  }

  selectOrderedFabric(objectData: any) {
    this.selectedOrderedFabric = objectData
  }

  addRecord() {
    this.getSelectedIndex(this.selectedRowFabric, this.selectedOrderedFabric)
    this.changeBackgroundColorSelectedData(this.selectedOrderedFabric.id, 'add')

    this.selectedRowFabric = {}
    this.selectedOrderedFabric = {}

    Array.from(document.querySelectorAll('input[name="selectRowFabric"]:checked'), input => input['checked'] = false);
    Array.from(document.querySelectorAll('input[name="selectOrderedFabric"]:checked'), input => input['checked'] = false);

  }

  changeBackgroundColorSelectedData(id, type: string, numOfOccurrences?) {
    if (type == 'add') {
      document.querySelector(`input[value="${id}"]`)?.closest("tr")?.classList.add('added-order');
    }
    else if (type == 'remove' && numOfOccurrences < 2) {
      document.querySelector(`input[value="${id}"]`)?.closest("tr")?.classList.remove('added-order');
    }
  }

  // Initialize Form Builder
  initItem(selectedRowFabric: any, selectedOrderedFabric: any, index: number) {
    return new FormGroup({
      index: new FormControl(index),
      fabricId: new FormControl(selectedRowFabric.fabric_id, [Validators.required]),
      fabricCode: new FormControl(selectedRowFabric.fabric_code),
      dyeingCode: new FormControl(selectedRowFabric.fabric_dyeing_code),
      fabricName: new FormControl(selectedRowFabric.fabric_name),
      consigmentDyeingId: new FormControl(selectedRowFabric.consigment_dyeing_id, [Validators.required]),
      consigmentDyeingNumber: new FormControl(selectedRowFabric.consigment_dyeing_number, [Validators.required]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(String((selectedOrderedFabric.form_current_quantity > selectedRowFabric.current_quantity) ? selectedRowFabric.current_quantity : selectedOrderedFabric.form_current_quantity), [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(selectedRowFabric.current_quantity),
      colorCategoryId: new FormControl(null, [Validators.required]),
      colorId: new FormControl(null, [Validators.required]),
      colorCode: new FormControl(null),
      dyeingColorsPricesId: new FormControl(null, [Validators.required]),
      dyeingServices: new FormControl(null, [Validators.required]),
      dyedFabricId: new FormControl(selectedOrderedFabric.dyed_fabric_id, [Validators.required]),
      wdFormDyeingOrderRequisitionDetailsId: new FormControl(selectedOrderedFabric.id, [Validators.required]),
      fabricWidth: new FormControl(selectedOrderedFabric.fabric_width, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      fabricQuantityM2: new FormControl(selectedOrderedFabric.fabric_quantity_m2, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(selectedRowFabric: any, selectedOrderedFabric) {
    let index = this.fabrics.indexOf(selectedRowFabric)
    const control = <FormArray>this.addRequisitionForm.get('items');
    let row = this.initItem(selectedRowFabric, selectedOrderedFabric, index)
    control.push(row);
    this.selectDyedFabric(selectedOrderedFabric, row, control.value.length-1)
    this.dyeingOrderDetails[control.value.length-1] = selectedOrderedFabric.dyeing_order_details
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number, objectData: any) {
    const control = <FormArray>this.addRequisitionForm.get('items');

    const numOfOccurrences = control.value.reduce((n, val) => {
      return n + (val.wdFormDyeingOrderRequisitionDetailsId === control.value[index].wdFormDyeingOrderRequisitionDetailsId);
    }, 0);

    this.changeBackgroundColorSelectedData(control.value[index].wdFormDyeingOrderRequisitionDetailsId, 'remove', numOfOccurrences)

    control.removeAt(index);

    // Price
    this.getListFabricPrices.splice(index, 1)
    this.listFabricPricesDollar.splice(index, 1)

    this._quantityOccurrencesValidationService.removeIndexFromMapAndArray(this.fabricMap, index, objectData, this.selectArrayValues)
  }


  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  customFilterForCode() {
    const customFilterName = "code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCodes

      if (this.selectedCodes[0] != null) {
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
              if (value == filter[j].work_order_number ) {
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
    this.selectedCodes = []
    // this.getData();
  }
  onMultiselectedCodes(event) {    
    this.selectedCodes = event
    this.dt1?._filter()
  }

  
  customFilterForFabricCodes() {
    const customFilterName = "fabric-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricCodes

      if (this.selectedFabricCodes[0] != null) {
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
              if (value == filter[j].fabric_code ) {
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

  
  customFilterForFabricDyeingCodes() {
    const customFilterName = "fabric-dyeing-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricDyeingCodes

      if (this.selectedFabricDyeingCodes[0] != null) {
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
              if (value == filter[j].fabric_dyeing_code ) {
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

  
  customFilterForFabricNames() {
    const customFilterName = "fabric-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricNames

      if (this.selectedFabricNames[0] != null) {
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
              if (value == filter[j].fabric_name ) {
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

  
  customFilterForConsigmentDyeingNumbers() {
    const customFilterName = "consigment-dyeing-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedConsigmentDyeingNumbers

      if (this.selectedConsigmentDyeingNumbers[0] != null) {
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
              if (value == filter[j].consigment_dyeing_number ) {
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

  clearDyeingFabrics(table: Table) {
    table.clear();
    table.reset();
    this.selectedFabricCodes = []
    this.selectedFabricDyeingCodes = []
    this.selectedFabricNames = []
    this.selectedConsigmentDyeingNumbers = []
  }

  onMultiselectedFabricCodes(event) {    
    this.selectedFabricCodes = event
    this.dt2?._filter()
  }

  onMultiselectedFabricDyeingCodes(event) {    
    this.selectedFabricDyeingCodes = event
    this.dt2?._filter()
  }

  onMultiselectedFabricNames(event) {    
    this.selectedFabricNames = event
    this.dt2?._filter()
  }

  onMultiselecteConsigmentDyeingNumbers(event) {    
    this.selectedConsigmentDyeingNumbers = event
    this.dt2?._filter()
  }
  
  //  Dyeing
  selectDyeing(event: { itemData: any; }) {
    if (this.dyers.includes(event.itemData)) {
      this.dyerName = event.itemData.name
      this._wdService.selectQuantityByDyeingWd(event.itemData.id).subscribe((response: any) => {
        this.fabrics = response

        // PrimeNG Table
        this.primengConfig.ripple = true;
        this.loadingDyeingFabrics = false;
      })
      this.selectedDyeingId = event.itemData.id
      this._colorCategoryService.selectByDeying(event.itemData.id).subscribe((response: any) => {
        this.colorCategories = response
      })
      this._dyeingServicesService.selectByDeying(event.itemData.id).subscribe((response: any) => {
        this.dyeingServicesData = response
      })
    }
    else {
      this.addRequisitionForm.controls['dyeingId'].setValue(null)
      // this.addRequisitionForm.controls.items = new FormArray([])

      const formGroup = <FormGroup>this.addRequisitionForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));

      this.fabrics = []
      this.colorCategories = []
      this.dyeingServicesData = []
    }
  }


  // Dyed Fabric
  selectDyedFabric(element: any, row: FormGroup, index) {
    // row.controls.wdFormDyeingOrderRequisitionDetailsId.setValue(element.id)
    // row.controls['fabricWidth'].setValue(element.fabric_width)
    // row.controls['fabricQuantityM2'].setValue(element.fabric_quantity_m2)
    // row.controls['quantity'].setValue(parseFloat(element.form_current_quantity))
    this.colorCategories.some(category => {
      if (category['name'] == element.color_category_name) {
        row.controls['colorCategoryId'].setValue(category['id'])
        this._colorService.selectByCategoryAndDeying(this.selectedDyeingId, category['id']).subscribe((response: any) => {
          this.colors[index] = response
        })
      }
    })

    this.validate(row)
    // this.colorCategories.
    // if()
    // row.controls['colorCategoryId'].setValue(element.form_current_quantity)
    // row.controls['colorId'].setValue(element.form_current_quantity)
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
    }
  }

  // Color Category
  selectColorCategory(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colorCategories.includes(event.itemData)) {
      row.controls['colorCategoryId'].setValue(null)
      row.controls['colorId'].setValue(null)
      row.controls['colorCode'].setValue(null)
      row.controls['dyeingColorsPricesId'].setValue(null)
      // row.controls['dyeingFee'].setValue(null)
      this.colors[index] = []
    }
    else {
      this._colorService.selectByCategoryAndDeying(this.selectedDyeingId, event.itemData.id).subscribe((response: any) => {
        this.colors[index] = response
      })
    }
  }

  // Color
  selectColor(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colors[index].includes(event.itemData)) {
      row.controls['colorId'].setValue(null)
      row.controls['colorCode'].setValue(null)
      row.controls['dyeingColorsPricesId'].setValue(null)
      // row.controls['dyeingFee'].setValue(null)
    }
    else {
      row.controls['colorId'].setValue(event.itemData.id)
      row.controls['colorCode'].setValue(event.itemData.code)
      row.controls['dyeingColorsPricesId'].setValue(event.itemData.dyeing_colors_prices_id)
      // row.controls['dyeingFee'].setValue(String(event.itemData.price))
    }
  }

  selectSeller(event: { itemData: any; }) {
    this.selectedSeller = event.itemData;
    if (this.sellers.includes(event.itemData)) {
      this._dyeingOrderDetailsWdService.selectOrdersBySeller(event.itemData.id).subscribe((response: any) => {
        this.dyeingOrders = response
        this.sellerName = event.itemData.name

        // PrimeNG Table
        this.primengConfig.ripple = true;
        this.loading = false;
      })
    }
    else {
      this.selectedSeller = []
      this.dyeingOrders = []
      this.sellerName = ""
    }
  }

  sumInputQuantity() {
    return this.addRequisitionForm.controls.items.value.map(function (a) { return (((parseFloat(a['quantity']) * parseFloat(a['wastRatio'])) / 100) + parseFloat(a['quantity'])) }).reduce((acc:any, value:any) => parseFloat(acc) + parseFloat(value), 0);
  }

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }
  
  async onAddRequisition() {
    this.isShowAdd = false

    this.addRequisitionForm.markAllAsTouched();
    if (this.addRequisitionForm.valid && this.addRequisitionForm.get('items')!['controls'].length > 0) {
      if (
        this._quantityOccurrencesValidationService.validateQuantityDynamic(
          this.fabricMap, this.addRequisitionForm.controls['items'].value, 
          'fabric_id', 'fabricId',
          'consigment_dyeing_id', 'consigmentDyeingId',
          'dyeingId', 'dyeing_id',
          'quantity', 'fabric_name')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addRequisitionForm, 'items',
        ['index', 'fabricCode', 'fabricName', 'dyeingCode',  
        'colorCategoryId', 'colorId', 'colorCode', 'consigmentDyeingNumber', 
        'dyedFabricCode', 'validQuantity'])
   
        this._constantsService.spinner.show()
        this._formDyeingRequisitionWdService.addByOrder(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[140]}`, { id: response.id });
            this._sharedComponentService.reloadPage();
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


