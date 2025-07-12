import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { WeAddRequisitionDetailsService } from "src/app/services/main/we/we-add-requisition-details.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-add-requisition-we',
  templateUrl: './update-add-requisition-we.component.html',
  styleUrls: ['./update-add-requisition-we.component.css']
})
export class UpdateAddRequisitionWeComponent implements OnInit {

  requisitionId!: string;
  colorCategories: any
  colors: any

  @Input() selectedData: any
  addRequisitionWeForm: FormGroup = new FormGroup({
    workOrderNumber: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    dyeingCode: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    colorId: new FormControl("", [Validators.required]),
    colorCode: new FormControl(""),
    colorCategoryId: new FormControl("", [Validators.required]),
    storagePlace: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  })

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
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors, query);
  }

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _weAddRequisitionDetailsService: WeAddRequisitionDetailsService,

    private _constantsService: ConstantsService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })


  }

  ngOnChanges() {
    this._colorCategoryService.selectAll().subscribe((response: any) => {
      this.colorCategories = response
    })
    this._colorService.selectAll().subscribe((response: any) => {
      this.colors = response
    })
    this.addRequisitionWeForm.controls['date'].setValue(this.selectedData?.date)
    this.addRequisitionWeForm.controls['workOrderNumber'].setValue(this.selectedData?.work_order_number_details)
    this.addRequisitionWeForm.controls['note'].setValue(this.selectedData?.note)
    this.addRequisitionWeForm.controls['price'].setValue(this.selectedData?.price)
    this.addRequisitionWeForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.addRequisitionWeForm.controls['quantity'].setValue(String(this.selectedData?.quantity))
    this.addRequisitionWeForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.addRequisitionWeForm.controls['dyeingCode'].setValue(this.selectedData?.dyeing_code)
    this.addRequisitionWeForm.controls['document'].setValue(this.selectedData?.document)
    this.addRequisitionWeForm.controls['storagePlace'].setValue(this.selectedData?.storage_place)
    this.addRequisitionWeForm.controls['statement'].setValue(this.selectedData?.statement)
    this.addRequisitionWeForm.controls['colorCategoryId'].setValue(this.selectedData?.color_category_id)
    this.addRequisitionWeForm.controls['colorCode'].setValue(this.selectedData?.color_code)
    this.addRequisitionWeForm.controls['colorId'].setValue(this.selectedData?.color_id)
  }

  // Color Category
  selectColorCategory(event: { itemData: any; }) {
    if (!this.colorCategories.includes(event.itemData)) {
      this.addRequisitionWeForm.controls['colorCategoryId'].setValue(null)
      this.addRequisitionWeForm.controls['colorId'].setValue(null)
      this.addRequisitionWeForm.controls['colorCode'].setValue(null)
    }
  }

  // Color
  selectColor(event: { itemData: any; }) {
    if (!this.colors.includes(event.itemData)) {
      this.addRequisitionWeForm.controls['colorId'].setValue(null)
      this.addRequisitionWeForm.controls['colorCode'].setValue(null)
    }
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.addRequisitionWeForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.addRequisitionWeForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.addRequisitionWeForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(this.addRequisitionWeForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.addRequisitionWeForm.markAllAsTouched();
    if (this.addRequisitionWeForm.valid) {
      this._constantsService.spinner.show()
      this._weAddRequisitionDetailsService.update(this.addRequisitionWeForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.requisitionId);
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.transportWaWbQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else {
            this._constantsService.userErrorMessage()
          }
        }
      })

    }
  }
}
