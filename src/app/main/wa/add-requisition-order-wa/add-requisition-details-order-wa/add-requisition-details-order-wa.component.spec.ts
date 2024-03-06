import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequisitionDetailsOrderWaComponent } from './add-requisition-details-order-wa.component';

describe('AddRequisitionDetailsOrderWaComponent', () => {
  let component: AddRequisitionDetailsOrderWaComponent;
  let fixture: ComponentFixture<AddRequisitionDetailsOrderWaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequisitionDetailsOrderWaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRequisitionDetailsOrderWaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
