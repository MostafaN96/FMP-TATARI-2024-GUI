import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

// Shared Service
import { ConstantsService } from "../../services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  modules = []
  settingModule = []
  constructor(
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
  ) {
    
   }

   ngOnInit(): void {
    this.settingModule = this._sessionManagerService.USER_PRIVILEGE_ARRAY['settingModule']
    this.modules = this._sessionManagerService.USER_PRIVILEGE_ARRAY['modules']
    
  }

}
