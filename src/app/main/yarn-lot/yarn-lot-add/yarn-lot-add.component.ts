import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { YarnService } from "src/app/services/main/yarn.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "../../../services/main/session-manager.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-yarn-lot-add',
  templateUrl: './yarn-lot-add.component.html',
  styleUrls: ['./yarn-lot-add.component.css']
})
export class YarnLotAddComponent implements OnInit {

  yarns: any[] = [];
  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarns: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textYarns: string = "اسم الخيط"

  public onFilteringYarns (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);

          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
        
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.yarns, query);
  }

  // Form Group
  yarnLotForm: FormGroup = new FormGroup({
    yarnId: new FormControl("", [Validators.required]),
    code: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(1), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private _yarnLotService: YarnLotService,
    private _yarnService: YarnService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._yarnService.selectAll().subscribe((response: any) => {
      this.yarns = response
    })
  }

  onAddYarnLot() {
    if (this.yarnLotForm.valid) {
      this._constantsService.spinner.show()
      this._yarnLotService.add(this.yarnLotForm.value).subscribe(response => {
        this._constantsService.spinner.hide();

        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPage();
        }
        else {
          if (response.msg === "duplicated data") {
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
