import { Component, Inject, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { WeAddRequisitionDetailsService } from "src/app/services/main/we/we-add-requisition-details.service";
import { ColorService } from "src/app/services/main/color.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { GradeItemService } from "src/app/services/main/grade-item.service";
import { ActivatedRoute } from '@angular/router';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-we-add-requisition-form-add-details',
  templateUrl: './we-add-requisition-form-add-details.component.html',
  styleUrls: ['./we-add-requisition-form-add-details.component.css']
})
export class WeAddRequisitionFormAddDetailsComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any = []
  colors: any = []
  colorCategories: any = []
  warehouses:any = []
  gradeItems:any = []

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

  public onFilteringColorName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors, query);
  }

  // --------------- Warehouse --------------
  // maps the appropriate column to fields property
  public fieldsWarehouse: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textWarehouse: string = "المخزن"

  public onFilteringWarehouse (e: any)
  {
    e.preventDefaultAction=true;
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

  constructor(
    private _warehouseService: WarehouseService,
    protected _fabricService: FabricService,
    protected _supplierService: BussinessmanService,
    protected _weAddRequisitionDetailsService: WeAddRequisitionDetailsService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    protected _constantsService: ConstantsService,
    protected patterns: ValidatorPatternService,
    protected _sessionManagerService: SessionManagerService,
    private _colorService: ColorService,
    protected _colorCategoryService: ColorCategoryService,
    private _gradeItemService: GradeItemService,
    private route: ActivatedRoute,
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
this.route.queryParams.subscribe(params => {
      this.addRequisitionForm.controls['id'].setValue(params['id'])
    })
    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.fabrics = response
    })

    this._colorService.selectAll().subscribe((response: any) => {
      this.colors = response
    })

    this._colorCategoryService.selectAll().subscribe((response: any) => {
      this.colorCategories = response
    })

    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })

    this._gradeItemService.selectAll().subscribe((response: any) => {
      this.gradeItems = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      warehouseId: new FormControl("", [Validators.required]),
      dyedFabricId: new FormControl(null, [Validators.required]),
      dyedFabricCode: new FormControl(null),
      colorCategoryId: new FormControl(null, [Validators.required]),
      colorId: new FormControl(null, [Validators.required]),
      colorCode: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      gradeItemId: new FormControl("", [Validators.required]),
      consigmentDyeingNumber: new FormControl("", [Validators.required]),
      numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      dyeingCode: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      workOrderNumber: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      storagePlace: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.removeAt(index);
  }

  // Start Fabric Autocomplete Section
  //  Fabric
  selectFabric(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.fabrics.indexOf(index.itemData)
    if (this.fabrics[indexData] !== index.itemData) {
      row.controls['dyedFabricId'].setValue(null)
      row.controls['dyedFabricCode'].setValue(null)
    }
    else {
      row.controls['dyedFabricCode'].setValue(index.itemData.code)
    }
  }
  // End Fabric Autocomplete Section

  // Color Category
  selectColorCategory(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colorCategories.includes(event.itemData)) {
      row.controls['colorCategoryId'].setValue(null)
      row.controls['colorId'].setValue(null)
      row.controls['colorCode'].setValue(null)
      // this.colors = []
    }
  }

  // Color
  selectColor(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colors.includes(event.itemData)) {
      row.controls['colorId'].setValue(null)
    }
  }

  //  Warehouse
  selectWarehouse(event: { itemData: any; }, row: FormGroup) {
    if (!this.warehouses.includes(event.itemData)) {
      row.controls['warehouseId'].setValue("")
    }
  }

  //  Grade item
  selectGradeItem(event: { itemData: any; }, row: FormGroup) {
    if (!this.gradeItems.includes(event.itemData)) {
      row.controls['gradeItemId'].setValue("")
    }
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
    this.addRequisitionForm.markAllAsTouched();
    if (this.addRequisitionForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addRequisitionForm, 'items',
        ['dyedFabricCode'])
      this._constantsService.spinner.show()
      this._weAddRequisitionDetailsService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithParams(this.addRequisitionForm.controls['id'].value);
        }
        else {
         if (response.msg === "duplicated data") {
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
