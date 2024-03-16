import { Component, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { DyeingOrderDetailsWdService } from "src/app/services/main/wd/dyeing-order-details-wd.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-dyeing-order-form-wd',
  templateUrl: './add-dyeing-order-form-wd.component.html',
  styleUrls: ['./add-dyeing-order-form-wd.component.css']
})
export class AddDyeingOrderFormWdComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addOrderForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    items: new FormArray([this.initItem()]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  dyedFabrics: any = []
  colorCategories: any = []
  colors: any = []
  isShowAdd = true

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Dyed Fabric --------------
  // maps the appropriate column to fields property
  public fieldsDyedFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyedFabric: string = "نوع القماش المصبوغ"

  public onFilteringDyedFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
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

  constructor(
    private _fabricService: FabricService,
    private route: ActivatedRoute,
    private _dyeingOrderDetailsWdService: DyeingOrderDetailsWdService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _exportDataService: ExportDataService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.addOrderForm.controls.id.setValue(params['id'])
    })

    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.dyedFabrics = response
    })

    this._colorCategoryService.selectAll().subscribe((response: any) => {
      this.colorCategories = response
    })
  }

// Initialize Form Builder
initItem() {
  return new FormGroup({
    dyedFabricId: new FormControl("", [Validators.required]),
    dyedFabricCode: new FormControl(""),
    colorCategoryId: new FormControl("", [Validators.required]),
    colorId: new FormControl("", [Validators.required]),
    colorCode: new FormControl("", [Validators.required]),
    quantity: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricWidth: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricQuantityM2: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    note: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
  });
}

addItem() {
  const control = <FormArray>this.addOrderForm.get('items');
  control.push(this.initItem());
}

getItem(form: any) {    
  return form.controls.items.controls;
}

removeItem(index: number){
  const control = <FormArray>this.addOrderForm.get('items');
  control.removeAt(index);
 }

  // Dyed Fabric
  selectDyedFabric(element: { itemData: any; }, row: FormGroup) {
    let indexData = this.dyedFabrics.indexOf(element.itemData)
    if (this.dyedFabrics[indexData] !== element.itemData) {
      row.controls['dyedFabricId'].setValue(null)
      row.controls['dyedFabricCode'].setValue(null)
    }
    else {
      row.controls['dyedFabricCode'].setValue(element.itemData.code)
    }    
  }

  // Color Category
  selectColorCategory(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colorCategories.includes(event.itemData)) {
      row.controls['colorCategoryId'].setValue(null)
      row.controls['colorId'].setValue(null)
      row.controls['colorCode'].setValue(null)
      this.colors = []
    }
    else {
      this._colorService.selectByCategory(event.itemData.id).subscribe((response: any) => {
        this.colors = response
      })
    }
  }

  // Color
  selectColor(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colors.includes(event.itemData)) {
      row.controls['colorId'].setValue(null)
      row.controls['colorCode'].setValue(null)
    } else {
      row.controls['colorCode'].setValue(event.itemData.code)
    }
  }

  async onAddRequisition() {
    this.isShowAdd = false

    this.addOrderForm.markAllAsTouched();
    if (this.addOrderForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addOrderForm, 'items',
      ['dyedFabricCode'])
      this._constantsService.spinner.show()
      this._dyeingOrderDetailsWdService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithParams(response.id);
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
    }  else {
      this.isShowAdd = true
    }
  }

}
