import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { WeService } from "src/app/services/main/we/we.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-current-stock-report-we',
  templateUrl: './update-current-stock-report-we.component.html',
  styleUrls: ['./update-current-stock-report-we.component.css']
})
export class UpdateCurrentStockReportWeComponent implements OnInit {

  @Input() selectedData: any
  weForm: FormGroup = new FormGroup({
    requisitionDetailsId: new FormControl(null, [Validators.required]),
    weId: new FormControl(null),
    formDyeingOrderDetailsId: new FormControl(null),
    colorId: new FormControl(null, [Validators.required]),
    colorCode: new FormControl(null),
    colorCategoryId: new FormControl(null, [Validators.required]),
    dyeingColorPricesId: new FormControl(null),
    storagePlace: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    note1: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    note2: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    // items: new FormArray([]),
  })

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
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _weService: WeService,
    private _constantsService: ConstantsService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.selectedData);
    if (this.selectedData?.wd_form_dyeing_requisition_details_id != 'null') {
      this._colorCategoryService.selectByDeying(this.selectedData?.supplier_id).subscribe((response: any) => {
        this.colorCategories = response
      })

      this._colorService.selectByCategoryAndDeying(this.selectedData?.supplier_id, this.selectedData?.color_category_id).subscribe((responseColor: any) => {
        this.colors = responseColor
      })
    } else {
      this._colorCategoryService.selectAll().subscribe((response: any) => {
        this.colorCategories = response
      })
      this._colorService.selectAll().subscribe((responseColor: any) => {
        this.colors = responseColor
      })
    }


    this.weForm.controls['requisitionDetailsId'].setValue(this.selectedData?.requisition_details_id)
    this.weForm.controls['storagePlace'].setValue(this.selectedData?.storage_place)
    this.weForm.controls['note1'].setValue(this.selectedData?.note1)
    this.weForm.controls['note2'].setValue(this.selectedData?.note2)
    this.weForm.controls['colorId'].setValue(this.selectedData?.color_id)
    this.weForm.controls['colorCode'].setValue(this.selectedData?.color_code)
    this.weForm.controls['colorCategoryId'].setValue(this.selectedData?.color_category_id)
    this.weForm.controls['dyeingColorPricesId'].setValue(this.selectedData?.dyeing_colors_prices_id)
    this.weForm.controls['weId'].setValue(this.selectedData?.we_id)
    this.weForm.controls['wdFormDyeingRequisitionDetailsId'].setValue(this.selectedData?.wd_form_dyeing_requisition_details_id)
  }

  initItem(data) {
    return new FormGroup({
      we_id: new FormControl(data.we_id),
      dyeing_colors_prices_id: new FormControl(data.dyeing_colors_prices_id),
      wd_form_dyeing_requisition_details_id: new FormControl(data.wd_form_dyeing_requisition_details_id),
    });
  }

  addItem(data) {
    const control = <FormArray>this.weForm.get('items');
    control.push(this.initItem(data));
  }

  // Color Category
  selectColorCategory(event: { itemData: any; }) {
    if (!this.colorCategories.includes(event.itemData)) {
      this.weForm.controls['colorCategoryId'].setValue(null)
      this.weForm.controls['colorId'].setValue(null)
      this.weForm.controls['colorCode'].setValue(null)
      this.colors = []
    }
    else {
      this._colorService.selectByCategoryAndDeying(this.selectedData?.supplier_id, event.itemData.id).subscribe((response: any) => {
        this.colors = response

        this.weForm.controls['colorId'].setValue("")
        this.weForm.controls['colorCode'].setValue("")
        this.weForm.controls['dyeingColorPricesId'].setValue("")
      })
    }
  }

  // Color
  selectColor(event: { itemData: any; }) {
    if (!this.colors.includes(event.itemData)) {
      this.weForm.controls['colorId'].setValue("")
      this.weForm.controls['colorCode'].setValue("")
      this.weForm.controls['dyeingColorPricesId'].setValue("")
    }
    else {
      this.weForm.controls['colorCode'].setValue(event.itemData.code)
      this.weForm.controls['dyeingColorPricesId'].setValue(event.itemData.dyeing_color_prices_id)
    }
  }

  onUpdate() {
    this.weForm.markAllAsTouched();
    if (this.weForm.valid) {
      this._constantsService.spinner.show()
      this._weService.updateWEData(this.weForm.value).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPage();
        }
        else {
          this._constantsService.userErrorMessage()
        }
      })

    }
  }

}
