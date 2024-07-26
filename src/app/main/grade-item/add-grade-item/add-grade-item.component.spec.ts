import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradeItemComponent } from './add-grade-item.component';

describe('AddGradeItemComponent', () => {
  let component: AddGradeItemComponent;
  let fixture: ComponentFixture<AddGradeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGradeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGradeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
