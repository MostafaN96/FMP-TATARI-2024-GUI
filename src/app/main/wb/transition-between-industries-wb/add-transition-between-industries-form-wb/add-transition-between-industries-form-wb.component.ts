import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { WbTransitionBetweenIndustriesRequisitionDetailsService } from "src/app/services/main/wb/wb-transition-between-industries-requisition-details.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { WbService } from "src/app/services/main/wb/wb.service";
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ActivatedRoute } from '@angular/router';
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transition-between-industries-form-wb',
  templateUrl: './add-transition-between-industries-form-wb.component.html',
  styleUrls: ['./add-transition-between-industries-form-wb.component.css']
})
export class AddTransitionBetweenIndustriesFormWbComponent implements OnInit {

  @Input() parentData: any | undefined;
  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addtransitionIndustriesRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    fromIndustryId: new FormControl(null, [Validators.required]),
    toIndustryId: new FormControl(null, [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  lots: any = []
  yarns: any = []
  fabrics: any = []
  consigmentsYarns: any = []
  currentQuantity: any = []
  yarnsDetails: any
  getListYarnPrices: any = []
  listYarnPrices: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الخيط"

  public onFilteringYarnName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarns, query);
  }

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "القماش المراد تصنيعه"

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

  // --------------- Lot --------------
  // maps the appropriate column to fields property
  public fieldsLot: Object = { value: "id", text: "code" };
  // set the placeholder to the AutoComplete input
  public textLot: string = "اللوط"

  public onFilteringLot(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarns, query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "id", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentYarn(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigmentsYarns[index], query);
  }

  constructor(
    private _reportWbService: ReportWbService,
    private _wbService: WbService,
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _wbTransitionBetweenIndustriesRequisitionDetailsService: WbTransitionBetweenIndustriesRequisitionDetailsService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _fabricService: FabricService,
    private route: ActivatedRoute,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData(this.parentData)
  }

