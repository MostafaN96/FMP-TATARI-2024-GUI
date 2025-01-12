import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionBetweenOrdersRequisitionUpdateWcComponent } from './transition-between-orders-requisition-update-wc.component';

describe('TransitionBetweenOrdersRequisitionUpdateWcComponent', () => {
  let component: TransitionBetweenOrdersRequisitionUpdateWcComponent;
  let fixture: ComponentFixture<TransitionBetweenOrdersRequisitionUpdateWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitionBetweenOrdersRequisitionUpdateWcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitionBetweenOrdersRequisitionUpdateWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
