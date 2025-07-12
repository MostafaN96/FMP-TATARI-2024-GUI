import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllAddRequisitionByOrderWcComponent } from './show-all-add-requisition-by-order-wc.component';

describe('ShowAllAddRequisitionByOrderWcComponent', () => {
  let component: ShowAllAddRequisitionByOrderWcComponent;
  let fixture: ComponentFixture<ShowAllAddRequisitionByOrderWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllAddRequisitionByOrderWcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllAddRequisitionByOrderWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
