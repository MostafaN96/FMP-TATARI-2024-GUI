import { Component, Inject, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WdService } from "src/app/services/main/wd/wd.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { TransitionBetweenRequisitionWdService } from "src/app/services/main/wd/transition-between-requisition-wd.service";
import { ConsigmentDyeingService } from "src/app/services/main/consigment-dyeing.service";
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transition-between-dyers-wd',
  templateUrl: './add-transition-between-dyers-wd.component.html',
  styleUrls: ['./add-transition-between-dyers-wd.component.css']
})
export class AddTransitionBetweenDyersWdComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addtransitionDyersRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    fromDyeingId: new FormControl("", [Validators.required]),
    toDyeingId: new FormControl("", [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  consigments: any = []
  fabrics: any = []
  dyers: any = []
  currentQuantity: any = []
  notSelectedDyers: any
  fabricsDetails: any = []
  listFabricPrices: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "fabric_id", text: "fabric_name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "نوع القماش"

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('fabric_name', 'contains', e.text);
    predicate = predicate.or('fabric_code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

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

  // maps the appropriate column to fields property
  public fieldsNotSelectedDyeing: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textNotSelectedDyeing: string = "الى مصبغة"
  public onFilteringNotSelectedDyeing(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.notSelectedDyers, query);
  }

  // --------------- Consigments --------------
  // maps the appropriate column to fields property
  public fieldsConsigment: Object = { value: "id", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigment: string = "رقم الرسالة"

  public onFilteringConsigments(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigments[index], query);
  }

  constructor(
    private _consigmentDyeingService: ConsigmentDyeingService,
    private _reportWdService: ReportWdService,
    private _wdService: WdService,
    private _bussinessmanService: BussinessmanService,
    private _transitionBetweenRequisitionWdService: TransitionBetweenRequisitionWdService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectDyeingFromWd().subscribe((response: any) => {
      this.dyers = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fabricId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(null),
      fabricName: new FormControl(null),
      consigmentDyeingId: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.addtransitionDyersRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.addtransitionDyersRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listFabricPrices[index] = delete this.listFabricPrices[index];
    this.listFabricPrices.splice(index, 1);
  }

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics.indexOf(event.itemData)

    if (this.fabrics[indexData] !== event.itemData) {
      row.controls['fabricId'].setValue(null)
      row.controls['fabricCode'].setValue(null)
      row.controls['fabricName'].setValue(null)
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
      this.listFabricPrices[index] = []
    }
    else {
      this._wdService.selectConsigmentDyeingQuantityByFabricByDyeingWd(event.itemData.fabric_id, this.addtransitionDyersRequisitionForm.controls['fromDyeingId'].value!).subscribe((response: any) => {
        this.consigments[index] = response
      })

      let flag = true
      for (let i = 0; i < this.addtransitionDyersRequisitionForm.controls.items['controls'].length; i++) {
        if (this.addtransitionDyersRequisitionForm.controls.items['controls'][i].value.fabricId?.includes(event.itemData.fabric_id)) {
          row.controls['fabricId'].setValue(null)
          row.controls['fabricCode'].setValue(null)
          row.controls['quantity'].setValue(null)
          this.currentQuantity[index] = 0
          flag = false
        }
      }
      if (flag) {
        row.controls['fabricId'].setValue(event.itemData.fabric_id)
        row.controls['fabricCode'].setValue(event.itemData.fabric_code)
        row.controls['fabricName'].setValue(event.itemData.fabric_name)

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

  //  consigmentDyeing
  selectConsigment(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.consigments[index].includes(event.itemData)) {
      row.controls['price'].setValue("")
      row.controls['consigmentDyeingId'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
      this.listFabricPrices[index] = []
    } else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)

      // Get Prices
      this._reportWdService.selectPriceByFabricByDyeingByConsigmentDyeingInWd(
        row.controls['fabricId'].value, 
      this.addtransitionDyersRequisitionForm.controls['fromDyeingId'].value!,
      event.itemData.id).subscribe((response: any) => {
        this.fabricsDetails = response
        this.listFabricPrices[index] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails), this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails), this.fabricsDetails[0].latest_price]
      })
    }
  }

  //  Dyeing
  selectDyeing(event: { itemData: any; }) {
    if (!this.dyers.includes(event.itemData)) {
      this.addtransitionDyersRequisitionForm.controls['toDyeingId'].setValue("")
      this.addtransitionDyersRequisitionForm.controls['fromDyeingId'].setValue("")
      this.fabrics = []
      this.currentQuantity = []
      this.consigments = []
    }
    else {
      this._wdService.selectQuantityByDyeingWd(event.itemData.id).subscribe((response: any) => {
        this.fabrics = response
      })

      this._bussinessmanService.selectNotSelectedDyeing(event.itemData?.id).subscribe((response: any) => {
        this.notSelectedDyers = response
      })
    }
  }

  // To Dyeing
  selectToDyeing(event: { itemData: any; }) {
    if (!this.notSelectedDyers.includes(event.itemData)) {
      this.addtransitionDyersRequisitionForm.controls['toDyeingId'].setValue(null)
    }
  }

  onAddTransitionDyersRequisition() {
    this.addtransitionDyersRequisitionForm.markAllAsTouched();
    if (this.addtransitionDyersRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateQuantity(this.addtransitionDyersRequisitionForm.controls.items.value, 'fabricId', this.addtransitionDyersRequisitionForm.controls.items.value, 'fabricId', 'quantity', 'fabricName', 'validQuantity')) {
        const formGroup = this._sharedComponentService.deleteControlsOfFormArray(this.addtransitionDyersRequisitionForm, 'items',
          ['fabricName', 'fabricCode', 'validQuantity'])
        this._constantsService.spinner.show()
        this._transitionBetweenRequisitionWdService.add(formGroup.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[59]}/details`, { id: response.id });
            this._sharedComponentService.reloadPage();
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
  getTotalAmountQuantityInput(fabrics) {
    return fabrics.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount(fabrics) {
    return fabrics.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice(fabrics) {
    return this.getInputAmount(fabrics) / this.notZero(this.getTotalAmountQuantityInput(fabrics))
  }

  // AVG Price
  getOutputAmount(fabrics) {
    return fabrics.details.map(function (a) { return (a.input_output == '0') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getItemAmount(fabrics) {
    return this.getInputAmount(fabrics) - this.getOutputAmount(fabrics)
  }

  getAvgPrice(fabrics) {
    return this.getItemAmount(fabrics) / this.notZero(fabrics.current_quantity)
  }
}
