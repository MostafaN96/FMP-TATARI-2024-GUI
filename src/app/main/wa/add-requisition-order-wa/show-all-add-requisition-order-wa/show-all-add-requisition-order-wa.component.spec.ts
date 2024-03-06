import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllAddRequisitionOrderWaComponent } from './show-all-add-requisition-order-wa.component';

describe('ShowAllAddRequisitionOrderWaComponent', () => {
  let component: ShowAllAddRequisitionOrderWaComponent;
  let fixture: ComponentFixture<ShowAllAddRequisitionOrderWaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllAddRequisitionOrderWaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllAddRequisitionOrderWaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
