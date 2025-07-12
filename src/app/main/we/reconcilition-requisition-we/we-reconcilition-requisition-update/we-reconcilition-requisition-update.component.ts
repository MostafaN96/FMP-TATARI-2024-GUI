import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { ReconcilitionRequisitionDetailsWeService } from "src/app/services/main/we/reconcilition-requisition-details-we.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-we-reconcilition-requisition-update',
  templateUrl: './we-reconcilition-requisition-update.component.html',
  styleUrls: ['./we-reconcilition-requisition-update.component.css']
})
export class WeReconcilitionRequisitionUpdateComponent implements OnInit {

  requisitionId!: string;
  colorCategories: any
  colors: any

  @Input() selectedData: any
  reconcilitionRequisitionWEForm: FormGroup = new FormGroup({
    workOrderNumber: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    colorId: new FormControl("", [Validators.required]),
    colorCode: new FormControl(""),
    colorCategoryId: new FormControl("", [Validators.required]),
    inputOutput: new FormControl("", [Validators.required]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
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
    private _reconcilitionRequisitionDetailsWeService: ReconcilitionRequisitionDetailsWeService,
    private _sessionManagerService: SessionManagerService,
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
    this.reconcilitionRequisitionWEForm.controls['date'].setValue(this.selectedData?.date)
    this.reconcilitionRequisitionWEForm.controls['workOrderNumber'].setValue(this.selectedData?.work_order_number)
    this.reconcilitionRequisitionWEForm.controls['note'].setValue(this.selectedData?.note)
    this.reconcilitionRequisitionWEForm.controls['price'].setValue(this.selectedData?.price)
    this.reconcilitionRequisitionWEForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.reconcilitionRequisitionWEForm.controls['quantity'].setValue(String(this.selectedData?.quantity))
    this.reconcilitionRequisitionWEForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.reconcilitionRequisitionWEForm.controls['statement'].setValue(this.selectedData?.statement)
    this.reconcilitionRequisitionWEForm.controls['colorCategoryId'].setValue(this.selectedData?.color_category_id)
    this.reconcilitionRequisitionWEForm.controls['colorCode'].setValue(this.selectedData?.color_code)
    this.reconcilitionRequisitionWEForm.controls['colorId'].setValue(this.selectedData?.color_id)
    this.reconcilitionRequisitionWEForm.controls['inputOutput'].setValue(String(this.selectedData?.input_output))
  }

  // Color Category
  selectColorCategory(event: { itemData: any; }) {
    if (!this.colorCategories.includes(event.itemData)) {
      this.reconcilitionRequisitionWEForm.controls['colorCategoryId'].setValue(null)
      this.reconcilitionRequisitionWEForm.controls['colorId'].setValue(null)
      this.reconcilitionRequisitionWEForm.controls['colorCode'].setValue(null)
    }
  }

  // Color
  selectColor(event: { itemData: any; }) {
    if (!this.colors.includes(event.itemData)) {
      this.reconcilitionRequisitionWEForm.controls['colorId'].setValue(null)
      this.reconcilitionRequisitionWEForm.controls['colorCode'].setValue(null)
    }
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.reconcilitionRequisitionWEForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.reconcilitionRequisitionWEForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.reconcilitionRequisitionWEForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(this.reconcilitionRequisitionWEForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.reconcilitionRequisitionWEForm.markAllAsTouched();
    if (this.reconcilitionRequisitionWEForm.valid) {
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionDetailsWeService.update(this.reconcilitionRequisitionWEForm.value, this.selectedData.id).subscribe((response: any) => {
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
