import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, SideBarDef, GridOptions } from 'ag-grid-community';
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { UserService } from "src/app/services/main/user.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-show-all-user',
  templateUrl: './show-all-user.component.html',
  styleUrls: ['./show-all-user.component.css']
})
export class ShowAllUserComponent implements OnInit {

  private gridApi!: GridApi;
  rowData: any[] = [];
  selectedRows: any[] = [];
  selectedDataToUpdate: any;
  hasPasswordPermission = false;

  sideBar: SideBarDef = { toolPanels: ['filters'], defaultToolPanel: undefined };

  defaultColDef: ColDef = {
    flex: 1, minWidth: 120, resizable: true, sortable: true, filter: true,
  };

  gridOptions: GridOptions = {
    enableRtl: true,
    animateRows: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
  };

  columnDefs: ColDef[] = [
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      maxWidth: 50,
      filter: false,
      sortable: false,
    },
    {
      headerName: 'اسم المستخدم',
      field: 'user_name',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'البريد الإلكتروني',
      field: 'user_email',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'رقم الهاتف',
      field: 'user_mobile',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
    },
    {
      headerName: 'كلمة المرور',
      field: 'user_password',
      colId: 'password_col',
      hide: true,
      filter: false,
      sortable: false,
      minWidth: 220,
      cellRenderer: (p: any) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'password-wrapper';

        const span = document.createElement('span');
        span.className = 'password-plain-text';

        const icon = document.createElement('i');
        icon.className = p.data.showPassword ? 'fas fa-unlock' : 'fas fa-lock';
        icon.style.color = p.data.showPassword ? '#4caf50' : '#ff9800';
        icon.style.marginLeft = '6px';

        const text = document.createElement('span');
        text.textContent = p.data.showPassword ? (p.value || '') : '••••••••';

        span.appendChild(icon);
        span.appendChild(text);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.title = p.data.showPassword ? 'إخفاء' : 'إظهار';
        toggleBtn.innerHTML = `<i class="fas ${p.data.showPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
        toggleBtn.addEventListener('click', () => {
          p.data.showPassword = !p.data.showPassword;
          p.api.refreshCells({ rowNodes: [p.node], force: true });
        });

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.title = 'نسخ';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.addEventListener('click', () => this.copyToClipboard(p.value));

        wrapper.appendChild(span);
        wrapper.appendChild(toggleBtn);
        wrapper.appendChild(copyBtn);
        return wrapper;
      },
    },
    {
      headerName: 'تعديل',
      field: 'id',
      maxWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: (p: any) => {
        const a = document.createElement('a');
        a.innerHTML = '<i class="fas fa-edit update-symbol"></i>';
        a.style.cursor = 'pointer';
        a.addEventListener('click', () => {
          this.selectedDataToUpdate = { ...p.data };
          setTimeout(() => document.getElementById('update-form')?.scrollIntoView({ behavior: 'smooth' }), 50);
        });
        return a;
      },
    },
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _userService: UserService,
    private _sessionManagerService: SessionManagerService,
  ) { }

  ngOnInit(): void {
    this.hasPasswordPermission = this._sessionManagerService.checkAuth(
      this._constantsService.ROUTING_LINKS_DETAILS[4]
    );
    const pwdCol = this.columnDefs.find(c => (c as any).colId === 'password_col');
    if (pwdCol) pwdCol.hide = !this.hasPasswordPermission;
    this.getData();
  }

  onGridReady(params: GridReadyEvent) { this.gridApi = params.api; }

  onSelectionChanged() { this.selectedRows = this.gridApi?.getSelectedRows() || []; }

  getData() {
    this._userService.selectAll().subscribe((response: any) => {
      this.rowData = (Array.isArray(response) ? response : []).map((u: any) => ({
        ...u,
        showPassword: this.hasPasswordPermission,
      }));
    });
  }

  copyToClipboard(text: string) {
    if (!text) {
      this._constantsService.successMessage('لا توجد كلمة مرور لنسخها');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      this._constantsService.successMessage('تم نسخ كلمة المرور بنجاح');
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this._constantsService.successMessage('تم نسخ كلمة المرور بنجاح');
    });
  }

  delete() {
    this._userService.delete(this.selectedRows).subscribe((response: any) => {
      if (response.msg === 'the item is delete') {
        this._constantsService.successDeleteMessage();
        this.selectedRows = [];
        this.getData();
      } else {
        this._constantsService.invalidIdErrorMessage();
      }
    });
  }
}
