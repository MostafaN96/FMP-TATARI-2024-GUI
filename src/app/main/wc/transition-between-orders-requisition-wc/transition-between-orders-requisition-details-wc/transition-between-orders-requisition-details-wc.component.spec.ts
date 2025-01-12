import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionBetweenOrdersRequisitionDetailsWcComponent } from './transition-between-orders-requisition-details-wc.component';

describe('TransitionBetweenOrdersRequisitionDetailsWcComponent', () => {
  let component: TransitionBetweenOrdersRequisitionDetailsWcComponent;
  let fixture: ComponentFixture<TransitionBetweenOrdersRequisitionDetailsWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitionBetweenOrdersRequisitionDetailsWcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitionBetweenOrdersRequisitionDetailsWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
