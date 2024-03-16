import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransitionBetweenWhRequisitionFromWaComponent } from './add-transition-between-wh-requisition-from-wa.component';

describe('AddTransitionBetweenWhRequisitionFromWaComponent', () => {
  let component: AddTransitionBetweenWhRequisitionFromWaComponent;
  let fixture: ComponentFixture<AddTransitionBetweenWhRequisitionFromWaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransitionBetweenWhRequisitionFromWaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTransitionBetweenWhRequisitionFromWaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
