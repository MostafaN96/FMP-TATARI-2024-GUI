import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransitionBetweenOrdersRequisitionFormWcComponent } from './add-transition-between-orders-requisition-form-wc.component';

describe('AddTransitionBetweenOrdersRequisitionFormWcComponent', () => {
  let component: AddTransitionBetweenOrdersRequisitionFormWcComponent;
  let fixture: ComponentFixture<AddTransitionBetweenOrdersRequisitionFormWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransitionBetweenOrdersRequisitionFormWcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTransitionBetweenOrdersRequisitionFormWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
