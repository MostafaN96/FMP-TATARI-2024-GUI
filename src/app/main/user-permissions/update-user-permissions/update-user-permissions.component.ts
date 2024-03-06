import { Component, ViewChild } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { UserService } from "src/app/services/main/user.service";
import { UserPermissionsService } from "src/app/services/main/user-permissions.service";

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-user-permissions',
  templateUrl: './update-user-permissions.component.html',
  styleUrls: ['./update-user-permissions.component.css']
})
export class UpdateUserPermissionsComponent {

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectAddedUserPermissionsArrayValues: any[] = [];
  selectedDt1ModuleNames: any[] = []
  selectedDt1ComponentNames: any[] = []
  selectedDt1PageNames: any[] = []
  selectedDt1FunctionNames: any[] = []

  //
  @ViewChild('dt2') dt2: Table | undefined;
  selectNewUserPermissionsArrayValues: any[] = [];
  selectedDt2ModuleNames: any[] = []
  selectedDt2ComponentNames: any[] = []
  selectedDt2PageNames: any[] = []
  selectedDt2FunctionNames: any[] = []

  addedUserPermissions = []
  newUserPermissions = []
  selectedUser: any;
  users: any = [];

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- users --------------
  // maps the appropriate column to fields property
  public fieldsUser: Object = { value: "user_id", text: "user_name" };
  // set the placeholder to the AutoComplete input
  public textUser: string = "اسم المستخدم"

  public onFilterinUsers(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('user_name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.users, query);
  }

  // Form Group
  UserPermissionsForm: FormGroup = new FormGroup({
    userId: new FormControl(""),
    name: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    newUserPermissions: new FormControl(null),
    deletedUserPermissions: new FormControl(null),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private _usersService: UserService,
    private _userPermissionsService: UserPermissionsService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.customFilterForDt1ModuleNames();
    this.customFilterForDt1ComponentNames();
    this.customFilterForDt1PageNames();
    this.customFilterForDt1FunctionNames();

    this.customFilterForDt2ModuleNames();
    this.customFilterForDt2ComponentNames();
    this.customFilterForDt2PageNames();
    this.customFilterForDt2FunctionNames();
    
    this.getData()
  }

  getData() {

    this._usersService.selectAll().subscribe((response: any) => {
      this.users = response;
    });

    if (this.selectedUser != undefined) {
      this.selectUser(this.selectedUser)
    }
  }

  // Start User Autocomplete Section
  //  User
  selectUser(event: { itemData: any; }) {
    this.loading = true;

    this.selectAddedUserPermissionsArrayValues = [];
    this.selectNewUserPermissionsArrayValues = [];
    this.selectedUser = event

    if (!this.users.includes(event.itemData)) {
      this.UserPermissionsForm.controls['userId'].setValue(null)
      this.addedUserPermissions = [];
      this.newUserPermissions = [];
    } else {
      this.UserPermissionsForm.controls['userId'].setValue(event.itemData.user_id)
      this.UserPermissionsForm.controls['name'].setValue(event.itemData.user_name)
      this._userPermissionsService.selectAddedUsersPermissions(event.itemData.user_id).subscribe((response: any) => {
        this.addedUserPermissions = response;

        // PrimeNG Table
        this.primengConfig.ripple = true;
        this.loading = false;


        this._userPermissionsService.selectNewUsersPermissions(event.itemData.user_id).subscribe((response: any) => {
          this.newUserPermissions = response
        })
      });

    }
  }
  // End Machine Autocomplete Section
///////////////////// ----------- Start Search Tabel ----------- /////////////////////
customFilterForDt1ModuleNames() {
  const customFilterName = "dt1-module-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDt1ModuleNames

    if (this.selectedDt1ModuleNames[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        // let count = 0

        // for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].modules_name) {
            // count++
            // if (count == filter.length) {
            return true;
            // }
          }
        }
        // }
      }
      return false;
    }
    else {
      return true;
    }
  });
}

customFilterForDt1ComponentNames() {
  const customFilterName = "dt1-component-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDt1ComponentNames

    if (this.selectedDt1ComponentNames[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        // let count = 0

        // for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].components_name) {
            // count++
            // if (count == filter.length) {
            return true;
            // }
          }
        }
        // }
      }
      return false;
    }
    else {
      return true;
    }
  });
}

