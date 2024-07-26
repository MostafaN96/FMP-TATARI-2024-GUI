import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGradeItemComponent } from './update-grade-item.component';

describe('UpdateGradeItemComponent', () => {
  let component: UpdateGradeItemComponent;
  let fixture: ComponentFixture<UpdateGradeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGradeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGradeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
