import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Form Services
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { WdService } from "src/app/services/main/wd/wd.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";
import { DyeingServicesService } from "src/app/services/main/dyeing-services.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { FormDyeingRequisitionWdService } from "src/app/services/main/wd/form-dyeing-requisition-wd.service";
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-form-dyeing-requisition-wd',
  templateUrl: './add-form-dyeing-requisition-wd.component.html',
  styleUrls: ['./add-form-dyeing-requisition-wd.component.css']
})
export class AddFormDyeingRequisitionWdComponent implements OnInit {

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['select', 'code', 'fabric_dyeing_code', 'name', 'consigment_dyeing_number', 'quantity'];
  dataSourceSearchTabel: any;
  selection = new SelectionModel(true);
  selectArrayValues: any[] = [];

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    dyeingId: new FormControl(null, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any = []
  consigments: any = []
  dyedFabrics: any = []
  dyerName = ""
  dyers: any = []
  selectedDyeingId: any = []
  colorCategories: any = []
  colors: any = []
  dyeingServicesData:any
  fabricsDetails: any
  getListFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  fabricMap = new Map()
  filter = "";
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

  // --------------- Dyed Fabric --------------
  // maps the appropriate column to fields property
  public fieldsDyedFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyedFabric: string = "نوع القماش المصبوغ"

  public onFilteringDyedFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    predicate = predicate.or('dyeing_code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyedFabrics, query);
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
    predicate = predicate.or('id', 'contains', e.text);
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

  constructor(
    private _fabricService: FabricService,
    private _wdService: WdService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,
    private _dyeingServicesService: DyeingServicesService,
    private _bussinessmanService: BussinessmanService,
    private _formDyeingRequisitionWdService: FormDyeingRequisitionWdService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    
  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectDyeingFromWd().subscribe((response: any) => {
      this.dyers = response
    })

    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.dyedFabrics = response
    })
 
  }

  getSelectedIndex(objectData: any) {
    if (this.selectArrayValues.includes(objectData)) {
      this.fabricMap.set(objectData, objectData?.current_quantity)
    }
    this.selectArrayValues.push(objectData);
    this.addItem(objectData)
    this.selectByCategoryAndDeying(this.selectedDyeingId, this.addRequisitionForm.controls['items'].value.length-1)

    // Get Prices
    this._reportWdService.selectPriceByFabricByDyeingByConsigmentDyeingInWd(objectData.fabric_id, objectData.dyeing_id, objectData.consigment_dyeing_id).subscribe((response: any) => {
      this.fabricsDetails = response
      // console.log("this.fabricsDetails ::: ", this.fabricsDetails);

      this.getListFabricPrices[this.selectArrayValues.length - 1] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails), this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails), parseFloat(this.fabricsDetails[0].latest_price)]
      this.listFabricPricesDollar[this.selectArrayValues.length - 1] = [this._sharedComponentService.getAvgPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.fabricsDetails, 'quantity', 'price_dollar'), parseFloat(this.fabricsDetails[0].latest_price_dollar)]
    })
  }

  // Initialize Form Builder
  initItem(data: any, index: number) {
    return new FormGroup({
      index: new FormControl(index),
      fabricId: new FormControl(data.fabric_id, [Validators.required]),
      fabricCode: new FormControl(data.fabric_code),
      dyeingCode: new FormControl(data.fabric_dyeing_code),
      fabricName: new FormControl(data.fabric_name),
      consigmentDyeingId: new FormControl(data.consigment_dyeing_id, [Validators.required]),
      consigmentDyeingNumber: new FormControl(data.consigment_dyeing_number, [Validators.required]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity),
      colorCategoryId: new FormControl(null, [Validators.required]),
      colorId: new FormControl(null, [Validators.required]),
      colorCode: new FormControl(null),
      dyeingColorsPricesId: new FormControl(null, [Validators.required]),
      dyeingServices: new FormControl(null, [Validators.required]),
      dyedFabricId: new FormControl(null, [Validators.required]),
      dyedFabricCode: new FormControl(null),
      fabricWidth: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      fabricQuantityM2: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(data: any) {
    let index = this.fabrics.indexOf(data)
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.push(this.initItem(data, index));
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number, objectData: any) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.getListFabricPrices.splice(index, 1)
    this.listFabricPricesDollar.splice(index, 1)
    
    this._quantityOccurrencesValidationService.removeIndexFromMapAndArray(this.fabricMap,index,objectData,this.selectArrayValues)
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  // Dyed Fabric
  selectDyedFabric(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.dyedFabrics.indexOf(index.itemData)
    if (this.dyedFabrics[indexData] !== index.itemData) {
      row.controls['dyedFabricId'].setValue(null)
      row.controls['dyedFabricCode'].setValue(null)
    }
    else {
      row.controls['dyedFabricCode'].setValue(index.itemData.code)
    }    
  }


  validate(row: FormGroup) {
    if(parseFloat(row.controls['quantity'].value)  > parseFloat(row.controls['validQuantity'].value)) {
      row.controls['quantity'].setErrors({'incorrect': true});
    }
    else {
      row.controls['quantity'].setErrors({'incorrect': null});
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
      this.colors[index] = []
    }
    else {
      this.selectByCategoryAndDeying(this.selectedDyeingId, index, event.itemData.id)
    }
  }

  selectByCategoryAndDeying(dyeingId, index, colorCategoryId = this._constantsService.DEFAULT_COLOR_CATEGORY_ID) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    
    control.controls[index]['controls']['colorCategoryId'].setValue(colorCategoryId)
    this._colorService.selectByCategoryAndDeying(dyeingId, colorCategoryId).subscribe((response: any) => {
      this.colors[index] = response
    })
  }

  // Color
  selectColor(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colors[index].includes(event.itemData)) {
      row.controls['colorId'].setValue(null)
      row.controls['colorCode'].setValue(null)
      row.controls['dyeingColorsPricesId'].setValue(null)
    }
    else {
      row.controls['colorCode'].setValue(event.itemData.code)
      row.controls['dyeingColorsPricesId'].setValue(event.itemData.dyeing_colors_prices_id)
    }
  }


  //  Dyeing
  selectDyeing(event: { itemData: any; }) {
    if (this.dyers.includes(event.itemData)) {
      this.dyerName = event.itemData.name
      this._wdService.selectQuantityByDyeingWd(event.itemData.id).subscribe((response: any) => {
        this.fabrics = response

        this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);
        this.dataSourceSearchTabel.sort = this.sortColumns;
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
      this.dataSourceSearchTabel = []
    }
  }


  sumInputQuantity() {
    return this.addRequisitionForm.controls.items.value.map(function (a) { return (((parseFloat(a['quantity']) * parseFloat(a['wastRatio'])) / 100) + parseFloat(a['quantity'])) }).reduce((acc:any, value:any) => parseFloat(acc) + parseFloat(value), 0);
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
    if (this.addRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateQuantityDynamic(
        this.fabricMap, this.addRequisitionForm.controls['items'].value, 
        'fabric_id', 'fabricId',
        'consigment_dyeing_id', 'consigmentDyeingId',
        'dyeingId', 'dyeing_id',
        'quantity', 'fabric_name')) {

        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addRequisitionForm, 'items',
          ['index', 'fabricCode', 'fabricName', 'dyeingCode', 
          'fabricCode', 'colorCategoryId',
          'colorId', 'colorCode', 'consigmentDyeingNumber', 'dyedFabricCode', 'validQuantity'])
        this._constantsService.spinner.show()
        this._formDyeingRequisitionWdService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[53]}/details`, { id: response.id });
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

