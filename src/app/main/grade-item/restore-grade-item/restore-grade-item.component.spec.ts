import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreGradeItemComponent } from './restore-grade-item.component';

describe('RestoreGradeItemComponent', () => {
  let component: RestoreGradeItemComponent;
  let fixture: ComponentFixture<RestoreGradeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreGradeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreGradeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
