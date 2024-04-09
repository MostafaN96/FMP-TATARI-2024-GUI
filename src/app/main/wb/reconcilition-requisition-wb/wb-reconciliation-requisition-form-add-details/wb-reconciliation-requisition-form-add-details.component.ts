import { Component, Input, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { ReconcilitionRequisitionDetailsWbService } from "src/app/services/main/wb/reconcilition-requisition-details-wb.service";
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { WbService } from "src/app/services/main/wb/wb.service";
import { FabricService } from "src/app/services/main/fabric.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-wb-reconciliation-requisition-form-add-details',
  templateUrl: './wb-reconciliation-requisition-form-add-details.component.html',
  styleUrls: ['./wb-reconciliation-requisition-form-add-details.component.css']
})
export class WbReconciliationRequisitionFormAddDetailsComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  reconcilitionRequisitionForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    industryId: new FormControl("", [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  @Input() selectedData: any
  yarns: any = []
  lots: any = []
  fabrics:any = []
  consigmentsYarns: any = []
  currentQuantity: any = []
  yarnsDetails: any
  listYarnPrices: any = []
  listYarnPricesDollar: any = []
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

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textFabric: string = "القماش المراد تصنيعه"

  public onFilteringFabricName (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fabrics, query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "id", text:"number"};
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentYarn (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.consigmentsYarns, query);
  }

  constructor(
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _wbService: WbService,
    private _reconcilitionRequisitionDetailsWbService: ReconcilitionRequisitionDetailsWbService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    private _reportWbService: ReportWbService,
    private _fabricService: FabricService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getData()
  }

  getData() {
    this.reconcilitionRequisitionForm.controls.id.setValue(this.selectedData[0]['requisition_id'])
    this.reconcilitionRequisitionForm.controls.industryId.setValue(this.selectedData[0]['industry_id'])

    this._yarnService.selectByIndustryWb(this.selectedData[0]['industry_id']).subscribe((response: any) => {
      this.yarns = response
    })

    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl("", [Validators.required]),
      yarnName: new FormControl(""),
      yarnCode: new FormControl(""),
      yarnLotId: new FormControl("", [Validators.required]),
      consigmentYarnId: new FormControl("", [Validators.required]),
      fabricToBeManufacturedId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
      inputOutput: new FormControl('1', [Validators.required]),
    });
  }

  addItem() {
    const control = <FormArray>this.reconcilitionRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.reconcilitionRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
    this.listYarnPricesDollar[index] = delete this.listYarnPricesDollar[index];
    this.listYarnPricesDollar.splice(index, 1);
  }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns.indexOf(event.itemData)

    if (this.yarns[indexData] !== event.itemData) {
      row.controls['yarnId'].setValue(null)
      row.controls['yarnCode'].setValue(null)
      row.controls['yarnLotId'].setValue(null)
      row.controls['consigmentYarnId'].setValue("")
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['yarnCode'].setValue(event.itemData.code)
      row.controls['yarnName'].setValue(event.itemData.name)

      this._yarnLotService.selectByIndustryByYarnWb(
        this.reconcilitionRequisitionForm.controls['industryId'].value!,
        event.itemData.id
        ).subscribe((response: any) => {
        this.lots = response
      })

      // Get Prices
      this._reportWbService.selectPriceInWb(event.itemData.id, event.itemData.industry_id).subscribe((response: any) => {
        this.yarnsDetails = response
        this.listYarnPrices[index] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails), this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), this.yarnsDetails[0].latest_price]
        this.listYarnPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this.yarnsDetails[0].latest_price_dollar]
        row.controls['price'].setValue(this.yarnsDetails[0].latest_price)
        row.controls['priceDollar'].setValue(this.yarnsDetails[0].latest_price_dollar)
      })
    }
    this.validate(row, index)
  }

  validate(row: FormGroup, index) {
    if(row.controls['inputOutput'].value == 1) {
      row.controls['fabricToBeManufacturedId'].addValidators([Validators.required])
    } else {
      row.controls['fabricToBeManufacturedId'].removeValidators([Validators.required])
    }
    row.controls['fabricToBeManufacturedId'].updateValueAndValidity()

    if ((parseFloat(row.controls['quantity'].value) > parseFloat(this.currentQuantity[index])) && !+row.controls['inputOutput'].value) {
      row.controls['quantity'].setErrors({ 'incorrect': true });
    }
    else {
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots.indexOf(event.itemData)
    if (this.lots[indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      this.currentQuantity[index] = 0
    } else {
      this._wbService.selectConsigmentYarnQuantityByYarnByIndustryByLotWb(
        row.controls['yarnId'].value!,
        this.reconcilitionRequisitionForm.controls['industryId'].value!, 
        event.itemData.id
        ).subscribe((response: any) => {
          this.consigmentsYarns = response
        })
    }
  }
  // End Yarn Lot Autocomplete Section

  // Start Consigment Yarn Autocomplete Section
  //  Consigment Yarn
  selectConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.consigmentsYarns.indexOf(event.itemData)
    if (this.consigmentsYarns[indexData] !== event.itemData) {
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

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue("0")
    } else if (type == "priceDollar") {
      row.controls['price'].setValue("0")
    }
  }

  async onReconcilitionRequisition() {
    this.reconcilitionRequisitionForm.markAllAsTouched();
    if (this.reconcilitionRequisitionForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.reconcilitionRequisitionForm, 'items',
          ['yarnName', 'yarnCode', 'fabricCode', 'validQuantity'])
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionDetailsWbService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({ id: this.selectedData[0]['requisition_id']});
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
