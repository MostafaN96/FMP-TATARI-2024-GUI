import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { DeliveryCarService } from "src/app/services/main/delivery-car.service";

// Call Service
import { SellRequisitionDetalisWeService } from "src/app/services/main/we/sell-requisition-detalis-we.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-sell-requisition-we',
  templateUrl: './update-sell-requisition-we.component.html',
  styleUrls: ['./update-sell-requisition-we.component.css']
})
export class UpdateSellRequisitionWeComponent implements OnInit {

  requisitionId!: string;
  deliveryCars: any

  @Input() selectedData: any
  sellRequisitionWeForm: FormGroup = new FormGroup({
    weSellRequisitionId: new FormControl(null, [Validators.required]),
    deliveryCarId: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;
  // --------------- Delivery Car --------------
  // maps the appropriate column to fields property
  public fieldsDeliveryCars: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDeliveryCars: string = "اسم السائق"

  public onFilteringDeliveryCars(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('drivers_name', 'contains', e.text);
    predicate = predicate.or('plate_number', 'contains', e.text);
    predicate = predicate.or('national_id', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.deliveryCars, query);
  }

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _sellRequisitionDetalisWeService: SellRequisitionDetalisWeService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
    private _deliveryCarService: DeliveryCarService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  ngOnChanges() {
    this._deliveryCarService.selectAll().subscribe((response: any) => {
      this.deliveryCars = response
    })

    this.sellRequisitionWeForm.controls['weSellRequisitionId'].setValue(this.selectedData?.requisition_id)
    this.sellRequisitionWeForm.controls['deliveryCarId'].setValue(this.selectedData?.delivery_car_id)
    this.sellRequisitionWeForm.controls['date'].setValue(this.selectedData?.date)
    this.sellRequisitionWeForm.controls['note'].setValue(this.selectedData?.note)
    this.sellRequisitionWeForm.controls['price'].setValue(String(this.selectedData?.price))
    this.sellRequisitionWeForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.sellRequisitionWeForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.sellRequisitionWeForm.controls['document'].setValue(this.selectedData?.document)
    this.sellRequisitionWeForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  onUpdate() {
    this.sellRequisitionWeForm.markAllAsTouched();
    if (this.sellRequisitionWeForm.valid) {
      this._constantsService.spinner.show()
      this._sellRequisitionDetalisWeService.update(this.sellRequisitionWeForm.value, this.selectedData.id).subscribe((response: any) => {
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
