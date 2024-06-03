import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

// Shared Service
import { ConstantsService } from "../../services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { GlobalService } from "src/app/services/exchange-rate.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  modules = []
  settingModule = []
  dollarPrice = 0

  constructor(
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    public globalService: GlobalService,

  ) {
    
   }

   ngOnInit(): void {
    // dollarPrice
    this.globalService.exchangeRate.subscribe({
      next: newValue => {
        this.dollarPrice = newValue.dollarPrice
      }
    });

    this.settingModule = this._sessionManagerService.USER_PRIVILEGE_ARRAY['settingModule']
    this.modules = this._sessionManagerService.USER_PRIVILEGE_ARRAY['modules']
    
  }

}
