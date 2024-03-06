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
import { FormDyeingRequisitionDetailsWdService } from "src/app/services/main/wd/form-dyeing-requisition-details-wd.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-form-dyeing-requisition-wd',
  templateUrl: './update-form-dyeing-requisition-wd.component.html',
  styleUrls: ['./update-form-dyeing-requisition-wd.component.css']
})
export class UpdateFormDyeingRequisitionWdComponent implements OnInit {

  requisitionId!: string;
  quantityWithWaste = 0
  colorCategories: any = []
  colors: any = []

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
    colorCategoryId: new FormControl(null, [Validators.required]),
    dyeingColorsPricesId: new FormControl(null, [Validators.required]),
    dyeingId: new FormControl(null, [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    colorName: new FormControl("", [Validators.required]),
    colorCode: new FormControl(""),
    workOrderNumber: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    fabricWidth: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricQuantityM2: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _formDyeingRequisitionDetailsWdService: FormDyeingRequisitionDetailsWdService,
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
  }

  ngOnChanges() {
    this._colorCategoryService.selectByDeying(this.selectedData?.dyeing_id).subscribe((response: any) => {
      this.colorCategories = response
    })
    this._colorService.selectByCategoryAndDeying(this.selectedData?.dyeing_id, this.selectedData?.color_category_id).subscribe((response: any) => {
      this.colors = response

      this.inputDyeingWdForm.controls['note'].setValue(this.selectedData?.note)
      this.inputDyeingWdForm.controls['date'].setValue(this.selectedData?.date)
      this.inputDyeingWdForm.controls['price'].setValue(this.selectedData?.price)
      this.inputDyeingWdForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
      this.inputDyeingWdForm.controls['workOrderNumber'].setValue(String(this.selectedData?.work_order_number))
      this.inputDyeingWdForm.controls['fabricWidth'].setValue(this.selectedData?.fabric_width)
      this.inputDyeingWdForm.controls['fabricQuantityM2'].setValue(this.selectedData?.fabric_quantity_m2)
      this.inputDyeingWdForm.controls['document'].setValue(this.selectedData?.document)
      this.inputDyeingWdForm.controls['dyeingId'].setValue(this.selectedData?.dyeing_id)
      this.inputDyeingWdForm.controls['colorName'].setValue(this.selectedData?.color_name_price)
      this.inputDyeingWdForm.controls['colorCode'].setValue(this.selectedData?.color_code)
      this.inputDyeingWdForm.controls['colorCategoryId'].setValue(this.selectedData?.color_category_id)
      this.inputDyeingWdForm.controls['dyeingColorsPricesId'].setValue(this.selectedData?.dyeing_colors_prices_id)

    })


  }

  // Color Category
  selectColorCategory(event: { itemData: any; }) {

    if (!this.colorCategories.includes(event.itemData)) {
      this.inputDyeingWdForm.controls['colorCategoryId'].setValue("")
      this.inputDyeingWdForm.controls['colorCode'].setValue("")
      this.inputDyeingWdForm.controls['colorName'].setValue("")
      this.inputDyeingWdForm.controls['dyeingColorsPricesId'].setValue("")
      this.colors = []
    }
    else {
      this._colorService.selectByCategoryAndDeying(this.selectedData?.dyeing_id, event.itemData.id).subscribe((response: any) => {
        this.colors = response
        this.inputDyeingWdForm.controls['colorCode'].setValue("")
        this.inputDyeingWdForm.controls['colorName'].setValue("")
        this.inputDyeingWdForm.controls['dyeingColorsPricesId'].setValue("")
      })
    }
  }

  // Color
  selectColor(event: { itemData: any; }) {
    console.log(event);
    
    if (!this.colors.includes(event.itemData)) {
      this.inputDyeingWdForm.controls['colorCode'].setValue("")
      this.inputDyeingWdForm.controls['colorName'].setValue("")
      this.inputDyeingWdForm.controls['dyeingColorsPricesId'].setValue("")
    }
    else {
      this.inputDyeingWdForm.controls['colorCode'].setValue(event.itemData.code)
      this.inputDyeingWdForm.controls['dyeingColorsPricesId'].setValue(event.itemData.dyeing_colors_prices_id)
    }
  }

  async onUpdate() {
    this.inputDyeingWdForm.markAllAsTouched();
    if (this.inputDyeingWdForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfRegularForm(this.inputDyeingWdForm,
        ['colorName', 'colorCode', 'colorCategoryId'])
        
      this._constantsService.spinner.show()
      this._formDyeingRequisitionDetailsWdService.update(formGroup.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.requisitionId);
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
        }
      })
    }
  }
}
