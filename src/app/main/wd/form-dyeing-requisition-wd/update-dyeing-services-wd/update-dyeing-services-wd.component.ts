import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { WdFormDyeingRequisitionDetailsDyeingServicesService } from "src/app/services/main/wd/wd-form-dyeing-requisition-details-dyeing-services.service";
import { DyeingRequisitionDetailsWdService } from "src/app/services/main/wd/dyeing-requisition-details-wd.service";
import { DyeingServicesService } from "src/app/services/main/dyeing-services.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-dyeing-services-wd',
  templateUrl: './update-dyeing-services-wd.component.html',
  styleUrls: ['./update-dyeing-services-wd.component.css']
})
export class UpdateDyeingServicesWdComponent implements OnInit {

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['select', 'name', 'price'];
  addedDyeingServiceSourceSearchTabel: any;
  addedDyeingServicesSelection = new SelectionModel(true);
  selectAddedDyeingServicesArrayValues: any[] = [];

  //
  @ViewChild('sortDyeingServicesColumns', { static: true }) sortDyeingServicesColumns!: MatSort;
  dyeingServiceSourcesSearchTabel: any;
  dyeingServicesSelection = new SelectionModel(true);
  selectDyeingServicesArrayValues: any[] = [];

  requisitionId!: string;
  quantityWithWaste = 0
  addedDyeingServices = []
  notInDyeingServices = []
  @Input() selectedData: any
  dyeingServicesWdForm: FormGroup = new FormGroup({
    wdFormDyeingRequisitionDetailsId: new FormControl("", [Validators.required]),
    fabricId: new FormControl("", [Validators.required]),
    consigmentDyeingId: new FormControl("", [Validators.required]),
    dyeingId: new FormControl("", [Validators.required]),
    newDyeingServices: new FormControl(null),
    deletedDyeingServices: new FormControl(null),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _wdFormDyeingRequisitionDetailsDyeingServicesService: WdFormDyeingRequisitionDetailsDyeingServicesService,
    private _dyeingRequisitionDetailsWdService: DyeingRequisitionDetailsWdService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
    private _dyeingServicesService: DyeingServicesService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.sortColumns.sort(({ id: 'name', start: 'asc' }) as MatSortable);
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  ngOnChanges() {
    // console.log("this.selectedData ::: ", this.selectedData);


    this.getData(this.selectedData)
    this.dyeingServicesWdForm.controls['wdFormDyeingRequisitionDetailsId'].setValue(this.selectedData?.wd_form_dyeing_requisition_details_id)
    this.dyeingServicesWdForm.controls['fabricId'].setValue(this.selectedData?.fabric_id)
    this.dyeingServicesWdForm.controls['dyeingId'].setValue(this.selectedData?.dyeing_id)
    this.dyeingServicesWdForm.controls['consigmentDyeingId'].setValue(this.selectedData?.consigment_dyeing_id)
  }

  getData(data) {
    this._dyeingServicesService.selectAdded(data?.wd_form_dyeing_requisition_details_id).subscribe((response: any) => {
      this.addedDyeingServices = response

      this.addedDyeingServiceSourceSearchTabel = new MatTableDataSource(this.addedDyeingServices);
      this.addedDyeingServiceSourceSearchTabel.sort = this.sortColumns;
    })

    let addedServicesIds = data.dyeingServices.map(a => a.dyeing_services_id);

    this._dyeingServicesService.selectNotIn(addedServicesIds).subscribe((response: any) => {
      this.notInDyeingServices = response

      this.dyeingServiceSourcesSearchTabel = new MatTableDataSource(this.notInDyeingServices);
      this.dyeingServiceSourcesSearchTabel.sort = this.sortColumns;
    })

  }

  getSelectedAddedDyeingServicesIndex(objectData: any) {
    if (this.selectAddedDyeingServicesArrayValues.includes(objectData)) {
      let index = this.selectAddedDyeingServicesArrayValues.indexOf(objectData);
      this.selectAddedDyeingServicesArrayValues[index] = delete this.selectAddedDyeingServicesArrayValues[index];
      this.selectAddedDyeingServicesArrayValues.splice(index, 1);
    }
    else {
      this.selectAddedDyeingServicesArrayValues.push(objectData);
    }
  }

  getSelectedDyeingServicesIndex(objectData: any) {
    if (this.selectDyeingServicesArrayValues.includes(objectData)) {
      let index = this.selectDyeingServicesArrayValues.indexOf(objectData);
      this.selectDyeingServicesArrayValues[index] = delete this.selectDyeingServicesArrayValues[index];
      this.selectDyeingServicesArrayValues.splice(index, 1);
    }
    else {
      this.selectDyeingServicesArrayValues.push(objectData);
    }
  }

  onUpdate() {
    this.dyeingServicesWdForm.controls['newDyeingServices'].setValue(this.selectDyeingServicesArrayValues)
    this.dyeingServicesWdForm.controls['deletedDyeingServices'].setValue(this.selectAddedDyeingServicesArrayValues)
    this.dyeingServicesWdForm.markAllAsTouched();
    if (this.dyeingServicesWdForm.valid) {
      this._constantsService.spinner.show()
      this._wdFormDyeingRequisitionDetailsDyeingServicesService.updateDyeingServices(this.dyeingServicesWdForm.value).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {

          if (this.router.url.split("?")[0] === '/dashboard/show-all-dyeing-requisition-wd/details') {
            this._dyeingRequisitionDetailsWdService.updateDyeingCostPrice(this.selectedData?.wd_dyeing_requisition_details_id).subscribe((response: any) => {
            })
          }
          this._constantsService.successUpdateMessage()
          window.location.reload()
        }
        else {
          // if (res.message==='quantity is wrong') {
          //   this._constantsService.invalidInventoryQuantityErrorMessage(res.spentQuantity, res.newQuantity)
          // }
          // else{
          this._constantsService.userErrorMessage()
          // }
        }
      })
    }
  }
}
