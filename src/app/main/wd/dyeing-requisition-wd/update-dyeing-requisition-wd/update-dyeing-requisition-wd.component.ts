import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { DyeingRequisitionDetailsWdService } from "src/app/services/main/wd/dyeing-requisition-details-wd.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-dyeing-requisition-wd',
  templateUrl: './update-dyeing-requisition-wd.component.html',
  styleUrls: ['./update-dyeing-requisition-wd.component.css']
})
export class UpdateDyeingRequisitionWdComponent implements OnInit {

  requisitionId: string = "";
  dyeingId: string = ""
  quantityWithWaste = 0
  colorCategories: any
  colors: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

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
  public fieldsColor: Object = { value: "dyeing_colors_prices_id", text: "name" };
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

  @Input() selectedData: any
  inputDyeingWdForm: FormGroup = new FormGroup({
    wdFormDyeingOrderRequisitionDetailsId: new FormControl(""),
    colorId: new FormControl(null, [Validators.required]),
    colorName: new FormControl(null),
    colorCode: new FormControl(null),
    colorCategoryId: new FormControl(null, [Validators.required]),
    dyeingColorsPricesId: new FormControl(null, [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    costPrice: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    dyeingQuantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    dyeingFee: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    addedCost: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    workOrderNumber: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    releaseProcess: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    fabricWidth: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricQuantityM2: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    isCalcDyeingNet: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _dyeingRequisitionDetailsWdService: DyeingRequisitionDetailsWdService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
    this.getData();
  }

  getData() {
    this._colorCategoryService.selectByDeying(this.selectedData?.dyeing_id).subscribe((response: any) => {
      this.colorCategories = response
    })
    this._colorService.selectByCategoryAndDeying(this.selectedData?.dyeing_id, this.selectedData?.color_category_id).subscribe((response: any) => {
      this.colors = response
    })
  }

  ngOnChanges() {
    console.log("this.selectedData ::::::: ", this.selectedData);
    
    this.inputDyeingWdForm.controls['wdFormDyeingOrderRequisitionDetailsId'].setValue(this.selectedData?.wd_form_dyeing_order_requisition_details_id)
    this.inputDyeingWdForm.controls['date'].setValue(this.selectedData?.date)
    this.inputDyeingWdForm.controls['note'].setValue(this.selectedData?.note)
    this.inputDyeingWdForm.controls['price'].setValue(this.selectedData?.price)
    this.inputDyeingWdForm.controls['costPrice'].setValue(String(this.getSumTotalCost(this.selectedData)))
    this.inputDyeingWdForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.inputDyeingWdForm.controls['dyeingQuantity'].setValue(String(this.selectedData?.dyeing_quantity))
    this.inputDyeingWdForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.inputDyeingWdForm.controls['dyeingFee'].setValue(this.selectedData?.dyeing_fee)
    this.inputDyeingWdForm.controls['addedCost'].setValue(this.selectedData?.added_cost)
    this.inputDyeingWdForm.controls['workOrderNumber'].setValue(this.selectedData?.work_order_number)
    this.inputDyeingWdForm.controls['releaseProcess'].setValue(String(this.selectedData?.release_process))
    this.inputDyeingWdForm.controls['colorId'].setValue(this.selectedData?.color_id)
    this.inputDyeingWdForm.controls['colorCode'].setValue(this.selectedData?.color_code)
    this.inputDyeingWdForm.controls['colorName'].setValue(this.selectedData?.color_name)
    this.inputDyeingWdForm.controls['colorCategoryId'].setValue(this.selectedData?.color_category_id)
    this.inputDyeingWdForm.controls['dyeingColorsPricesId'].setValue(this.selectedData?.dyeing_colors_prices_id)
    this.inputDyeingWdForm.controls['fabricWidth'].setValue(this.selectedData?.fabric_width)
    this.inputDyeingWdForm.controls['fabricQuantityM2'].setValue(this.selectedData?.fabric_quantity_m2)
    this.inputDyeingWdForm.controls['isCalcDyeingNet'].setValue(Number(this.selectedData?.is_calc_dyeing_net))
  }

  // Color Category
  selectColorCategory(event: { itemData: any; }) {
    if (!this.colorCategories.includes(event.itemData)) {
      this.inputDyeingWdForm.controls['colorId'].setValue(null)
      this.inputDyeingWdForm.controls['colorCategoryId'].setValue(null)
      this.inputDyeingWdForm.controls['colorCode'].setValue(null)
      this.colors = []
    }
    else {
      this._colorService.selectByCategoryAndDeying(this.selectedData?.dyer_id, event.itemData.id).subscribe((response: any) => {
        this.colors = response
      })
    }
  }

  // Color
  selectColor(event: { itemData: any; }) {
    if (!this.colors.includes(event.itemData)) {
      this.inputDyeingWdForm.controls['colorId'].setValue(null)
      this.inputDyeingWdForm.controls['colorCode'].setValue(null)
      this.inputDyeingWdForm.controls['colorName'].setValue(null)
      this.inputDyeingWdForm.controls['dyeingColorsPricesId'].setValue(null)
      this.inputDyeingWdForm.controls['dyeingFee'].setValue(null)
    }
    else {
      this.inputDyeingWdForm.controls['colorId'].setValue(event.itemData.id)
      this.inputDyeingWdForm.controls['colorCode'].setValue(event.itemData.code)
      this.inputDyeingWdForm.controls['dyeingColorsPricesId'].setValue(event.itemData.dyeing_colors_prices_id)
      this.inputDyeingWdForm.controls['dyeingFee'].setValue(String(event.itemData.price))
      // this.inputDyeingWdForm.controls['colorName'].setValue(event.itemData.name)

    }
  }

  getSumTotalCost(dataSourceSearchTabel) {

    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }
    let sum = 0
    const element = dataSourceSearchTabel;
    console.log("element.dyeing_quantity ::: ", element.dyeing_quantity);
    
    sum = this._sharedComponentService.getTotalCost(
      element.price, 
      element.quantity, 
      element.dyeingServices,
      element.dyeing_fee, 
      element.fabric_piece,
      element.added_cost
    ) / this._sharedComponentService.notZero(element.dyeing_quantity) 
    console.log("sum ========getSumTotalCost======= ", sum);
    
    return parseFloat((sum).toFixed(3))
  }

  isChecked(control, value) {
    this.inputDyeingWdForm.controls[control].setValue(value)
  }

  validateDyeingQuantity() {
    const rowQuantity = parseFloat(this.inputDyeingWdForm.controls['quantity'].value)
    const dyeingQuantity = parseFloat(this.inputDyeingWdForm.controls['dyeingQuantity'].value)
    if (rowQuantity > 0) {
      if (dyeingQuantity > rowQuantity) {
        const ratio = (rowQuantity / dyeingQuantity) * 100
        const calcRatio = 100 - ratio
        if (calcRatio <= 10) {

        } else { 
          this.inputDyeingWdForm.controls['dyeingQuantity'].setErrors({ 'incorrect': null });
          this.inputDyeingWdForm.controls['dyeingQuantity'].updateValueAndValidity()
        }
      }
    } else {
      this.inputDyeingWdForm.controls['dyeingQuantity'].setErrors({ 'incorrect': null });
      this.inputDyeingWdForm.controls['dyeingQuantity'].updateValueAndValidity()
    }
  }

  async onUpdate() {
    this.inputDyeingWdForm.markAllAsTouched();
    if (this.inputDyeingWdForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfRegularForm(this.inputDyeingWdForm,
      ['colorId', 'colorName', 'colorCode', 'colorCategoryId'])
      this._constantsService.spinner.show()
      this._dyeingRequisitionDetailsWdService.update(formGroup.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({ id: this.requisitionId, dyeingid: this.selectedData?.dyeing_id });
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
         }
      })
    }
  }
}
