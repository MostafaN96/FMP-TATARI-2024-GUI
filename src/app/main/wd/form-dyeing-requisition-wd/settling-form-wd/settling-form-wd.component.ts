import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { FormDyeingRequisitionDetailsWdService } from "src/app/services/main/wd/form-dyeing-requisition-details-wd.service";
import { SettlingFormWdService } from "src/app/services/main/wd/settling-form-wd.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

// Child Components
import { CurrentStockFormDyeingWdComponent } from "../../reports/current-stock-form-dyeing-wd/current-stock-form-dyeing-wd.component";

@Component({
  selector: 'app-settling-form-wd',
  templateUrl: './settling-form-wd.component.html',
  styleUrls: ['./settling-form-wd.component.css']
})
export class SettlingFormWdComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  settlingForm = new FormGroup({
    dyeingId: new FormControl(null, [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  // Child Components
  @ViewChild('currentStockReport') currentStockReport!: CurrentStockFormDyeingWdComponent;

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];

  ///////////////////////////////// General ////////////////////////////////////////////////
  dyers: any
  isShowAdd = true

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

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

  constructor(
    private _bussinessmanService: BussinessmanService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _formDyeingRequisitionDetailsWdService: FormDyeingRequisitionDetailsWdService,
    private _settlingFormWdService: SettlingFormWdService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectDyerDyeing().subscribe((response: any) => {
      this.dyers = response
    })
  }

  // Initialize Form Builder
  getSelectedIndex(objectData: any) {
    if (this.selectArrayValues.includes(objectData)) {
      let index = this.selectArrayValues.indexOf(objectData);
      this.selectArrayValues[index] = delete this.selectArrayValues[index];
      this.selectArrayValues.splice(index, 1);

      let indexData = this.currentStockReport.formDyeingFabricsByDyer.indexOf(objectData)
      this.removeItem(indexData)
    }
    else {
      this.selectArrayValues.push(objectData);
      this.addItem(objectData)
    }
  }

  // Initialize Form Builder
  initItem(data: any, index) {
    return new FormGroup({
      index: new FormControl(index),
      wdFormDyeingRequisitionDetailsId: new FormControl(data.id, [Validators.required]),
      wdFormDyeingOrderRequisitionDetailsId: new FormControl(data.wd_form_dyeing_order_requisition_details_id),
      fabricName: new FormControl(data.fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      fabricCode: new FormControl(data.fabric_code),
      consigmentDyeingNumber: new FormControl(data.consigment_dyeing_number, [Validators.required]),
      dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      dyedFabricCode: new FormControl(data.dyed_fabric_code),
      colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorCode: new FormControl(data.color_code),
      price: new FormControl(data.price, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(String(data.current_quantity), [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity),
      fabricWidth: new FormControl(data.fabric_width, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      fabricQuantityM2: new FormControl(data.fabric_quantity_m2, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    });
  }

  addItem(data: any) {
    let index = this.currentStockReport.formDyeingFabricsByDyer.indexOf(data)
    const control = <FormArray>this.settlingForm.get('items');
    control.push(this.initItem(data, index));
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.settlingForm.get('items');
    for (let i = 0; i < control.value.length; i++) {
      const element = control.value[i];
      if (element.index == index) {
        control.removeAt(i)
      }
    }
  }


  validate(row: FormGroup) {
    if ((parseFloat(row.controls['quantity'].value) > parseFloat(row.controls['validQuantity'].value)) && !+row.controls['inputOutput']) {
      row.controls['quantity'].setErrors({ 'incorrect': true });
    }
    else {
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  //  Dyeing
  selectDyeing(event: { itemData: any; }) {
    if (this.dyers.includes(event.itemData)) {
      this._formDyeingRequisitionDetailsWdService.selectByDyeing(event.itemData.id).subscribe((response: any) => {
        this.currentStockReport.formDyeingFabricsByDyer = response
        this.currentStockReport.isShowCheckBox = true
        this.currentStockReport.listen();
      })
    }
    else {
      this.settlingForm.controls['dyeingId'].setValue(null)

      const formGroup = <FormGroup>this.settlingForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));
      // this.settlingForm.controls.items = new FormArray([])
    }
  }

  async onSettlingForm() {
    this.isShowAdd = false

    this.settlingForm.markAllAsTouched();
    if (this.settlingForm.valid && this.settlingForm.controls.items.value.length > 0) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.settlingForm, 'items',
        ['index', 'fabricName', 'fabricCode', 'dyedFabricName',
          'dyedFabricId', 'dyedFabricCode', 'colorCategoryName',
          'colorName', 'colorCode',
          'dyeingFee', 'dyeingQuantity', 'price', 'validQuantity',
          'numberFabricPieces', 'fabricWidth',
          'fabricQuantityM2', 'consigmentDyeingNumber'])
      this._constantsService.spinner.show()
      this._settlingFormWdService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
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
          this.isShowAdd = true
        }
      });
    } else {
      this.isShowAdd = true
    }
  }
}