customFilterForDt1PageNames() {
  const customFilterName = "dt1-page-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDt1PageNames

    if (this.selectedDt1PageNames[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        // let count = 0

        // for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].pages_name) {
            // count++
            // if (count == filter.length) {
            return true;
            // }
          }
        }
        // }
      }
      return false;
    }
    else {
      return true;
    }
  });
}

customFilterForDt1FunctionNames() {
  const customFilterName = "dt1-function-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDt1FunctionNames

    if (this.selectedDt1FunctionNames[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        // let count = 0

        // for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].functions_name) {
            // count++
            // if (count == filter.length) {
            return true;
            // }
          }
        }
        // }
      }
      return false;
    }
    else {
      return true;
    }
  });
}
///////////////////// ----------- Start Search Tabel ----------- /////////////////////
customFilterForDt2ModuleNames() {
  const customFilterName = "dt2-module-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDt2ModuleNames

    if (this.selectedDt2ModuleNames[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        // let count = 0

        // for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].modules_name) {
            // count++
            // if (count == filter.length) {
            return true;
            // }
          }
        }
        // }
      }
      return false;
    }
    else {
      return true;
    }
  });
}

customFilterForDt2ComponentNames() {
  const customFilterName = "dt2-component-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDt2ComponentNames

    if (this.selectedDt2ComponentNames[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        // let count = 0

        // for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].components_name) {
            // count++
            // if (count == filter.length) {
            return true;
            // }
          }
        }
        // }
      }
      return false;
    }
    else {
      return true;
    }
  });
}

customFilterForDt2PageNames() {
  const customFilterName = "dt2-page-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDt2PageNames

    if (this.selectedDt2PageNames[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        // let count = 0

        // for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].pages_name) {
            // count++
            // if (count == filter.length) {
            return true;
            // }
          }
        }
        // }
      }
      return false;
    }
    else {
      return true;
    }
  });
}

customFilterForDt2FunctionNames() {
  const customFilterName = "dt2-function-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDt2FunctionNames

    if (this.selectedDt2FunctionNames[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        // let count = 0

        // for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].functions_name) {
            // count++
            // if (count == filter.length) {
            return true;
            // }
          }
        }
        // }
      }
      return false;
    }
    else {
      return true;
    }
  });
}

// Reset table filters
clearDt1(table: Table) {
  table.clear();
  table.reset();
  this.selectedDt1ModuleNames = []
  this.selectedDt1ComponentNames = []
  this.selectedDt1PageNames = []
  this.selectedDt1FunctionNames = []
}

onMultiselectedDt1ModuleNames(event) {
  this.selectedDt1ModuleNames = event
  this.dt1?._filter()
}

onMultiselectedDt1ComponentNames(event) {
  this.selectedDt1ComponentNames = event
  this.dt1?._filter()
}

onMultiselectedDt1PageNames(event) {
  this.selectedDt1PageNames = event
  this.dt1?._filter()
}

onMultiselectedDt1FunctionNames(event) {
  this.selectedDt1FunctionNames = event
  this.dt1?._filter()
}

// Reset table filters
clearDt2(table: Table) {
  table.clear();
  table.reset();
  this.selectedDt2ModuleNames = []
  this.selectedDt2ComponentNames = []
  this.selectedDt2PageNames = []
  this.selectedDt2FunctionNames = []
}

onMultiselectedDt2ModuleNames(event) {
  this.selectedDt2ModuleNames = event
  this.dt2?._filter()
}

onMultiselectedDt2ComponentNames(event) {
  this.selectedDt2ComponentNames = event
  this.dt2?._filter()
}

onMultiselectedDt2PageNames(event) {
  this.selectedDt2PageNames = event
  this.dt2?._filter()
}

onMultiselectedDt2FunctionNames(event) {
  this.selectedDt2FunctionNames = event
  this.dt2?._filter()
}

  onUpdateUserPermissions() {
    const formGroup = <FormGroup>this.UserPermissionsForm;
    formGroup.removeControl('newUserPermissions');
    formGroup.addControl('newUserPermissions', new FormControl(this.selectNewUserPermissionsArrayValues));
    formGroup.removeControl('deletedUserPermissions');
    formGroup.addControl('deletedUserPermissions', new FormControl(this.selectAddedUserPermissionsArrayValues));

    if (this.UserPermissionsForm.valid) {
      this._constantsService.spinner.show()
      this._userPermissionsService.update(this.UserPermissionsForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
          this.getData()
          // this._sharedComponentService.reloadPage();
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