  getData(parentData) {
    this.route.queryParams.subscribe(params => {
      this.addtransitionIndustriesRequisitionForm.controls.id.setValue(params['id'])
    })

    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })

    this._yarnService.selectByIndustryWb(parentData[0]).subscribe((response: any) => {
      this.yarns = response
    })
    this.addtransitionIndustriesRequisitionForm.controls.fromIndustryId.setValue(parentData[0])
    this.addtransitionIndustriesRequisitionForm.controls['toIndustryId'].setValue(parentData[1])

  }


  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl("", [Validators.required]),
      yarnCode: new FormControl(null),
      yarnLotId: new FormControl(null, [Validators.required]),
      consigmentYarnId: new FormControl("", [Validators.required]),
      fabricToBeManufacturedId: new FormControl(null, [Validators.required]),
      fabricCode: new FormControl(null),
      price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.addtransitionIndustriesRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.addtransitionIndustriesRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
  }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns.indexOf(event.itemData)

    if (this.yarns[indexData] !== event.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['yarnLotId'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {

      this._yarnLotService.selectByIndustryByYarnWb(this.addtransitionIndustriesRequisitionForm.controls['fromIndustryId'].value!, event.itemData.id).subscribe((response: any) => {
        this.lots = response

        if (this.lots[0] != null) {
          row.controls['yarnLotId'].setValue(this.lots[0].id)
          this.getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(
            this.addtransitionIndustriesRequisitionForm.controls['fromIndustryId'].value!,
            event.itemData.id,
            this.lots[0].id,
            index
          )
        }
      })

      // Get Prices
      this._reportWbService.selectPriceInWb(event.itemData.id, this.addtransitionIndustriesRequisitionForm.controls['fromIndustryId'].value!).subscribe((response: any) => {
        this.yarnsDetails = response
        this.listYarnPrices[index] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails), this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), this.yarnsDetails[0].latest_price]
      })

      let flag = true
      for (let i = 0; i < this.addtransitionIndustriesRequisitionForm.controls.items['controls'].length; i++) {
        if (this.addtransitionIndustriesRequisitionForm.controls.items['controls'][i].value.yarnId?.includes(event.itemData.id)) {
          row.controls['yarnLotId'].setValue("")
          row.controls['yarnId'].setValue("")
          row.controls['yarnCode'].setValue("")
          row.controls['quantity'].setValue("")
          this.currentQuantity[index] = 0
          flag = false
        }
      }
      if (flag) {
        row.controls['yarnId'].setValue(event.itemData.id)
        row.controls['yarnCode'].setValue(event.itemData.code)
      }
    }
    this.validate(row, index)
  }

  validate(row: FormGroup, index) {
    if (parseFloat(row.controls['quantity'].value) > parseFloat(this.currentQuantity[index])) {
      row.controls['quantity'].setErrors({ 'incorrect': true });
    }
    else {
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  //  Fabric
  selectFabric(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.fabrics.indexOf(index.itemData)
    if (this.fabrics[indexData] !== index.itemData) {
      row.controls['fabricToBeManufacturedId'].setValue(null)
      row.controls['fabricCode'].setValue(null)
    }
    else {
      row.controls['fabricCode'].setValue(index.itemData.code)
    }
  }

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots.indexOf(event.itemData)
    if (this.lots[indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      row.controls['consigmentYarnId'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      this.getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(
        this.addtransitionIndustriesRequisitionForm.controls['fromIndustryId'].value!,
        row.controls['yarnId'].value!,
        event.itemData.id,
        index
      )
    }
  }

  getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(industryId: string, yarnId: string, lotId: string, index) {
    this._wbService.selectConsigmentYarnQuantityByYarnByIndustryByLotWb(
      yarnId,
      industryId,
      lotId
    ).subscribe((response: any) => {
      this.consigmentsYarns[index] = response
    })
  }
  // End Yarn Autocomplete Section

  // Start Consigment Yarn Autocomplete Section
  //  Consigment Yarn
  selectConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.consigmentsYarns[index].indexOf(event.itemData)
    if (this.consigmentsYarns[index][indexData] !== event.itemData) {
      row.controls['consigmentYarnId'].setValue(null)
      row.controls['validQuantity'].setValue(null)
      this.currentQuantity[index] = 0
    }
    else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)
    }
  }
  // End Consigment Yarn Autocomplete Section

  async onAddTransitionIndustriesRequisition() {
    this.addtransitionIndustriesRequisitionForm.markAllAsTouched();
    if (this.addtransitionIndustriesRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantity(
        this.addtransitionIndustriesRequisitionForm.controls.items.value, this.addtransitionIndustriesRequisitionForm.controls.items.value,
        'consigmentYarnId', 'consigmentYarnId',
        'yarnLotId', 'yarnLotId',
        'yarnId', 'yarnId',
        'quantity', 'yarnName', 'validQuantity')) {
        const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addtransitionIndustriesRequisitionForm, 'items',
          ['yarnCode', 'fabricCode'])
        this._constantsService.spinner.show()
        this._wbTransitionBetweenIndustriesRequisitionDetailsService.add(formGroup.value).subscribe(response => {
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
          }
        });
      }
    }
  }

  //  Get Average Inputes Price
  notZero(n) {
    n = +n;  // Coerce to number.
    if (!n) {  // Matches +0, -0, NaN
      n = 1
    }
    return n;
  }

  // Get Avg Inputes Price
  getTotalAmountQuantityInput(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice(yarns) {
    return this.getInputAmount(yarns) / this.notZero(this.getTotalAmountQuantityInput(yarns))
  }

  // AVG Price
  getOutputAmount(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '0') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getItemAmount(yarns) {
    return this.getInputAmount(yarns) - this.getOutputAmount(yarns)
  }

  getAvgPrice(yarns) {
    return this.getItemAmount(yarns) / this.notZero(yarns.current_quantity)
  }
}
