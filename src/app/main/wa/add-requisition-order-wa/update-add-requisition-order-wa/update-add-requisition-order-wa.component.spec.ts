import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddRequisitionOrderWaComponent } from './update-add-requisition-order-wa.component';

describe('UpdateAddRequisitionOrderWaComponent', () => {
  let component: UpdateAddRequisitionOrderWaComponent;
  let fixture: ComponentFixture<UpdateAddRequisitionOrderWaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAddRequisitionOrderWaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAddRequisitionOrderWaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
