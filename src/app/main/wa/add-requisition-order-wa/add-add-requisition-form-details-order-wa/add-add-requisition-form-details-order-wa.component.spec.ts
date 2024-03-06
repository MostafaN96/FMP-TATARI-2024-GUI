import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddRequisitionFormDetailsOrderWaComponent } from './add-add-requisition-form-details-order-wa.component';

describe('AddAddRequisitionFormDetailsOrderWaComponent', () => {
  let component: AddAddRequisitionFormDetailsOrderWaComponent;
  let fixture: ComponentFixture<AddAddRequisitionFormDetailsOrderWaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAddRequisitionFormDetailsOrderWaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAddRequisitionFormDetailsOrderWaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
