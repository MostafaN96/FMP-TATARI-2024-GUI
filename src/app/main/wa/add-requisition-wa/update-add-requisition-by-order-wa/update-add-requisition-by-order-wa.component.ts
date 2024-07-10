import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { WaAddRequisitionDetailsService } from "src/app/services/main/wa/wa-add-requisition-details.service";
import { ActivatedRoute } from '@angular/router';
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-add-requisition-by-order-wa',
  templateUrl: './update-add-requisition-by-order-wa.component.html',
  styleUrls: ['./update-add-requisition-by-order-wa.component.css']
})
export class UpdateAddRequisitionByOrderWaComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  requisitionId!: string;
  suppliers: any

  @Input() selectedData: any
  addRequisitionWaForm: FormGroup = new FormGroup({
    // supplierId: new FormControl('', [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  })

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;
  // --------------- Supplier --------------
  // maps the appropriate column to fields property
  public fieldsSupplier: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textSupplier: string = "المورد"

  public onFilteringSupplier(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.suppliers, query);
  }

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _waAddRequisitionDetailsService: WaAddRequisitionDetailsService,
    private _constantsService: ConstantsService,
    private _supplierService: BussinessmanService,
  ) {
    this.getData();
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  getData() {
    this._supplierService.selectSupplier().subscribe((response: any) => {
      this.suppliers = response
    })
  }


  ngOnChanges() {
    this.addRequisitionWaForm.controls['date'].setValue(this.selectedData?.date)
    this.addRequisitionWaForm.controls['price'].setValue(this.selectedData?.price)
    this.addRequisitionWaForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.addRequisitionWaForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.addRequisitionWaForm.controls['document'].setValue(this.selectedData?.document)
    this.addRequisitionWaForm.controls['statement'].setValue(this.selectedData?.statement)
    // this.fieldsSupplier.text = this.selectedData?.supplier_name
    // this.addRequisitionWaForm.controls['supplierId'].setValue(this.selectedData?.supplier_id)
    this.addRequisitionWaForm.controls['note'].setValue(this.selectedData?.note)
  }

  // Start Supplier Autocomplete Section
  //  Supplier
  selectSupplier(event: { itemData: any; }) {
    if (!this.suppliers.includes(event.itemData)) {
      // this.addRequisitionWaForm.controls['supplierId'].setValue(null)
    }
  }
  // End Supplier Autocomplete Section

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.addRequisitionWaForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.addRequisitionWaForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.addRequisitionWaForm.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(this.addRequisitionWaForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.addRequisitionWaForm.markAllAsTouched();
    if (this.addRequisitionWaForm.valid) {
      this._constantsService.spinner.show()
      this._waAddRequisitionDetailsService.updateByOrder(this.addRequisitionWaForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.requisitionId);
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.quantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else {
            this._constantsService.userErrorMessage()
          }
        }
      })
    }
  }
}

