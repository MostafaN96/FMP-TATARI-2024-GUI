import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionBetweenOrdersRequisitionShowAllWcComponent } from './transition-between-orders-requisition-show-all-wc.component';

describe('TransitionBetweenOrdersRequisitionShowAllWcComponent', () => {
  let component: TransitionBetweenOrdersRequisitionShowAllWcComponent;
  let fixture: ComponentFixture<TransitionBetweenOrdersRequisitionShowAllWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitionBetweenOrdersRequisitionShowAllWcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitionBetweenOrdersRequisitionShowAllWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
